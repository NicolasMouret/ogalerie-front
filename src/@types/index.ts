export interface Tag {
    id: number;
    category: string;
    name: string;
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    owner: string;
    owner_id: number;
    avatar: string;
}

export interface Artwork {
    id: number;
    title: string;
    description: string;
    date: string;
    owner: string;
    uri: string;
    likes: number;
    comment: Comment[];
    tags: Tag[];
    owner_id: number;
    liked_by: number;
    favorite_by: number;
}

export interface Collection {
    id: number;
    title: string;
    artworks: Artwork[];
}
