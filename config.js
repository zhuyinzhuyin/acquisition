/**
 * Webサイト制作・無料分析レポート お問い合わせフォーム設定
 */
window.APP_CONFIG = {
  // サービス名・ブランド名
  serviceName: "NextWeb Marketing",
  
  // 送信先メールアドレス（通知を受け取るメールアドレス）
  targetEmail: "yin.zhu.work@gmail.com",

  /**
   * メール送信方式:
   * 'web3forms' (推奨・サーバー構築不要・即利用可)
   */
  mailProvider: "web3forms",

  // Web3Formsのアクセスキー
  web3formsAccessKey: "1a2b4206-bba5-4b23-a347-54d7e8fe2c40",

  // Formspree利用時のエンドポイントID (任意)
  formspreeId: "",

  // 自前バックエンドAPIのURL (任意)
  backendApiUrl: "http://localhost:3000/api/send-lead"
};
