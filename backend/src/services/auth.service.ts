import { APP_MESSAGES } from "../constants/messages";
import { UserDto } from "../dtos/user.dto";
import { UserMapper } from "../mappers/user.mapper";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IUserDocument } from "../types/user.type";
import generateAccessToken from "../util/generateAccessToken";
import generateRefreshToken from "../util/generateRefreshToken";
import { clearRegistrationState, getRegistrationState, storeRegistrationState } from "../util/otp.util";
import { generateOTP } from "../util/otpGenerator";
import { verifyRefreshToken } from "../util/verifyToken";
import { IAuthService } from "./interfaces/IAuthService";
import bcrypt from "bcrypt";
import { IEmailService } from "./interfaces/IEmailService";

export class AuthService implements IAuthService {
    constructor(
        private _userRepository: IUserRepository,
        private _emailService: IEmailService
    ){}

    async register(name: string, email: string, password: string, confirmPassword: string)
    : Promise<{ email: string; }> {
        
        const isUserExist = await this._userRepository.findByEmail(email);

        if(isUserExist) throw new Error(APP_MESSAGES.AUTH.USER_EXISTS);

        if(password !== confirmPassword){
            throw new Error(APP_MESSAGES.AUTH.PASSWORD_MISMATCH);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const plainOTP = generateOTP();
        const otpHash = await bcrypt.hash(plainOTP, 10);

        await storeRegistrationState({
            name,
            email,
            passwordHash,
            otpHash
        });

        await this._emailService.sendRegistrationOTP(email, plainOTP);

        return { email };
    }

    async verifyAndRegister(email: string, plainOTP: string)
    : Promise<{ user: Partial<IUserDocument>; refreshToken: string; accessToken: string; }> {
        
        const pendingUser = await getRegistrationState(email);
        if (!pendingUser) throw new Error("Registration session expired. Please try again.");

        const isMatch = await bcrypt.compare(plainOTP, pendingUser.otpHash);
        if (!isMatch) throw new Error("Invalid OTP.");

        const isUserExist = await this._userRepository.findByEmail(email);
        if(isUserExist) throw new Error(APP_MESSAGES.AUTH.USER_EXISTS);

        const user = await this._userRepository.create({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.passwordHash
        });

        await clearRegistrationState(email);
        
        const refreshToken = generateRefreshToken(user._id.toString());
        const accessToken = generateAccessToken(user._id.toString(), email);

        return { user: UserMapper.toDto(user), refreshToken, accessToken };
    }

    async login(email: string, password: string)
    : Promise<{ user: Partial<UserDto>; refreshToken: string; accessToken: string; }> {

        const user = await this._userRepository.findByEmail(email);
        if (!user) throw new Error(APP_MESSAGES.AUTH.INVALID_EMAIL);

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new Error(APP_MESSAGES.AUTH.INVALID_PASSWORD);

        const refreshToken = generateRefreshToken(user._id.toString());
        const accessToken = generateAccessToken(user._id.toString(), email);

        return { user: UserMapper.toDto(user), refreshToken, accessToken };
    }

    async refresh(incomingRefreshToken: string)
    : Promise<{ user: Partial<UserDto>; accessToken: string; refreshToken: string; }> {
        if (!incomingRefreshToken) throw new Error(APP_MESSAGES.AUTH.TOKEN_REQUIRED);

        const decoded = verifyRefreshToken(incomingRefreshToken);

        const user = await this._userRepository.findById(decoded.userId);
        if (!user) throw new Error(APP_MESSAGES.AUTH.USER_NOT_FOUND);

        const refreshToken = generateRefreshToken(user._id.toString());
        const accessToken = generateAccessToken(user._id.toString(), user.email);
        
        return { user: UserMapper.toDto(user), accessToken, refreshToken };
    }
}