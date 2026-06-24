import transporter from '../config/mailer.config';
import { env } from '../config/env.config';
import { IEmailService } from './interfaces/IEmailService';

export class EmailService implements IEmailService {

    async sendRegistrationOTP(toEmail: string, otp: string): Promise<void> {
        
        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 10px;">
                <h2 style="color: #333; font-family: Georgia, serif;">WriteNest Registration</h2>
                <p style="color: #555; font-size: 16px;">
                    Hello,<br><br>
                    Thank you for joining. To complete your registration and secure your account, please use the following verification code:
                </p>
                <div style="background-color: #f4f4f5; padding: 15px; text-align: center; border-radius: 8px; margin: 25px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111;">
                        ${otp}
                    </span>
                </div>
                <p style="color: #777; font-size: 14px;">
                    This code will expire in exactly 5 minutes.<br>
                    If you did not request this code, please ignore this email.
                </p>
                <hr style="border: none; border-top: 1px solid #eaeaec; margin: 30px 0;" />
                <p style="color: #999; font-size: 12px; text-align: center;">
                    Your words deserve a home. &copy; ${new Date().getFullYear()} WriteNest
                </p>
            </div>
        `;

        try {
            await transporter.sendMail({
                from: env.SMTP_FROM_EMAIL,
                to: toEmail,
                subject: 'Your WriteNest Verification Code',
                html: htmlTemplate,
                text: `Your WriteNest verification code is: ${otp}. It expires in 5 minutes.` 
            });
        } catch (error) {
            console.error(`[Email Service] Failed to send OTP to ${toEmail}:`, error);
            throw new Error('Failed to dispatch verification email. Please try again.'); 
        }
    }
}