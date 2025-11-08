import { Link } from 'preact-router/match'
import React from 'react'

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
    return (
        <Link
            // @ts-ignore
            href={`/video/${article.id}`}
            class={"flex flex-col gap-1  relative border border-transparent hover:border-primary  active:border-primary  rounded-lg hover:scale-98 transition-all p-1 hover:bg-[#1a1a1a] hover:shadow-black  shadow-lg  cursor-pointer  "}
            title={article.description}
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





            <div class={"flex flex-row flex-wrap gap-1"}>
                {/* <div class={"rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs cursor-pointer p-1 text-white"}> */}

                {/* </div> */}
                {/* {
                    article.categories.filter(cat => cat.type === "league" || cat.type === "team" || cat.type === "event").map(item => (
                        <div class={"rounded border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs cursor-pointer p-1 text-white"}>{item.description.replace("@", "vs")}</div>
                    ))
                } */}

            </div>

        </Link>
    )
}

export default VideoCard