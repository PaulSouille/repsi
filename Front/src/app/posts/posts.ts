import { User } from '../users/users';

export interface Post     {
    id: string;
    comments: Comment[];
    content: string;
    creation_date: string;
    creator: User;
    deleted_date: string;
    name: string;
    state: string;
    topic: string;
    number_likes;
}