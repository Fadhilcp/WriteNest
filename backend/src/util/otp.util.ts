import bcrypt from 'bcrypt';
import redisClient from '../config/redis.config';
import { env } from '../config/env.config';

interface PreRegistrationData {
    name: string;
    email: string;
    passwordHash: string;
    otpHash: string; 
}

export const storeRegistrationState = async (userData: PreRegistrationData): Promise<void> => {
    const redisKey = `auth:register:${userData.email}`;
    
    const payload = JSON.stringify(userData);

    await redisClient.setEx(redisKey, env.OTP_TTL_SECONDS, payload);
};

export const getRegistrationState = async (email: string): Promise<PreRegistrationData | null> => {
    const redisKey = `auth:register:${email}`;
    const data = await redisClient.get(redisKey);
    
    if (!data) return null;
    return JSON.parse(data) as PreRegistrationData;
};

export const clearRegistrationState = async (email: string): Promise<void> => {
    await redisClient.del(`auth:register:${email}`);
};