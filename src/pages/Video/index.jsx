import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

import VideoPlayer from '../../components/VideoPlayer';
import { defaultQuality, showMenu } from '../../utils/signals';
import { Link } from 'preact-router/match';

const VideoPage = ({ id }) => {

    const [videoQuality, setVideoQuality] = useState(defaultQuality.value)

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


    const event = data.headlines[0].categories.find(e => e.type === "event")
    const teams = data.headlines[0].categories.filter(x => x.type === "team")

    const SD = data.headlines[0].video[0].links.mobile.source.href
    const HD = data.headlines[0].video[0].links.source.HD.href

    const published = new Date(data.headlines[0].published)?.toLocaleString()
    

    const story = "story" in data.headlines[0] && data.headlines[0].story
        .replaceAll("<p>", "<p style=margin-top:19px>")
        .replaceAll("<h2>", "<h2 style=margin-top:20px;font-size:18px;font-weight:bold >")
        .replace("<hr>", "<hr style=margin-top:10px>")
        .replace("twitter.com", "xcancel.com")

    return (
        <div class={`min-h-screen md:p-2 p-1 grid ${showMenu.value ? "md:grid-cols-[4fr_1fr] grid-cols-1" : "md:grid-cols-[2fr_1fr] grid-cols-1"}  gap-4`}>

            <div class={"relative"}>

                <VideoPlayer
                    key={videoQuality}
                    videoUrl={videoQuality === "SD" ? SD : HD}
                    autoPlay={true}
                    muted={false}
                    thumbnail={data.headlines[0].video[0].thumbnail}
                />

                <div class={"flex md:flex-row flex-col-reserve gap-2"}>
                    <h2 class={"md:text-2xl text-lg font-semibold text-white mt-2 "}>{data.headlines[0].headline}</h2>

                    <div class={"flex justify-end md:flex-row flex-col h-min mt-3"}>
                        <button
                            onClick={() => {
                                setVideoQuality("HD")
                                defaultQuality.value = "HD"
                            }}
                            class={`${videoQuality === "HD" ? "bg-red-700 text-white" : "bg-background-3 text-gray-400"} font-semibold text-sm p-1 border border-black cursor-pointer `}>HD</button>

                        <button
                            onClick={() => {
                                setVideoQuality("SD")
                                defaultQuality.value = "SD"
                            }}
                            class={`${videoQuality === "SD" ? "bg-red-700 text-white" : "bg-background-3 text-gray-400"} font-semibold text-sm p-1 border border-black cursor-pointer `}>SD</button>
                    </div>



                </div>
                <div class={"text-sm mt-2"}>{published}</div>

                <div class={"text-gray-300 text-sm md:px-0 my-2 italic"}>
                    {data.headlines[0].description}
                </div>
                <div class={"flex flex-wrap items-center gap-2 py-1 mb-3"}>
                    {
                        event != undefined &&
                        <Link
                            // @ts-ignore
                            href={`/game/${event.event.id}`}
                            class={"px-2 py-1 text-sm rounded border cursor-pointer hover:bg-background-4 border-zinc-700 bg-background-3"}>
                            <div>{event.description.replace("@", "vs")}</div>
                        </Link>
                    }

                    {
                        teams.map(team => (
                            <Link
                                // @ts-ignore
                                href={`/team/${team.team.id}`}
                                class={"px-2 py-1 text-sm cursor-pointer hover:bg-background-4 rounded border border-zinc-700 bg-background-3"}>
                                <div>{team.description}</div>
                            </Link>
                        ))
                    }

                </div>
                {
                    story &&
                    <p className=' bg-zinc-900 md:px-5 px-1 py-[1px] rounded-lg shadow-xs shadow-black  md:text-[14px] text-[14px] leading-6' dangerouslySetInnerHTML={{ __html: story }}></p>
                }

            </div>

            <div class={"text-white"}>
                -
            </div>

        </div>
    )
}

export default VideoPage