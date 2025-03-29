import './shims';

/**
 * Class decorator factory that defines the decorated class as a custom element.
 * This decorator does not throw if already defined.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */
export function customElement(tagName: string) {
	return (classOrDescriptor: Constructor<HTMLElement>) => legacyCustomElement(tagName, classOrDescriptor);
}

export type Constructor<T> = {
	// tslint:disable-next-line:no-any
	new (...args: any[]): T;
};

const legacyCustomElement = (tag: string, constructor: Constructor<HTMLElement>) => {
	if (!(customElements as CustomElementRegistry).get(tag)) {
		(customElements as CustomElementRegistry).define(tag, constructor);
	}
	// Cast as any because TS doesn't recognize the return type as being a
	// subtype of the decorated class when constructor is typed as
	// `Constructor<HTMLElement>` for some reason.
	// `Constructor<HTMLElement>` is helpful to make sure the decorator is
	// applied to elements however.
	// tslint:disable-next-line:no-any
	return constructor as any;
};

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry) */
interface CustomElementRegistry {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/define) */
	define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/get) */
	get(name: string): CustomElementConstructor | undefined;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/getName) */
	getName(constructor: CustomElementConstructor): string | null;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/upgrade) */
	upgrade(root: Node): void;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomElementRegistry/whenDefined) */
	whenDefined(name: string): Promise<CustomElementConstructor>;
}

interface ElementDefinitionOptions {
	extends?: string;
}

declare var CustomElementRegistry: {
	prototype: CustomElementRegistry;
	new (): CustomElementRegistry;
};

type HTMLElement = object;
type Node = object;

interface CustomElementConstructor {
	new (...params: any[]): HTMLElement;
}

/**
 * Defines a new custom element, mapping the given name to the given constructor as an autonomous custom element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/customElements)
 */
declare var customElements: CustomElementRegistry;
