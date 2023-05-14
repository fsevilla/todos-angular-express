import { File } from "./file";

export interface Todo {
    _id?: string;
    title: string;
    description: string;
    status?: string;
    userId?: string;
    files?: File[],
    createdAt?: string;
    updatedAt?: string;
}
