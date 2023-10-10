"use client";


interface FilterGalerieMenuProps {
  onClick: () => void|undefined;
}

function FilterGalerieMenu({ onClick }: FilterGalerieMenuProps) {
  return (
    <button className="px-5 text-3xl" onClick={onClick}>
        Filtrer la galerie
        </button>
  );
}

export default FilterGalerieMenu;