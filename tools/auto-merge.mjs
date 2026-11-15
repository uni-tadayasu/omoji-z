/** Merge only the exact, tested same-repository branch; never override repository rules. */
import {appendFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';

export function validateCandidate({repository, branch, head, base}) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || '')) throw new Error('Invalid repository.');
  if (!branch || ['main', 'gh-pages'].includes(branch) || /[\r\n\x00-\x20~^:?*\[\\]/.test(branch) || branch.includes('..') || branch.includes('@{') || branch.startsWith('-') || branch.endsWith('/') || branch.endsWith('.lock')) throw new Error('Invalid automation branch.');
  if (![head, base].every(value => /^[a-f0-9]{40}$/.test(value || ''))) throw new Error('Expected full verified commit SHAs.');
}

export function mergeBranchWithGit({branch, head, base, runURL = ''}, run = args => execFileSync('git', args, {encoding:'utf8', stdio:['ignore','pipe','pipe']}).trim()) {
  // This job executes only the helper loaded from verified main, never candidate code.
  // GitHub branch protection applies to this ordinary, non-force push.
  run(['fetch','--no-tags','origin',`refs/heads/main:refs/remotes/origin/main`,`refs/heads/${branch}:refs/remotes/origin/${branch}`]);
  if (run(['rev-parse',`refs/remotes/origin/${branch}`]) !== head) return {merged:false, reason:'head-changed'};
  if (run(['rev-parse','refs/remotes/origin/main']) !== base) return {merged:false, reason:'base-changed'};
  run(['checkout','--detach',base]);
  run(['-c','core.hooksPath=/dev/null','-c','user.name=github-actions[bot]','-c','user.email=41898282+github-actions[bot]@users.noreply.github.com','merge','--no-ff','--no-edit',head,'-m',`Merge verified branch ${branch}\n\n${runURL}`]);
  const sha = run(['rev-parse','HEAD']);
  try {
    run(['push','origin','HEAD:refs/heads/main']);
  } catch {
    const remote = run(['ls-remote','origin','refs/heads/main']).split(/\s+/)[0];
    if (remote === sha) return {merged:true, sha}; // Recover a lost successful push response.
    if (remote !== base) return {merged:false, reason:'base-changed'};
    throw new Error('The verified branch could not be pushed to main. GitHub permissions or branch protection rejected the ordinary push. No force push or protection bypass was attempted.');
  }
  return {merged:true, sha};
}

export async function mergeVerified({api, repository, branch, head, base, runURL = '', note = () => {}, gitMerge = mergeBranchWithGit}) {
  validateCandidate({repository, branch, head, base});
  const prefix = `/repos/${repository}`;
  const encodedBranch = encodeURIComponent(branch);
  const currentHead = await api('GET', `${prefix}/git/ref/heads/${encodedBranch}`);
  if (currentHead.object.sha !== head) {
    note('Branch changed after verification; this run will not merge. The new branch push is verified separately.');
    return {merged: false, reason: 'head-changed'};
  }
  const currentBase = await api('GET', `${prefix}/git/ref/heads/main`);
  if (currentBase.object.sha !== base) {
    await api('POST', `${prefix}/actions/workflows/auto-merge.yml/dispatches`, {ref:'main', inputs:{branch}});
    note('main changed after verification. A fresh verification has been dispatched automatically.');
    return {merged:false, reason:'base-changed'};
  }
  const owner = repository.split('/')[0];
  const existing = await api('GET', `${prefix}/pulls?state=open&base=main&head=${encodeURIComponent(`${owner}:${branch}`)}`);
  let pr = existing.find(item => item.head?.repo?.full_name === repository && item.head.ref === branch);
  if (!pr) {
    try {
      pr = await api('POST', `${prefix}/pulls`, {
        title:`Auto-merge: ${branch}`,
        head:branch, base:'main',
        body:`This same-repository branch is being integrated automatically as configured by the repository owner.\n\nValidated head: \`${head}\`\nValidated main: \`${base}\`\n\nThe combined source passed \`npm test\` and public-file staging.\n\n[Verification run](${runURL})\n\nRepository protections still apply. GitHub Pages is dispatched explicitly after merging.`
      });
    } catch (error) {
      if (error.status === 403) {
        note('GitHub denied PR creation. Integrating the verified commits using an ordinary non-force Git push; repository protection still applies.');
        const result = await gitMerge({branch,head,base,runURL});
        if (!result.merged) {
          if (result.reason === 'base-changed') {
            await api('POST', `${prefix}/actions/workflows/auto-merge.yml/dispatches`, {ref:'main', inputs:{branch}});
            note('main moved before the push completed; fresh verification was dispatched.');
          } else note('The branch moved after verification; its new push must be verified separately.');
          return result;
        }
        const url = `https://github.com/${repository}/commit/${result.sha}`;
        note(`Merged verified branch directly: ${url}`);
        try {
          await api('POST', `${prefix}/actions/workflows/pages.yml/dispatches`, {ref:'main'});
        } catch (dispatchError) {
          throw new Error(`The branch was merged successfully (${url}), but Pages dispatch failed (HTTP ${dispatchError.status || 'unknown'}). Run “Publish game to GitHub Pages” manually; do not repeat the merge.`);
        }
        note('GitHub Pages publication has been dispatched.');
        return {...result, url, method:'git'};
      }
      throw error;
    }
  }
  if (pr.draft) {
    note(`PR #${pr.number} is a draft; it has been left for review. Mark it ready and rerun this workflow when desired.`);
    return {merged:false, reason:'draft', pr:pr.number};
  }
  if (pr.head?.repo?.full_name !== repository || pr.head.sha !== head || pr.base.ref !== 'main') throw new Error('PR source no longer matches the verified candidate.');
  const lastBase = await api('GET', `${prefix}/git/ref/heads/main`);
  if (lastBase.object.sha !== base) {
    await api('POST', `${prefix}/actions/workflows/auto-merge.yml/dispatches`, {ref:'main', inputs:{branch}});
    note('main moved while opening the PR; a fresh verification was dispatched.');
    return {merged:false, reason:'base-changed', pr:pr.number};
  }
  let result;
  try {
    result = await api('PUT', `${prefix}/pulls/${pr.number}/merge`, {
      sha:head, merge_method:'merge', commit_title:`Merge verified branch ${branch}`,
      commit_message:`Automatic integration after tests and public staging passed.\n${runURL}`
    });
  } catch (error) {
    if ([403, 405, 409, 422].includes(error.status)) throw new Error(`PR #${pr.number} remains open: GitHub did not permit merging (HTTP ${error.status}). Resolve conflicts, required reviews, status checks or repository rules, then rerun. No protection was bypassed.`);
    throw error;
  }
  if (!result.merged) throw new Error(`PR #${pr.number} was not merged: ${result.message || 'GitHub declined the merge.'}`);
  note(`Merged PR #${pr.number}: ${result.sha}`);
  try {
    await api('POST', `${prefix}/actions/workflows/pages.yml/dispatches`, {ref:'main'});
  } catch (error) {
    throw new Error(`PR #${pr.number} was merged successfully, but Pages dispatch failed (HTTP ${error.status || 'unknown'}). Run “Publish game to GitHub Pages” manually from Actions; do not repeat the merge.`);
  }
  note('GitHub Pages publication has been dispatched. Its workflow reports the final deployment result.');
  return {merged:true, sha:result.sha, pr:pr.number};
}

export function createGitHubAPI(token, fetcher = fetch) {
  return async (method, path, body) => {
    const response = await fetcher(`https://api.github.com${path}`, {
      method,
      headers: {Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28', 'Content-Type':'application/json'},
      ...(body ? {body:JSON.stringify(body)} : {})
    });
    if (!response.ok) {
      const error = new Error(`GitHub ${method} request failed (HTTP ${response.status}).`);
      error.status = response.status;
      throw error;
    }
    return response.status === 204 ? null : response.json();
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const note = message => {
    console.log(message);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${message}\n\n`);
  };
  try {
    if (!process.env.GH_TOKEN) throw new Error('GH_TOKEN is required inside GitHub Actions.');
    await mergeVerified({
      api:createGitHubAPI(process.env.GH_TOKEN), repository:process.env.GITHUB_REPOSITORY,
      branch:process.env.PROPOSED_BRANCH, head:process.env.VERIFIED_HEAD_SHA, base:process.env.VERIFIED_BASE_SHA,
      runURL:`${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`, note
    });
  } catch(error) {
    note(error.message);
    process.exitCode = 1;
  }
}
