# REBORN 4.0 検証記録

対象の実装: `e6c8eb700b3b063c845bb68756b47c51069fd04d` / [PR #4](https://github.com/uni-tadayasu/omoji-z/pull/4)

2026年11月15日に以下の検証が成功しました。

- [GitHub上のゲーム検証・公開ZIP生成](https://github.com/uni-tadayasu/omoji-z/actions/runs/43698862853)
- [ブランチとmainを統合した状態の検証](https://github.com/uni-tadayasu/omoji-z/actions/runs/43698859454)
- 新エンジン6コースの衝突なし完走、フレームレート非依存の物理、ニトロ、ポーズと再開。
- 全512公開車の実形状、6環境の実座標、展示・走行カメラ、描画資源の解放。
- 実DOMでの選択・購入・強化・設定・出走・完走・一度だけの報酬付与。
- 既存版の515車両・256コース、旧セーブ、音源、検索用ページ、22,577ローカルリンク。
- `tools/build-site.py` による公開ファイルの生成。

制限: 制作環境のブラウザはWebGL無効でした。GPUでの画面表示、実スマートフォンのレイアウトとFPS、実際の音声出力の目視・聴取確認は完了していません。形状・DOM検証を実画面検証とみなしていません。

自動統合の実行状況は、GitHub Actionsの「Verify branch and merge into main」で確認できます。mainへ統合された後の公開は「Publish game to GitHub Pages」で確認できます。
