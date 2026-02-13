import { Link } from 'preact-router/match'
import { useState } from 'preact/hooks';


const timeAgo = (date) => {
    const now = new Date();
    // @ts-ignore
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMin < 1) return 'Hace unos segundos';
    if (diffMin < 60) return `Hace ${diffMin} minuto${diffMin !== 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 30) return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
    if (diffMonths < 12) return `Hace ${diffMonths} mes${diffMonths !== 1 ? 'es' : ''}`;
    return `Hace ${diffYears} año${diffYears !== 1 ? 's' : ''}`;
};


const VideoCard = ({ article }) => {

    const published = article.published ?? article.originalPublishDate
    const img = "images" in article ? article.images[0].url : article.thumbnail
    const [showDescription, setShowDescription] = useState(false)

    return (
        <Link
            // @ts-ignore
            href={`/video/${article.id}`}
            class={"flex flex-col gap-1  relative border border-transparent hover:border-primary  active:border-primary  rounded-lg  transition-all p-1 hover:bg-red-900   cursor-pointer  "}

            onMouseEnter={() => {
                setTimeout(() => {
                    setShowDescription(true)
                }, 200);
            }}
            
            onMouseLeave={() => {
                setShowDescription(false)
                setShowDescription(false)
            }}
        >
            {
                img &&
                <img src={img} class={" mx-auto rounded-lg aspect-video "} alt={"Imagen"} />
            }



            <div class={"flex flex-col flex-1  px-1 "}>
                
                <div class={"text-start mt-1 text-xs mb-1 text-gray-300  italic "}>
                    {timeAgo(new Date(published))}
                </div>
                <div class={" text-start  font-semibold text-white text-lg leading-6"}>{article.headline}</div>

            </div>


        </Link>
    )
}

export default VideoCard