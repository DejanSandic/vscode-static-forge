{
	components.forEach(([ name, html ]) => {
		customElements.define(
			name,
			class extends HTMLElement {
				constructor() {
					super();

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
							newHtml += html.replace('$index', i);
						}

						html = newHtml;
					}

					// Handle conditional functionality
					if ('if' in modifiers) {
						const condition = eval(modifiers.if);
						if (!condition) html = '';
					}

					this.outerHTML = html;
					registeredComponents[name] = this;
				}
			}
		);
	});
}
