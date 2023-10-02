"use client";

interface ArtistProps {
  id: string;
  nickname: string;
  avatar: string;
}

interface ArtistCarouselProps {
  artists: ArtistProps[];
}

const ArtistCarousel: React.FC<ArtistCarouselProps> = ({ artists }) => {
  return (
    <div className="flex overflow-x-scroll hide-scrollbar">
      {artists.map(artist => (
        <div key={artist.id} className="mx-4">
          <img src={artist.avatar} alt={artist.nickname} className="w-48 h-48 object-cover rounded-full" />
          <h2 className="text-center mt-2">{artist.nickname}</h2>
        </div>
      ))}
    </div>
  );
}

export default ArtistCarousel;