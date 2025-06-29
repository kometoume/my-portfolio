// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 環境変数が設定されているか確認
    // ここでは、定義した環境変数名（EMAIL_USER, EMAIL_PASS）を使ってチェックします。
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('環境変数が設定されていません: EMAIL_USER, EMAIL_PASS'); // エラーログも正しい変数名で
      return NextResponse.json({ message: 'サーバー設定エラーが発生しました。メール送信設定が正しくありません。' }, { status: 500 });
    }

    // Nodemailerのトランスポーターを設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // user: には、環境変数名 EMAIL_USER を使って、あなたのGmailアドレスを渡します。
        user: process.env.EMAIL_USER,
        // pass: には、環境変数名 EMAIL_PASS を使って、あなたのアプリパスワードを渡します。
        pass: process.env.EMAIL_PASS,
      },
    });

    // 送信するメールの内容を定義
    const mailOptions = {
      // from: には、環境変数名 EMAIL_USER を使って、あなたのGmailアドレスを渡します。
      from: process.env.EMAIL_USER,
      // to: には、環境変数名 EMAIL_USER を使って、あなたのGmailアドレス（受信先）を渡します。
      to: process.env.EMAIL_USER,
      subject: `ポートフォリオサイトからのお問い合わせ: ${name}`,
      text: `名前: ${name}\nメール: ${email}\nメッセージ: ${message}`,
      html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メール:</strong> ${email}</p>
        <p><strong>メッセージ:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'お問い合わせが正常に送信されました！' }, { status: 200 });

  } catch (error) {
    console.error('お問い合わせ送信エラー:', error);
    return NextResponse.json({ message: 'お問い合わせの送信に失敗しました。サーバー側でエラーが発生しました。' }, { status: 500 });
  }
}