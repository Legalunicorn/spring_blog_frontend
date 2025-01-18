export interface User{
    username:string,
    profilePicture: string,
    token:string
}

// export interface Post extends PostSummary{

// }


export interface PostType extends PostSummary{
    comments: Comment[]
}

export interface PostPreviewableType {
    id ?: string,
    title:string,
    thumbnail: string,
    body:string,
    author: AuthorSummary,
    like_count: number,
    tags : TagSummary[],
    createdOn: string,
    // comment_count: number
}


//Actual entity from database
export interface PostSummary extends PostPreviewableType {
    id: string,
    // title: string,
    // body: string ,
    draft ?: boolean,
    // author: AuthorSummary,
    // thumbnail :string,
    // tags : TagSummary[],
    // like_count: number,
    // createdOn: string,
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

export type AuthorSummary = {
    id ?: number,
    username: string,
    profilePicture: string
}

export type TagSummary= {
    id?: number,
    name:string
}