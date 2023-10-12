"use client";

import { UiContext } from '@/src/contexts/UiContext';
import axiosInstance from '@/src/utils/axios';
import LikeButton from '@/src/components/Buttons/LikeButton';
import FaveButton from '@/src/components/Buttons/FaveButton';
import SignalButton from '@/src/components/Buttons/SignalButton';
import ModifyButton from '../Buttons/ModifyButton';
import EditArtworkForm from '../Forms/EditArtworkForm';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useContext } from 'react';
import Link from 'next/link';

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
	ownerId: string;
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
	ownerId,
	setIsLiked }: ArtworkInfosProps) {
	const { showModalEditArtwork, setShowModalEditArtwork } = useContext(UiContext);

	const showEdit = () => {
		setShowModalEditArtwork(true);
	}

	const deleteArtwork = () => {
		axiosInstance.delete(`artworks/${artworkId}`)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
				throw err;
			})
	}

	
	return (
		<div className="flex flex-col justify-center gap-2 overflow-hidden pb-6 h-fit w-[95vw] md:w-[800px]">
			<div className="flex flex-col md:flex-row items-center">
			<h1 className="text-3xl sm:text-4xl md:text-4xl mb-4 md:mb-0 md:mr-6">"{title}"</h1>
				{likes === 0 && <span><BsHeart className="inline text-2xl mr-1" /> {likes} like</span>}
				{likes === 1 && <span><BsHeartFill className="inline text-2xl mr-1" /> {likes} like</span>}
				{likes > 1 && <span><BsHeartFill className="inline text-2xl mr-1" /> {likes} likes</span>}
			</div>
			<p className="pl-4">Par <span className="underline font-bold"><Link href={`${ownerId === userId ? '/mon-profil-artiste' : `/artist/${ownerId}`}`}>{author}</Link></span></p>
			<div className="flex items-center gap-1 pl-4 mt-4">
				<p>{date} - </p>
				<p>{typeTag}</p>
				<p>{support}</p>
				<p>{style}</p>
			</div>
			{/* <p className="pl-4 underline">Voir la collection</p> */}
			<p className="pl-4 mb-4 md:mb-0 mt-4">{description}</p>
			<div className="flex items-center h-8 pl-4 mt-4 gap-12">
				{userId && <LikeButton 
				userId={userId}
				artworkId={artworkId}
				isLiked={isLiked}
				setIsLiked={setIsLiked}
				/>}
				{userId && localStorage.getItem("situation") !== "creator" &&
				<FaveButton 
				userId={userId} 
				artworkId={artworkId} 
				isFaves={isFaves} 
				setIsFaves={setIsFaves} />}
				<EditArtworkForm 
					prevTitle={title} 
					prevDate={date} 
					prevTypeTag={typeTag} 
					prevDescription={description}
					prevStyle={style}
					prevSupport={support}
					userId={userId}
					artworkId={artworkId} />
				{userId === ownerId &&
				<>
				<button onClick={showEdit} className="flex items-center"><ModifyButton />Modifier l'oeuvre</button>
				<Link href="/mon-profil-artiste" onClick={deleteArtwork} className="flex items-center"><RiDeleteBin6Line/>Supprimer l'oeuvre</Link>
				</>
				}
				{/* <SignalButton size="md" sizeIcon="3xl"/> */}
			</div>
		</div>
    )
}