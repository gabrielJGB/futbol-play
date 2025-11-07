import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

import data from '../../../data/dateGames.json'
import VideoCard from '../Home/component/VideoCard';
import { showMenu } from '../../utils/signals';
import { Link } from 'preact-router/match';



const formatDate = (str) => {
    const year = parseInt(str.slice(0, 4), 10);
    const month = parseInt(str.slice(4, 6), 10) - 1; // los meses van de 0 a 11
    const day = parseInt(str.slice(6, 8), 10);

    const date = new Date(year, month, day);
    const now = new Date();

    // Normalizamos fechas para comparar sin horas
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.getTime() === today.getTime()) return 'Hoy';
    if (date.getTime() === yesterday.getTime()) return 'Ayer';

    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    return `${day} de ${months[month][0].toUpperCase() + months[month].slice(1)} de ${year}`;
};


const DateGames = ({ date }) => {



    const { data, isLoading, error } = useSWR(`https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${date}`,
        fetcher,
        {
            revalidateOnFocus: false,

        },
    );


    if (isLoading)
        return (
            <div class={"grid md:grid-cols-3 grid-cols-1 gap-5"}>
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

    const leagues = data.sports[0].leagues

    return (

        <div class={"flex flex-col gap-2"}>
            <h2 class={"text-3xl font-semibold"}>Partidos {formatDate(date)}</h2>
            <div class={`grid md:grid-cols-2 ${showMenu.value ? "lg:grid-cols-3" : "lg:grid-cols-4"}  grid-cols-1 gap-5`}>

                {
                    leagues.map(league => (
                        <>
                            {
                                league.events.filter(e => "video" in e).map((event) => (
                                    <div class={""}>

                                        <Link
                                            // @ts-ignore
                                            href={`/${league.slug}`}
                                            class={"pl-2 text-xs hover:underline"}
                                        >
                                            {league.shortName}
                                        </Link>

                                        <VideoCard article={event.video} />
                                    </div>
                                ))
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default DateGames