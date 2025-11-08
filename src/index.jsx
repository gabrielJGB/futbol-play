import { LocationProvider, Router, Route, hydrate, prerender as ssr, useLocation } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import Menu from './components/Menu.jsx';
import Article from './pages/Article/index.jsx';
import VideoPage from './pages/Video/index.jsx';
import { useEffect } from 'preact/hooks';
import { showMenu } from './utils/signals.js';
import DateGames from './pages/DateGames/index.jsx';
import TeamPage from './pages/Team/index.jsx';
import GamePage from '@/pages/Game/index.jsx';


// const Redirect = () => {
// 	const { route } = useLocation()

// 	useEffect(() => {

// 		route(`/a`, true);
// 	}, []);

// 	return null;
// };

export function App() {
	return (
		<LocationProvider>
			<Header />
			
			<main class="bg-[url('/bg.png')] min-h-screen relative z-40 flex flex-row ">

				<Menu />

				<div class={`${showMenu.value?"md:ml-[230px]":"md:ml-0"}  ml-0 mt-[7vh] p-1 md:p-5 w-full `}>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/:category" component={Home} />
						<Route path="/date/:date" component={DateGames} />
						<Route path="/article/:id" component={Article} />
						<Route path="/team/:id" component={TeamPage} />
						<Route path="/game/:id" component={GamePage} />
						<Route path="/video/:id" component={VideoPage} />
						<Route default component={NotFound} />
					</Router>
				</div>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}



