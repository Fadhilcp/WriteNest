export interface IAuthor {
    _id: string;
    name: string;
    email: string;
}

export interface IPost {
    _id: string;
    title: string;
    content: string;
    image?: string;
    author: IAuthor;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IUser {
    id:    string;
    name:  string;
    email: string;
}