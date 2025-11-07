import { useLocation } from 'preact-iso';
import { showMenu } from '../utils/signals';

export function Header() {
	const { url } = useLocation();

	return (
		<header class={"z-50 fixed top-0 bg-background w-full h-[7vh] flex flex-row items-center "}>
			<nav>
				<button class={"cursor-pointer text-2xl text-white hover:text-red-300 p-1"} onClick={()=>{showMenu.value = !showMenu.value}}>☰</button>
				<a href="/" class={'text-red-100  hover:text-gray-300 font-semibold text-lg px-2'}>
					<span class={"text-[#ff2222]"}>FutbolPlay</span>
				</a>
			</nav>
		</header>
	);
}
