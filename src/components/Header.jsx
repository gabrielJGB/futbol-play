import { useLocation } from 'preact-iso';
import { showMenu } from '../utils/signals';

export function Header() {
	const { url } = useLocation();

	return (
		<header class={"z-50 fixed top-0  w-full shadow-lg shadow-black/10 bg-background h-[7vh] flex flex-row items-center "}>
			<nav>
				
				<button
					class={"cursor-pointer text-2xl  pl-5 pr-1 py-1  text-white active:text-red-600 hover:text-red-300 "}
					onClick={() => { showMenu.value = !showMenu.value }}
				>☰</button>

				<a href="/" class={'text-red-100 ml-1 hover:text-gray-300 font-semibold text-lg px-2'}>
					<span class={"text-[#ff2222]"}>FutbolPlay</span>
				</a>

			</nav>
		</header>
	);
}
