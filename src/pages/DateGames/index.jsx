import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { useEffect, useState } from 'preact/hooks';
import data from '../../../data/dateGames.json'
import VideoCard from '../Home/component/VideoCard';
import { showMenu } from '../../utils/signals';
import { Link } from 'preact-router/match';





const DateGames = ({ date }) => {

    const [_date, setDate] = useState(date)

    useEffect(() => {
        if (window.innerWidth > 768) {
            showMenu.value = true
        } else {
            showMenu.value = false
        }
    }, [date])

    const changeDay = (delta) => {


        const year = parseInt(_date.slice(0, 4), 10);
        const month = parseInt(_date.slice(4, 6), 10) - 1;
        const day = parseInt(_date.slice(6, 8), 10);

        const current = new Date(year, month, day);
        current.setDate(current.getDate() + delta);
        const x = `${current.getFullYear()}${String(current.getMonth() + 1).padStart(2, "0")}${String(current.getDate()).padStart(2, "0")}`

        setDate(x);
        console.log(x)
    };

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


        const dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        return `${dayOfWeek[date.getDay()]} ${day} de ${months[month][0].toUpperCase() + months[month].slice(1)}`;
    };


    const { data, isLoading, error } = useSWR(`https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=soccer&lang=es&region=ar&dates=${_date}`,
        fetcher,
        {
            revalidateOnFocus: false,

        },
    );


    if (isLoading)
        return (
            <div class={"flex flex-col w-full gap-5"}>
                <div class={"h-[50px] w-full rounded-lg bg-background-3 animate-pulse"}></div>
                <div class={"grid md:grid-cols-3 grid-cols-1 gap-5"}>


                    {
                        Array.from({ length: 20 }).map(() => (
                            <div class={"bg-background-3 rounded-lg h-[250px] animate-pulse"}></div>
                        ))
                    }
                </div>
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
            <div class={"flex md:flex-row flex-col items-center justify-between w-fullp-1"}>

                <div class={"flex flex-row justify-between w-full items-center gap-2 p-1"}>
                    <button
                        onClick={() => changeDay(-1)}
                        class="text-2xl px-3 py-1 cursor-pointer rounded bg-gray-800 hover:bg-gray-700 text-white"
                    >
                        ◀
                    </button>

                    <h2 class={"md:text-3xl text-lg md:text-start text-center font-semibold"}>{formatDate(_date)}</h2>

                    <button
                        onClick={() => changeDay(1)}
                        class="text-2xl px-3 py-1 cursor-pointer rounded bg-gray-800 hover:bg-gray-700 text-white"
                    >
                        ▶
                    </button>
                </div>
            </div>
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