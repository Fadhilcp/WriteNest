export interface IEmailService {
    sendRegistrationOTP(toEmail: string, otp: string): Promise<void>;
}