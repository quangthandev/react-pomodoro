/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
	// depending on your application, base can also be "/"
	base: '',
	plugins: [
		react(),
		viteTsconfigPaths(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			outDir: path.resolve(__dirname, 'public'),
			manifest: {
				short_name: 'PomoReact',
				name: 'PomoReact',
				icons: [
					{
						src: 'icon-192.png',
						type: 'image/png',
						sizes: '192x192'
					},
					{
						src: 'icon-512.png',
						type: 'image/png',
						sizes: '512x512'
					}
				],
				start_url: '.',
				display: 'standalone',
				theme_color: '#f56d6b',
				background_color: '#ffffff',
				description: 'A simple Pomodoro Timer built with React',
				screenshots: [
					{
						src: 'screenshots/screenshot-1.png',
						type: 'image/png',
						sizes: '2006x1186',
						form_factor: 'wide'
					},
					{
						src: 'screenshots/screenshot-2.png',
						type: 'image/png',
						sizes: '1054x1184'
					}
				]
			},
			manifestFilename: 'manifest.json',

			srcDir: path.resolve(__dirname, 'src'),
			filename: 'service-worker.js',
			strategies: 'injectManifest',

			workbox: {
				globDirectory: path.resolve(__dirname, 'public'),
				globPatterns: ['{build,images,sounds,icons}/**/*.{js,css,html,ico,png,jpg,mp4,svg}']
			}
		})
	],
	server: {
		// this ensures that the browser opens upon server start
		open: true,
		// this sets a default port to 3000
		port: 3000
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts',
		css: true,
		reporters: ['verbose'],
		coverage: {
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*'],
			exclude: []
		}
	}
});
