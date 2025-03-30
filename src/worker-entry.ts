import './shims';
import { render } from '@lit-labs/ssr';
import { html } from 'lit';

import './app-root';

type Env = {
	ASSETS: Fetcher;
};

export default {
	async fetch(request: Request, env: Env) {
		const { pathname } = new URL(request.url);
		if (pathname === '/') {
			const ssrResult = render(html`
				<!DOCTYPE html>
				<html>
					<head>
						<title>Lit SSR Example</title>
						<script type="module" src="/client.js"></script>
					</head>
					<body>
						<app-root></app-root>
					</body>
				</html>
			`);

			const readableStream = new ReadableStream({
				start(controller) {
					const encoder = new TextEncoder();
					(async () => {
						for await (const chunk of ssrResult) {
							//@ts-expect-error
							controller.enqueue(encoder.encode(chunk));
						}
						controller.close();
					})();
				},
			});

			return new Response(readableStream, {
				headers: {
					'Content-Type': 'text/html',
				},
			});
		}

		return env.ASSETS.fetch(request);
	},
};
