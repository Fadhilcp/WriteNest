import { Query, QueryFilter } from "mongoose";

export interface IBaseRepository<TDocument> {
    create(data: Partial<TDocument>): Promise<TDocument>;
    update(id: string, data: Partial<TDocument>): Promise<TDocument | null>;
    find(filter: QueryFilter<TDocument>): Promise<TDocument[]>;
    findOne(filter: QueryFilter<TDocument>): Promise<TDocument | null>;
    findById(id: string): Promise<TDocument | null>;
    delete(id: string): Promise<boolean>;
}