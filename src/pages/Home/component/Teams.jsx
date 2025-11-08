import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { getLogo } from '../../../utils/helper';
import { Link } from 'preact-router/match';

const Team = ({ team }) => {

    const logoHref = getLogo(team, 42)





    return (
        <Link
            // @ts-ignore
            href={`/team/${team.id}`}
            class={"flex flex-col hover:scale-120"}
             title={team.displayName} 
        >
            {
                logoHref != undefined ?
                    <img src={logoHref} class={"cursor-pointer  transition-all size-9 drop-shadow-black drop-shadow-xs "} alt="Logo equipo" />
                    :
                    <div class={"bg-background-4 size-7 rounded-full"}></div>
            }
            <div class={"text-[10px] text-center "}>{team.abbreviation}</div>
        </Link>
    )
}


const Teams = ({ category }) => {

    const { data, isLoading, error } = useSWR(`https://site.api.espn.com/apis/site/v2/sports/soccer/${category}/teams`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    if (isLoading)
        return (
            <div class={"flex flex-row flex-wrap items-center gap-1 px-1 mb-4"}>
                {Array.from({ length: 20 }).map(() => (
                    <div class={"bg-background-3 size-9 rounded-full animate-pulse"}></div>
                ))}
            </div>
        )


    if (error)
        return;

    const teams = data.sports[0].leagues[0].teams

    return (
        <div class={"flex flex-row flex-wrap items-center gap-1 px-1 mb-4  md:justify-start justify-center"}>

            {
                teams.map((item) => (
                    <Team team={item.team} />
                    // <div>{item.team}</div>
                ))
            }
        </div>
    )
}

export default Teams