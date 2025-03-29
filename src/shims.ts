import { HTMLElement, Element, CustomElementRegistry } from '@lit-labs/ssr-dom-shim';

function main() {
	if (!Object.hasOwn(globalThis, 'window')) {
		Object.assign(globalThis, shims());
	}
}
main();

function shims() {
	class ShadowRoot {}
	class Document {
		get adoptedStyleSheets() {
			return [];
		}
		createTreeWalker() {
			return {};
		}
		createTextNode() {
			return {};
		}
		createElement() {
			return {};
		}
	}
	class CSSStyleSheet {
		replace() {}
	}
	return {
		Element,
		HTMLElement,
		Document,
		document: new Document(),
		CSSStyleSheet,
		ShadowRoot,
		CustomElementRegistry,
		customElements: new CustomElementRegistry(),
		MutationObserver: class {
			observe() {}
		},
		requestAnimationFrame() {},
		window: {},
	};
}
