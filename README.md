# 尾文字Z / OMOJI Z — Original Design Edition

PC・スマートフォン用の静的ブラウザレースです。公開車512台・運営車3台・256ステージ・新規合成BGM128曲。プレイと公開にはサーバー実装、データベース、有料APIキー、npm installは不要です。

## 改良内容

- 全車を独自シリーズ名・型式・車体へ再設計。旧ID・所有車・強化・基礎性能・主要セーブキーを維持。
- 出所を確認できない旧実車モデル3点、旧画像・旧音源を現行配布ファイルから除去。新規の車体・景観画・ロゴ・71アイコン・BGMへ置換。
- 車体の曲面・反射・ガラス・灯火・荷重移動、路面の質感、通常コースの曲線を改良。軽量Canvas描画も維持。
- 320px幅、縦横画面、セーフエリア、タッチ領域、キーボードフォーカス、動きを減らす設定への対応を追加。
- 図鑑に詳細フィルタ、検索条件のURL保存、最大3件比較を追加。
- GitHub Pages公開、完全版/差分ZIP作成、ハッシュ検証付き差分適用ツールを追加。

メイン画像は新規生成したコンセプトアートで、実際のゲーム画面とは異なります。景観カードの小地図も概念図です。実車・実在コースの完全複製や写真と同一の描画ではありません。

## GitHubだけで公開する

1. 完全版ZIPを展開し、中身をGitHubへアップロードします。`index.html` をリポジトリ直下へ置いてください。ZIPをそのまま置くだけでは公開できません。
2. **Settings → Pages → Deploy from a branch → main → /(root)** を保存します。ビルドは不要です。
3. 表示されたPages URLを開きます。`/リポジトリ名/` 配下でも相対パスで動きます。

GitHubのWeb画面は1回100ファイルまでです。audioとart/routesは100ファイル以下に分けてアップロードしてください。GitHub Desktopではフォルダー全体を一度にコミットできます。

既存の `CNAME` とcanonicalは `omoji-z.com` を維持しています。独自ドメインを使わない場合は `CNAME` を削除し、HTMLのcanonical/OG URLとsitemap.xml・robots.txtを自分のPages URLへ変更してください。

Actionsで公開する場合はPagesのSourceを **GitHub Actions** に変更します。同梱の `pages.yml` が公開用ファイルだけを配置します。ブランチ公開とActions公開はどちらか一方を設定してください。

## 今回の更新ファイルだけを適用する

差分元は `d56dadaef293b97f88d9f017d8e65701be98e721` です。添付ZIPそのものとの比較ではありません。

更新ZIPには変更・追加ファイルと `_update/manifest.json` が入っています。`deleted` は削除が必要な旧モデル・旧画像・未使用音源です。**上書きだけでは旧素材の削除は完了しません。** 完全版を既存リポジトリに追加する場合も同様です。

安全に適用するには、完全版または更新ZIPを旧リポジトリとは別の場所へ展開し、その中の適用ツールを使ってください。更新ファイルを先に旧リポジトリへ展開すると、競合として停止します。Python 3.10以降のみで動きます。

```sh
python3 /path/to/extracted/tools/apply-update.py /path/to/omoji-z-update.zip --target /path/to/old-repository
python3 /path/to/extracted/tools/apply-update.py /path/to/omoji-z-update.zip --target /path/to/old-repository --apply
```

最初は検査だけです。`--apply` 時は全変更前ハッシュを確認し、自動バックアップ後に書込・削除します。未反映の編集があれば停止します。完了したフォルダーの変更と削除をGitHubへコミットしてください。

Web画面だけで更新する場合は、変更ファイルを同じパスへアップロードし、`deleted` の各パスをGitHubから削除します。`_update` はアップロード不要です。過去のGit履歴まで除去したい場合は、新しいリポジトリへ完全版を配置する方法もあります。この更新は既存履歴を書き換えません。

## 次回から差分だけをダウンロードする

今回のドラフトPRでは **Checks → Verify game and download ZIPs** の実行完了後、実行ページのArtifactsにある `omoji-z-full-and-update` から完全版と差分版を取得できます。mainへのマージや公開は不要です。

**Actions → Download full and changed-files ZIPs → Run workflow** で、更新前のコミットSHAまたはタグを `base_ref` に指定します。実行のArtifactsから完全版・差分ZIPをダウンロードできます。ワークフローはリポジトリへ書き込みません。

ローカルでも生成できます。

```sh
python3 tools/package-release.py --base-ref <更新前のコミットSHA> --out /path/to/releases
```

## セーブと版の違い

セーブは同じブラウザー・同じオリジンに保持します。更新前にゲーム内でセーブを書き出してください。ドメインやブラウザーを変える場合は取り込みが必要です。旧IDのブランド由来文字列は互換用の内部識別子として残しています。

コース線形と車体寸法が変わったため、旧タイムと新タイムは同じ条件ではありません。既存記録は消していません。対戦相手とは同じ版を使ってください。

音声は最初のタップ・クリック後に再生します。短い部屋コードは従来のPeerJS CloudとWebRTCを使用します。ソロプレイには外部の対戦サービスは不要です。

## 検証・生成元

Node.js 20以降で `node tools/verify.mjs` を実行できます。テスト用npm installも不要です。音源生成は `tools/compose-audio.py`、アートは `tools/generate-art.py`、アイコンは `tools/generate-icons.py`。再生成の任意ツールは通常のプレイ・公開には不要です。

検証範囲は `VERIFICATION.txt`、素材の扱いは `RIGHTS.txt`、第三者ライセンスは `THIRD_PARTY_NOTICES.txt` を参照してください。
