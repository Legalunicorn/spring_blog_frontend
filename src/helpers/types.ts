export interface User{
    username:string,
    token:string
}

// export interface Post extends PostSummary{

// }

export interface PostType extends PostSummary{
    comments: Comment[]
}

export interface PostPreviewable {
    title:string,
    thumbnail: string,
    body:string,
    author: AuthorSummary,
    like_count: number,
    tag ?: TagSummary[]
}

export interface PostSummary extends PostPreviewable {
    id: string,
    title: string,
    body: string ,
    draft ?: boolean,
    author: AuthorSummary,
    thumbnail :string,
    tags ?: TagSummary[],
    like_count: number,
    createdOn: string,
    updatedOn ?: string,
    comment_count:number
    

}

// type typeCo

export type TagType = {
    id: number,
    name: string
}

export type Comment = {
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
    profilePicture: string
}

export type TagSummary= {
    id?: number,
    name:string
}