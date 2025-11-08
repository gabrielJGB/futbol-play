import VideoCard from '@/pages/Home/component/VideoCard';
import { fetcher } from '@/utils/fetcher';
import { getLogo } from '@/utils/helper';
import { showMenu } from '@/utils/signals'
import { useEffect } from 'preact/hooks';
import React from 'react'
import useSWR from 'swr'

const GamePage = ({ id }) => {

    "https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=729206"

    useEffect(() => {
        if (window.innerWidth > 768){
            showMenu.value = true
        }else{
            showMenu.value = false
        }
    }, [])


    const { data: game, isLoading, error } = useSWR(`https://site.web.api.espn.com/apis/site/v2/sports/soccer/all/summary?region=ar&lang=es&contentorigin=deportes&event=${id}`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    if (isLoading)
        return (
            <div class={"flex"}>

                <div class={"bg-background-3 rounded-lg h-[250px] w-full animate-pulse"}></div>

            </div>
        )


    if (error)
        return (
            <div class={"text-center w-full mt-2 font-semibold text-sm"}>
                Ha ocurrido un error {":("}
            </div>
        )



    const [home, away] = game.header.competitions[0].competitors
    const status = game.header.competitions[0].status.type.detail
    const url = `https://nfutbol.vercel.app/game/${game.header.id}`
    const videos = game.videos
    console.log(home);
    

    return (
        <div class={"flex flex-col gap-2"}>

<div class={"bg-background w-full rounded-lg p-2 shadow-black shadow-lg"}>

            <div class={"flex flex-row gap-3 items-center justify-center  rounded-lg"}>
                <div class={"flex flex-col items-center justify-center"}>
                    <img src={getLogo(home.team, 30)} class={"size-[30px]"} alt="" />
                    <div class={"md:text-sm text-xs"}>{home.team.displayName}</div>
                </div>
                <div class={"flex text-3xl text-white"}>
                    <div class={`${home.winner?"text-red-400":""}`}>{home.score}</div>
                    <div>-</div>
                    <div class={`${away.winner?"text-red-400":""}`}>{away.score}</div>
                </div>
                <div class={"flex flex-col items-center justify-center"}>
                    <img src={getLogo(away.team, 40)} class={"size-[40px]"} alt="" />
                    <div class={"md:text-sm text-xs"}>{away.team.displayName}</div>
                </div>
            </div>

            <div class={"p-1 bg-black text-sm  mt-1 w-max rounded mx-auto px-3 font-semibold"}>
                {status}
            </div>
            <div class={"w-full mx-auto"}>

            <a target={"_blank"} href={url} class={"mx-auto w-full hover:underline text-sm   text-center  px-3 cursor-pointer"}>Ficha del partido</a>
            </div>
</div>


            {
                videos != undefined &&
                <div class={`grid md:grid-cols-2 ${showMenu.value ? "lg:grid-cols-3" : "lg:grid-cols-4"}  grid-cols-1 gap-5`}>
                    {
                        videos.map((article) => (
                            <VideoCard article={article} />
                        ))
                    }

                </div>
            }
        </div >
    )
}

export default GamePage