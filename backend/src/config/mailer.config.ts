import nodemailer from 'nodemailer';
import { env } from './env.config';

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
    },
});

export const initialiseMailer = async (): Promise<void> => {
    try {
        
        await transporter.verify();
        console.log('Nodemailer Initialised Successfully: SMTP connection ready.');
    } catch (error) {
        console.error('Failed to initialise SMTP connection:', error);
    }
};

export default transporter;