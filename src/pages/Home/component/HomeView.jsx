import React from 'react'
import useSWR from 'swr';
import VideoCard from './VideoCard';
import { fetcher } from '../../../utils/fetcher';
import data from '../../../../data/home.json'
import Teams from './Teams';
import { showMenu } from '../../../utils/signals';

const HomeView = ({ category }) => {

	const { data, isLoading, error } = useSWR(`https://site.api.espn.com/apis/site/v2/sports/soccer/${category}/news?lang=es&content=video&limit=70&_899898`,
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
				Ha ocurrido una catastrofe {":("}
			</div>
		)



		
		

	return (
		<div class={"text-white"}>

			<h1 class={"text-white font-semibold md:text-3xl text-2xl p-2 mb-1"}>{data.header.split("-")[1]}</h1>

			<Teams category={category}/>

			<div class={`grid md:grid-cols-2 ${showMenu.value?"lg:grid-cols-3":"lg:grid-cols-4" }  grid-cols-1 gap-5`}>


				{
					data.articles.filter(a => a.type === "Media").map((article) => (
						<VideoCard article={article} />
					))
				}

			</div>

		</div>
	)
}

export default HomeView