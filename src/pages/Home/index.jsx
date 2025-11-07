
import useSWR from 'swr';
import { Link } from 'preact-router/match'
import { fetcher } from '../../utils/fetcher';
import data from '../../../data/home.json'
import VideoPlayer from '../../components/VideoPlayer';
import VideoCard from './component/VideoCard';
import { load, save } from '../../utils/storage';
import { useEffect } from 'preact/hooks';
import HomeView from './component/HomeView';
import CategorySelector from './component/CategorySelector';
import { showMenu } from '../../utils/signals';


export function Home({ category }) {




	useEffect(() => {
		if (window.innerWidth > 768)
	  showMenu.value = true
	}, [])



	if (category === undefined) {

		const defaultCategory = load("category")

		if (defaultCategory != undefined) {
			return <HomeView category={defaultCategory} />
		} else {
			return <CategorySelector/>
		}

	} else {
		return <HomeView category={category} />

	}








	// https://now.core.api.espn.com/v1/sports/news/15910896?lang=es

	// const { data, isLoading, error } = useSWR(`https://site.api.espn.com/apis/site/v2/sports/soccer/arg.1/news?lang=es&content=video&limit=50&_899898`,
	// 	fetcher,
	// 	{
	// 		revalidateOnFocus: false,

	// 	},
	// );

	// if (isLoading)
	// 	return (
	// 		<div class={"grid md:grid-cols-3 grid-cols-1 gap-5"}>
	// 			{
	// 				Array.from({ length: 20 }).map(() => (
	// 					<div class={"bg-background-3 rounded-lg h-[250px] animate-pulse"}></div>
	// 				))
	// 			}
	// 		</div>
	// 	)


	// if (error)
	// 	return (
	// 		<div class={"text-center w-full mt-2 font-semibold text-sm"}>
	// 			Ha ocurrido un error tremendo {":("}
	// 		</div>
	// 	)



	// return (
	// 	<div class="text-white">



			{/* <h1 class={"text-white font-semibold text-2xl mb-2"}>Principal</h1>
			<div class={"grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5"}>

		
				{
					data.articles.filter(a => a.type === "Media").map((article) => (
						<VideoCard article={article} />
					))
				}

			</div> */}

	// 	</div>
	// );
}

