import { User } from '../users/users';

export interface Post {
    id: string;
    comments: Comment[];
    content: string;
    creation_date: string;
    creator: string;
    creator_user: User;
    deleted_date: string;
    name: string;
    state: string;
    topic: string;
    number_likes: string;
    is_liked_by_user: boolean;
}
export interface Comment{
    id: string;
    content : string;
    creator : string;
    creator_user: User;
    creation_date : string;
    deleted_date: string;
    comment_id : string;
    post_id : string;
    number_likes: string;
    is_liked_by_user: boolean;
} 

export interface PostData{
    content: string;
    creation_date: string;
    creator: string;
    state: string;
    topic: string;
    name: string;
}
