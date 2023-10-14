import SlideAddDesktop from '../testCarousel/SlideAddDesktop';
import SlideAddMobile from '../testCarousel/SlideAddMobile';

interface AddArtworkButtonProps {
    screen: string;
    onClick: () => void;
}

export default function AddArtworkButton({ screen, onClick }: AddArtworkButtonProps) {
  if (screen === 'mobile') {
    return <SlideAddMobile onClick={onClick} />;
  } if (screen === 'desktop') {
    return <SlideAddDesktop onClick={onClick} />;
  }
}
