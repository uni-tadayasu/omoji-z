# ブランチから main への自動統合

`Verify branch and merge into main` は、同じリポジトリの `main` / `gh-pages` 以外のブランチへの push を受けて動きます。ブランチ名の接頭辞は不要です。外部 fork の PR を自動で取り込む処理はありません。

1. push されたコミットと、その時点の `main` を作業用に統合します。
2. 読み取り権限だけの別ジョブで `npm ci --ignore-scripts`・`npm test` と公開ファイルのステージングを実行します。
3. 検証したブランチ・main の SHA が変わっていないことを確認します。
4. main 向けの PR を作成、または既存 PR を再利用し、検証済みの head SHA を指定してマージします。PR 作成が GitHub に HTTP 403 で拒否された場合だけ、同じ検証済みコミットを Git で統合し、通常の push で main に反映します。
5. `Publish game to GitHub Pages` を明示的に起動します。

`GITHUB_TOKEN` による main の更新だけでは通常の push トリガーに頼れないため、公開ワークフローを直接 dispatch しています。公開の成否は Pages ワークフローに表示されます。ゲームのテストを実行するジョブには書き込み権限も保存された Git 認証情報もありません。マージ用スクリプトは検証時点の main から読み込みます。書き込み権限を持つ別ジョブではブランチ側のプログラムを実行せず、検証済みコミットの Git 統合だけを行います。

## 最初の設定

この仕組みを含む最初の PR は main へ通常の方法で統合します。以後の push から自動統合が利用できます。

PR の自動作成を利用する場合は、GitHub リポジトリの **Settings → Actions → General → Workflow permissions** で **Allow GitHub Actions to create and approve pull requests** を有効にします。**この設定が無効でも、自動統合は通常の Git push による代替経路で進みます。** ワークフローは PR の自動承認、force push、保護ルールの回避を行いません。main に「PR 必須」の保護がある場合、通常の push も GitHub に拒否されるため、PR 作成を許可するか、人が PR を作成する必要があります。個人アクセストークンや追加の Secret は不要です。

**Settings → Pages → Source** は **GitHub Actions** を指定してください。すでにこの方式で公開している場合は変更不要です。`Allow auto-merge` のリポジトリ設定は、このワークフローでは使用しません。

## 自動で統合しない場合

- テスト失敗、ソースの競合、公開ファイル作成失敗：検証ジョブで停止します。
- Draft PR：PR を残して停止します。Ready for review にしてから手動再実行できます。
- 必須レビュー、必須ステータスチェック、ブランチ保護、ruleset：GitHub の規則をそのまま尊重します。管理者による強制マージは行いません。
- 検証後にブランチが更新：古いコミットはマージせず、新しい push の検証に任せます。
- 検証後に main が更新：最新 main での再検証を自動 dispatch します。Git による代替経路でも、通常の push が更新競合で拒否された場合は main を再確認して再検証します。
- PR 作成だけが HTTP 403 で拒否された場合：通常の Git push へ切り替えます。既存 PR のマージ拒否、他の HTTP エラー、Git push・Actions の権限不足：保護を変更せず理由を Actions ログに表示して停止します。

必須チェックやレビューがあとから完了した場合は、このワークフローを再実行してください。`main` への直接 push と同時に行った変更では、ごく短い競合時間を完全には排除できないため、本番 main への更新経路を PR に統一してください。

## 既存ブランチを手動で取り込む

**Actions → Verify branch and merge into main → Run workflow** を開き、ワークフロー実行元は `main`、`branch` には取り込みたい同一リポジトリのブランチ名を入力します。検証を省略するオプションはありません。

自動統合を停止する場合は、このワークフローを Actions 画面で Disable workflow にします。main への公開ワークフロー自体は独立しています。

## 検証

```sh
node tools/test-auto-merge.mjs
```

このテストでは SHA の固定、更新済み参照の拒否、Draft の維持、保護ルールによる拒否、PR 作成拒否時の Git 代替経路、force オプションを使わないこと、更新競合・保護による push 拒否、Pages の明示起動を API のモックで確認します。GitHub 上の実権限とホスティング設定は、実際の Actions 実行結果で確認してください。

公式仕様：

- [GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token)
- [リポジトリの Actions 設定](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
