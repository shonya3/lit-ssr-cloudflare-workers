import { render } from '@lit-labs/ssr';
import { html } from 'lit';
import './shims';

import './app-root';

export default {
	async fetch() {
		const ssrResult = render(html`
			<!DOCTYPE html>
			<html>
				<head>
					<title>Lit SSR Example</title>
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
	},
};
