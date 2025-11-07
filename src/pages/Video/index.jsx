import React, { useEffect } from 'react'
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

import VideoPlayer from '../../components/VideoPlayer';
import { showMenu } from '../../utils/signals';

const VideoPage = ({ id }) => {


    useEffect(() => {
        showMenu.value = false
    }, [])


    const { data, isLoading, error } = useSWR(`https://now.core.api.espn.com/v1/sports/news/${id}?lang=es`,
        fetcher,
        {
            revalidateOnFocus: false,

        },
    );

    if (isLoading)
        return (
            <div class={`grid ${showMenu.value ? "md:grid-cols-[4fr_1fr] grid-cols-1" : "md:grid-cols-[2fr_1fr] grid-cols-1"}  gap-5`}>

                <div class={"bg-background-3 rounded-lg h-[500px] animate-pulse"}></div>

                <div class={"flex flex-col gap-3"}>
                    {Array.from({ length: 10 }).map(() => (
                        <div class={" bg-background-3 rounded-lg w-full h-[140px] animate-pulse"}></div>
                    ))}
                </div>

            </div>
        )


    if (error)
        return (
            <div class={"text-center w-full mt-2 font-semibold text-sm"}>
                Ha ocurrido un error {":("}
            </div>
        )


    console.log(data);

    const story = "story" in data.headlines[0] && data.headlines[0].story
        .replaceAll("<p>", "<p style=margin-top:19px>")
        .replaceAll("<h2>", "<h2 style=margin-top:20px;font-size:18px;font-weight:bold >")
        .replace("<hr>", "<hr style=margin-top:10px>")
        .replace("twitter.com", "xcancel.com")

    return (
        <div class={`min-h-screen grid ${showMenu.value ? "md:grid-cols-[4fr_1fr] grid-cols-1" : "md:grid-cols-[2fr_1fr] grid-cols-1"}  gap-4`}>

            <div class={"relative"}>
                <VideoPlayer videoUrl={data.headlines[0].video[0].links.mobile.source.href} autoPlay={true} muted={false} thumbnail={data.headlines[0].video[0].thumbnail} />
                <h2 class={"text-2xl font-semibold text-white mt-2 "}>{data.headlines[0].headline}</h2>
                <div class={"text-gray-300 text-sm md:px-2 my-2 italic"}>
                    {data.headlines[0].description}
                </div>
                {
                    story&&
                <p className=' bg-zinc-900 md:px-2 px-1 py-[1px] rounded-lg shadow-xs shadow-black  md:text-[14px] text-[14px] leading-6' dangerouslySetInnerHTML={{ __html: story }}></p>
                }

            </div>

            <div class={"text-white"}>
                -
            </div>

        </div>
    )
}

export default VideoPage