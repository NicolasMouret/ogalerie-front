"use client";
import LikeButton from '@/src/components/Buttons/LikeButton';
import FaveButton from '@/src/components/Buttons/FaveButton';
import SignalButton from '@/src/components/Buttons/SignalButton';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

interface ArtworkInfosProps {
    title: string;
    likes: number;
    author: string;
    date: string;
    typeTag?: string;
    support?: string;
    style?: string;
    description: string;
	userId: string;
	artworkId: string;
	isFaves: boolean;
	setIsFaves: (isFaves: boolean) => void;
	isLiked: boolean;
	setIsLiked: (isLiked: boolean) => void;
}

export default function ArtworkInfos({ 
	title, 
	likes, 
	author, 
	date, 
	typeTag, 
	support, 
	style, 
	description,
	userId,
	artworkId,
	isFaves,
	setIsFaves,
	isLiked,
	setIsLiked }: ArtworkInfosProps) {
	return (
		<div className="flex flex-col justify-start gap-2 overflow-hidden h-[77vh] md:h-[40vh] w-[95vw] md:w-[800px]">
			<div className="flex flex-col md:flex-row items-center">
				<h1 className="text-4xl mb-4 md:mb-0 md:mr-6">"{title}"</h1>
				{likes === 0 && <span><BsHeart className="inline text-2xl mr-1" /> {likes} like</span>}
				{likes === 1 && <span><BsHeartFill className="inline text-2xl mr-1" /> {likes} like</span>}
				{likes > 1 && <span><BsHeartFill className="inline text-2xl mr-1" /> {likes} likes</span>}
			</div>
			<p className="pl-4">Par <span className="underline font-bold">{author}</span></p>
			<div className="flex items-center gap-1 pl-4 mt-4">
				<p>{date} - </p>
				<p>{typeTag}</p>
				<p>{support}</p>
				<p>{style}</p>
			</div>
			{/* <p className="pl-4 underline">Voir la collection</p> */}
			<p className="pl-4 mb-4 md:mb-0 mt-4">{description}</p>
			<div className="flex items-center h-8 pl-4 mt-4 gap-12">
				<LikeButton 
				userId={userId}
				artworkId={artworkId}
				isLiked={isLiked}
				setIsLiked={setIsLiked}
				/>
				<FaveButton 
				userId={userId} 
				artworkId={artworkId} 
				isFaves={isFaves} 
				setIsFaves={setIsFaves} />
				<SignalButton size="md" sizeIcon="3xl"/>
			</div>
		</div>
    )
}