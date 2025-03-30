// vite.config.ts
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
	plugins: [cloudflare()],
	build: {
		rollupOptions: {
			input: {
				client: resolve(__dirname, 'src/client-entry.ts'), // Client-side entry point
			},
			output: {
				entryFileNames: `client.js`, // Output file name
				chunkFileNames: `[name].js`, // Output file name for chunks
				assetFileNames: `[name].[ext]`, // Output file name for assets
				format: 'es', // Use ES module format
			},
		},
		outDir: 'dist/client', // Output directory
		minify: 'terser', // Use terser for minification
		cssCodeSplit: false, // Disable CSS code splitting
	},
});
