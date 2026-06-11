import { BaseRepository } from "./base.repository";
import userModel from "../models/user.model";
import { IUserDocument } from "../types/user.type";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
    constructor() {
        super(userModel);
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        return this.model.findOne({ email });
    }
}