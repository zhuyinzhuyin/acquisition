/**
 * Optional Node.js Backend Server for Local/Custom Hosting
 * Run with: node server.js
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

// Email Transporter Configuration (Using SMTP / Gmail / SendGrid / SES)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

// API Endpoint to receive form lead
app.post('/api/send-lead', async (req, res) => {
  try {
    const { email, hasWebsite, websiteUrl, companyName, inquiryContent, submittedAt } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'メールアドレスは必須です' });
    }

    const toEmail = process.env.TARGET_EMAIL || 'your-email@example.com';

    const mailOptions = {
      from: `"WebGrowth Form" <${process.env.SMTP_USER || 'noreply@example.com'}>`,
      to: toEmail,
      replyTo: email,
      subject: `【Web無料分析申込】${companyName || '新規お問い合わせ'} (${email})`,
      text: `
【Webサイト無料分析レポート お申し込み】
=========================================
■ 送信日時: ${submittedAt || new Date().toLocaleString('ja-JP')}
■ メールアドレス: ${email}
■ 既存Webサイト: ${hasWebsite}
■ サイトURL: ${websiteUrl}
■ 貴社名・屋号: ${companyName}

■ ご相談・お悩み内容:
${inquiryContent}
=========================================
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            【Web無料分析レポート】新しいお申し込み
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 140px; color: #475569;">送信日時</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${submittedAt || new Date().toLocaleString('ja-JP')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">メールアドレス</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">既存サイト有無</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${hasWebsite}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">サイトURL</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="${websiteUrl}" target="_blank">${websiteUrl}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">貴社名・屋号</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #475569; vertical-align: top;">お悩み・相談内容</td>
              <td style="padding: 10px; color: #0f172a; white-space: pre-line;">${inquiryContent}</td>
            </tr>
          </table>
        </div>
      `
    };

    // If SMTP user is not set, log and return success (Dev mode)
    if (!process.env.SMTP_USER) {
      console.log('【ローカル開発用】メール送信ログ:');
      console.log(mailOptions.text);
      return res.json({ success: true, message: '送信成功（開発環境ログ出力）' });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'メール送信が完了しました' });

  } catch (error) {
    console.error('Server Mail Error:', error);
    res.status(500).json({ success: false, message: 'メール送信に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 サーバーが起動しました: http://localhost:${PORT}`);
});
