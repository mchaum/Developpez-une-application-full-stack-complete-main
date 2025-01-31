export interface Comment {
    id: number;
    userId: number;
    articleId: number;
    description: string;
    username?: string;
    createdAt: string;
}