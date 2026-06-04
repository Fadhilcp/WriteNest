import { BaseRepository } from "./base.repository";
import userModel from "../models/user.model";
import { IUserDocument } from "../types/user.type";

export class UserRepository extends BaseRepository<IUserDocument> {
    constructor() {
        super(userModel);
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        return this.model.findOne({ email });
    }
}