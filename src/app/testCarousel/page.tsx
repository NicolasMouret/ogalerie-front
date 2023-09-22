import TestCarousel from "../../components/testCarousel/TestCarousel";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-end min-h-screen">
      <div className="w-10/12 pb-12">
        {/* The carousel component takes a number of slides and a height in pixels 
        4 slides with 400px height for Homepage, serchresults and artists lists
        3 slides with 350px height for Artist collections and favorites*/}
        <TestCarousel slidesNb={4} heightPx={400}/>
      </div>
    </main>
    );
}