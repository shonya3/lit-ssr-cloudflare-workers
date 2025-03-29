import { LitElement, html, TemplateResult, css } from 'lit';
import './elements/simple-counter';
import { customElement } from './decorators';

declare global {
	interface HTMLElementTagNameMap {
		'app-root': AppRoot;
	}
}

@customElement('app-root')
export class AppRoot extends LitElement {
	protected render(): TemplateResult {
		return html`<h1>Hello, World!</h1>
			${html`<h2>Lit SSR</h2>`}
			<simple-counter></simple-counter>`;
	}

	static styles = css`
		h1 {
			color: violet;
		}
	`;
}
