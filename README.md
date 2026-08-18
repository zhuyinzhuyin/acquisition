# 日本Web制作・無料分析レポート集客LP ＆ 問い合わせフォーム

動画広告（**「3.3万円相当 個別分析レポート無料」**）からの流入に最適化された、日本市場向けハイエンドWeb制作・集客ランディングページおよびリード獲得フォームです。

---

## 🌟 主な特徴・設計

1. **高端大气・日本B2Bデザイン**
   - 信頼感と先進性を両立したディープネイビー×ゴールド×ロイヤルブルーの配色
   - モバイル完全対応（TikTok / Instagram / YouTube Shorts / Meta広告のスマホ流入に最適化）
   - 日本語フォント（Google Fonts: Noto Sans JP）と洗練されたマイクロインタラクション

2. **ご要望に沿ったスマートフォーム**
   - **メールアドレス（必須）**：リアルタイムバリデーション
   - **現在のWebサイト有無（必須）**：「はい」「いいえ」の直感的なボタントグル
     - 「はい」を選択時、**WebサイトURL入力欄**がスムーズにアニメーション展開
   - **貴社名・屋号（任意）**
   - **お悩み・相談内容（任意）**：ワンタップで追加できるお悩みタグチップ（集客、リニューアル、表示速度、費用感など）＋自由記述欄

3. **メール送信システム**
   - ユーザーがフォームを送信すると、設定された**指定のメールアドレスへ即座に通知**が届きます。

---

## 🚀 使い方・メールアドレスの設定方法

### 方法1: サーバー不要・最速で使う場合（推奨 ⭐⭐⭐⭐⭐）

静的HTML（Vercel、Cloudflare Pages、GitHub Pages、レンタルサーバー等）に置くだけで動作します。

1. **[Web3Forms (無料)](https://web3forms.com/)** にアクセスし、通知を受け取りたいメールアドレスを入力して無料の `Access Key` を取得します。
2. `config.js` を開き、取得したキーとメールアドレスを入力します：

```javascript
window.APP_CONFIG = {
  serviceName: "WebGrowth Japan",
  targetEmail: "your-email@example.com", // ← あなたの受信先メールアドレス
  mailProvider: "web3forms",
  web3formsAccessKey: "ここに取得したキーを貼り付け",
};
```

3. `index.html` をブラウザで開くだけで、本番環境としてそのままメール送信が稼働します。

---

### 方法2: 自前Node.jsサーバー（Nodemailer）を使う場合

自社サーバーで運用したい場合は、付属のバックエンドが利用可能です。

1. 依存ライブラリをインストール:
   ```bash
   npm install
   ```
2. `.env.example` をコピーして `.env` を作成し、SMTP情報（Gmail、SendGrid等）を設定:
   ```env
   PORT=3000
   TARGET_EMAIL=your-email@example.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-account@gmail.com
   SMTP_PASS=your-app-password
   ```
3. `config.js` で `mailProvider: 'custom_backend'` に変更
4. サーバーを起動:
   ```bash
   npm start
   ```
   ブラウザで `http://localhost:3000` を開きます。

---

## 📁 ファイル構成

```text
├── index.html          # 高端・日本語LP ＆ フォーム本体
├── styles.css          # 高級感のあるデザインスタイル、アニメーション
├── app.js              # フォーム制御、URL表示切替、メール送信処理
├── config.js           # 送信先メール・プロバイダー設定ファイル
├── server.js           # （任意）Node.js + Nodemailer サーバー
├── package.json        # Node.js パッケージ定義
├── .env.example        # 環境変数サンプル
└── README.md           # 説明マニュアル
```
