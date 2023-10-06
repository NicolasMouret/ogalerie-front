"use client"; 
import { ReactElement, createContext, useState } from 'react';

export interface tags {
    category: string;
    name: string;
}

export interface comment {
    id: number;
    content: string;
    created_at: string;
    owner: string;
    owner_id: number;
}

export interface ArtworkContextProps {
    artwork: {
        id: number;
        title: string;
        description: string;
        date: string;
        owner: string;
        uri: string;
        likes: number;
        comment: comment[];
        tags: tags[];
        owner_id: number;
        liked_by: number;
        favorite_by: number;
    }   
    setArtwork: (artwork: any) => void;

}

const ArtworkContext = createContext<ArtworkContextProps>({
    artwork: {
        id: 0,
        title: "",
        description: "",
        date: "",
        owner: "",
        uri: "",
        likes: 0,
        comment: [
            {
                id: 0,
                content: "",
                created_at: "",
                owner: "",
                owner_id: 0,
            }
        ],
        tags: [
            {
                category: "",
                name: "",
            }
        ],
        owner_id: 0,
        liked_by: 0,
        favorite_by: 0,
    },
    setArtwork: () => {},
});

function ArtworkContextProvider({ children }: { children: ReactElement }) {
    const [artwork, setArtwork] = useState({
        id: 0,
        title: "",
        description: "",
        date: "",
        owner: "",
        uri: "",
        likes: 0,
        comment: [
            {
                id: 0,
                content: "",
                created_at: "",
                owner: "",
                owner_id: 0,
            }
        ],
        tags: [
            {
                category: "",
                name: "",
            }
        ],
        owner_id: 0,
        liked_by: 0,
        favorite_by: 0,
    });

    return (
        <ArtworkContext.Provider value={{ artwork, setArtwork }}>
            {children}
        </ArtworkContext.Provider>
    );
}

export { ArtworkContextProvider, ArtworkContext };