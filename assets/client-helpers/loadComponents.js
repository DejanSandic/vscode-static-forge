{
	components.forEach(([ name, content ]) => {
		customElements.define(
			name,
			class extends HTMLElement {
				constructor() {
					super();

					let html = content;
					const props = {};
					const modifiers = {};

					// Extract props and modifiers
					for (let attr in this.attributes) {
						const { name, value } = this.attributes[attr];

						const isModifier = [ 'if', 'repeat' ].includes(name);
						const isProp = name && name.startsWith('$');

						if (isModifier) modifiers[name] = value;
						else if (isProp) props[name] = value;
					}

					// Replace variable placeholders with props
					Object.entries(props).forEach(([ prop, value ]) => {
						html = html.replace(prop, value);
					});

					// Handle repeat functionality
					if ('repeat' in modifiers) {
						let newHtml = '';

						const times = +modifiers.repeat;
						for (let i = 1; i <= times; i++) {
							newHtml += html.replace('$index', i) + '\n';
						}

						html = newHtml;
					}

					// Handle conditional functionality
					if ('if' in modifiers) {
						const condition = eval(modifiers.if);
						if (!condition) html = '';
					}

					// Inject html into the DOM
					this.outerHTML = html;

					// Add component to the component registry
					const component = {
						el: this,
						content,
						html
					};

					if (name in registeredComponents) {
						registeredComponents[name].push(component);
					} else {
						registeredComponents[name] = [ component ];
					}
				}
			}
		);
	});
}
