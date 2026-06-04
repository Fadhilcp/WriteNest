import { Model, QueryFilter } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export class BaseRepository<TDocument> implements IBaseRepository<TDocument> {

    constructor(
        protected model: Model<TDocument>
    ){}


    async create(data: Partial<TDocument>): Promise<TDocument> {
        return await this.model.create(data);
    }

    async findOne(filter: QueryFilter<TDocument>): Promise<TDocument | null> {
        return await this.model.findOne(filter);
    }

    async find(filter: QueryFilter<TDocument>): Promise<TDocument[]> {
        return await this.model.find(filter);
    }

    async findById(id: string): Promise<TDocument | null> {
        return await this.model.findById(id);
    }

    async update(id: string, data: Partial<TDocument>): Promise<TDocument | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }

}