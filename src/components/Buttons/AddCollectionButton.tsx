"use client";
import { useState } from "react";
import axiosInstance from "@/src/utils/axios";
import OutsideClickHandler from 'react-outside-click-handler';
import { BiSolidAddToQueue } from "react-icons/bi";

interface AddCollectionButtonProps {
    userId: string;
}

export default function AddCollectionButton({userId}: AddCollectionButtonProps) {
    const [isInput, setIsInput] = useState(false);
    const [title, setTitle] = useState("");
    console.log("userId", userId);

    const showInput = () => {
        setIsInput(true);
    }

    const addCollection = () => {
        setIsInput(false);
        axiosInstance.post(`/users/${userId}/collections`, {
            title: title,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }}).then((res) => {
                console.log("res collections", res.data);
            }).catch((err) => {
            console.log(err);
            throw err;
        })
    }
    
    return (<>
    {isInput ? 
        <div className="flex items-center gap-2 py-4 w-[90vw] mx-auto sm:w-fit sm:mx-0 sm:py-0 text-lg font-bold">
            <BiSolidAddToQueue/>
            <OutsideClickHandler onOutsideClick={() => setIsInput(false)} >
            <input 
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none w-[70%] sm:w-[60%] pl-2 border-2 border-gray-400 rounded-md" 
                type="text" 
                placeholder="Titre de la collection" />
            <button onClick={addCollection} className="ml-2 px-2 bg-slate-100 border-2 text-m font-medium border-gray-400 rounded">Ajouter</button>
            </OutsideClickHandler>
        </div>
     :    
        <button onClick={showInput} className="flex items-center gap-2 py-4 w-[90vw] mx-auto sm:w-fit sm:mx-0 sm:py-0 text-lg font-bold">
            <BiSolidAddToQueue/> Ajouter une collection
        </button>
    }</>)
}


