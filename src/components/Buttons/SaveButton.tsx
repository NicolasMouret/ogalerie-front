"use client";

interface ModifyButtonProps{
    onClick: () => void;
}

function SaveButton({ onClick }: ModifyButtonProps) {

    return (
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClick}>
            Sauvegarder les modifications
        </button>
    );
}

export default SaveButton;