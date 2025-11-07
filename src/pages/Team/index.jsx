import React from 'react'
import { useEffect } from 'preact/hooks';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { showMenu } from '../../utils/signals';
import VideoCard from '../Home/component/VideoCard';

const TeamPage = ({ id }) => {

    useEffect(() => {
        if (window.innerWidth > 768)
            showMenu.value = true
    }, [])


    const { data, isLoading, error } = useSWR(`https://site.web.api.espn.com/apis/v2/flex?sport=soccer&league=soccer&region=ar&lang=es&contentorigin=deportes&team=${id}&limit=80&offset=0&pubkey=soccer-clubhouse`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    if (isLoading)
        return (
            <div class={"grid md:grid-cols-3 grid-cols-1 md:gap-5"}>
                {
                    Array.from({ length: 20 }).map(() => (
                        <div class={"bg-background-3 rounded-lg h-[250px] animate-pulse"}></div>
                    ))
                }
            </div>
        )


    if (error)
        return (
            <div class={"text-center w-full mt-2 font-semibold text-sm"}>
                Ha ocurrido un error {":("}
            </div>
        )

    const items = data.columns[1].items[0].feed.filter(x => "video" in x)
    const team = data.team

    return (
        <div class={"flex flex-col gap-4"}>
            <div>

                <h1 class={"text-white font-semibold pl-1 text-3xl mb-4"}>
                    {team.displayName}
                </h1>
            </div>

            <div class={`grid md:grid-cols-2 ${showMenu.value ? "lg:grid-cols-3" : "lg:grid-cols-4"}  grid-cols-1 gap-5`}>


                {
                    items.map((article) => (
                        <VideoCard article={article} />
                    ))
                }

            </div>


        </div>
    )
}

export default TeamPage