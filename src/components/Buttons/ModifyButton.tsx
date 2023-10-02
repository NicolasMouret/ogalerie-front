"use client";

import { MdModeEdit } from "react-icons/md"; 

function ModifyButton ({ onClick }) {

    return (
    <button onClick={onClick}>
        <MdModeEdit className="text-3xl"/>
    </button>
    )
}

export default ModifyButton;