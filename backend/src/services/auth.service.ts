import { APP_MESSAGES } from "../constants/messages";
import { UserDto } from "../dtos/user.dto";
import { UserMapper } from "../mappers/user.mapper";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import generateAccessToken from "../util/generateAccessToken";
import generateRefreshToken from "../util/generateRefreshToken";
import { verifyRefreshToken } from "../util/verifyToken";
import { IAuthService } from "./interfaces/IAuthService";
import bcrypt from "bcrypt";

export class AuthService implements IAuthService {
    constructor(
        private _userRepository: IUserRepository
    ){}

    async register(name: string, email: string, password: string, confirmPassword: string)
    : Promise<{ user: Partial<UserDto>; refreshToken: string; accessToken: string; }> {
        
        const isUserExist = await this._userRepository.findByEmail(email);

        if(isUserExist) throw new Error(APP_MESSAGES.AUTH.USER_EXISTS);

        if(password !== confirmPassword){
            throw new Error(APP_MESSAGES.AUTH.PASSWORD_MISMATCH);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await this._userRepository.create({
            name,
            email,
            password: hashPassword
        });

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