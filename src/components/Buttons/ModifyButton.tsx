"use client";

import { MdModeEdit } from "react-icons/md"; 

interface ModifyButtonProps {
    onClick: () => void;
}

function ModifyButton ({ onClick }: ModifyButtonProps) {

    return (
    <button onClick={onClick}>
        <MdModeEdit className="text-3xl"/>
    </button>
    )
}

export default ModifyButton;