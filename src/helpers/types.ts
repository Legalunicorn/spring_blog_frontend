export interface User{
    username:string,
    token:string
}

// export interface Post extends PostSummary{

// }

export interface PostType extends PostSummary{
    comments: comment[]
}


export interface PostSummary  {
    id: string,
    title: string,
    body: string ,
    draft ?: boolean,
    author: AuthorSummary,
    thumbnail ?:string,
    tags ?: TagSummary[],
    like_count: number,
    createdOn: string,
    updatedOn ?: string,

}

// type typeCo

export type TagType = {
    id: number,
    name: string
}

type comment = {
    id ?: number 
    body: string 
    author: AuthorSummary,
    postId: number,
    createdOn: string,
    updatedOn?: string
}

type AuthorSummary = {
    id ?: number,
    username: string,
    profile_picture: string
}

export type TagSummary= {
    id: number,
    name:string
}