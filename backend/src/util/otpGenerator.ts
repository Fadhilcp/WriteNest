import crypto from 'crypto';
import { env } from '../config/env.config';

export const generateOTP = (): string => {
    const min = Math.pow(10, env.OTP_LENGTH - 1);
    const max = Math.pow(10, env.OTP_LENGTH) - 1;
    
    const otp = crypto.randomInt(min, max + 1);
    
    return otp.toString();
};