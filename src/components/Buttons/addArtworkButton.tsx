import add from '@/src/assets/images/add.png';
import SlideAddDesktop from '../testCarousel/SlideAddDesktop';
import SlideAddMobile from '../testCarousel/SlideAddMobile';

interface AddArtworkButtonProps {
    screen: string;
    onClick: () => void;
}

export default function AddArtworkButton({ screen, onClick }: AddArtworkButtonProps) {
    if (screen==="mobile") {
        return <SlideAddMobile url={add} onClick={onClick} />
    } if (screen==="desktop") {
        return <SlideAddDesktop url={add} onClick={onClick}/>
    }
}