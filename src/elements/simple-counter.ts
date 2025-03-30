import { LitElement, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../decorators';

declare global {
	interface HTMLElementTagNameMap {
		'simple-counter': SimpleCounterElement;
	}
}

@customElement('simple-counter')
export class SimpleCounterElement extends LitElement {
	@property({ type: Number }) value = 0;

	protected render(): TemplateResult {
		return html`<button @click=${this.#h_click}>${this.value}</button>`;
	}

	#h_click() {
		this.value += 2;
	}
}
