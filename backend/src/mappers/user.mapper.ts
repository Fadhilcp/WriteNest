import { UserDto } from "../dtos/user.dto.js"; // Adjust path based on your setup
import { IUserDocument } from "../types/user.type.js";

export class UserMapper {

    static toDto(user: IUserDocument): UserDto {
        return {
            id: user._id ? user._id.toString() : user._id, 
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static toDtoList(users: IUserDocument[]): UserDto[] {
        return users.map((user) => this.toDto(user));
    }
}