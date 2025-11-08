import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		preact({

			prerender: {
				enabled: false,
			},
		}),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				"name": "FutbolPlay",
				"short_name": "FutbolPlay",
				"start_url": "/",
				"display": "standalone",
				"background_color": "#0e0e0e",
				"theme_color": "#0e0e0e",
				"description": "Los últimos videos del mundo del futbol",
				"icons": [
					{
						"src": "48x48_icon.png",
						"sizes": "48x48",
						"type": "image/png"
					},
					{
						"src": "64x64_icon.png",
						"sizes": "64x64",
						"type": "image/png"
					},
					{
						"src": "128x128_icon.png",
						"sizes": "128x128",
						"type": "image/png"
					},
					{
						"src": "256x256_icon.png",
						"sizes": "256x256",
						"type": "image/png"
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
