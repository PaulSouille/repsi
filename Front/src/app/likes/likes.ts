export interface PostLikes {
    data: {
        parentId:string;
        numberLikes: string;
    }

}

export interface LikesUser {
    data: {
        parentId:string;
        userId: string;
        isLikedByUser: boolean;
    }
}