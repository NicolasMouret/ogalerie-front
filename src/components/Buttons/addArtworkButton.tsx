import add from '@/src/assets/images/add.png';
import SlideDesktop from '../testCarousel/SlideDesktop';
import SlideMobile from '../testCarousel/SlideMobile';

interface AddArtworkButtonProps {
    screen: string;
    url: string;
}

export default function AddArtworkButton({ screen, url }: AddArtworkButtonProps) {
    if (screen==="mobile") {
        return <SlideMobile url={add} />
    } if (screen==="desktop") {
        return <SlideDesktop url={url} page="home"/>
    }
}