import { join } from 'path';
import * as uuid from 'uuid';
import { html as beautify } from 'js-beautify';
import { window, TreeDataProvider, ProviderResult, TreeItem } from 'vscode';

// Icon loader
const loadIcon = (icon: string): string => join(__dirname, '../assets/icons/', icon);

// Icons
const pagesIcon = loadIcon('pages.svg');
const pageIcon = loadIcon('page.svg');
const pageActiveIcon = loadIcon('page-active.svg');
const componentsIcon = loadIcon('components.svg');
const componentIcon = loadIcon('component.svg');

// Comments
const originalContent = '<!-- @forge: Original content  -->';
const renderedContent = '<!-- @forge: Rendered content  -->';

interface Item extends TreeItem {
	children: Item[] | undefined;
}

interface Components {
	[key: string]: string;
}

interface RegisteredComponents {
	[key: string]: Array<{
		html: string;
		content: string;
	}>;
}

interface PageComponent {
	label: string;
	html: string;
	content: string;
}

class ForgeTree implements TreeDataProvider<Item> {
	data: Item[];
	activePage: string;

	constructor() {
		this.activePage = '';
		this.data = [
			{
				id: 'forgePages',
				label: 'Navigation',
				iconPath: pagesIcon,
				collapsibleState: 2,
				children: []
			},
			{
				id: 'forgePageComponents',
				label: 'Components',
				iconPath: componentsIcon,
				collapsibleState: 2,
				children: []
			},
			{
				id: 'forgeComponents',
				label: 'All components',
				iconPath: componentsIcon,
				collapsibleState: 2,
				children: []
			}
		];
	}

	getTreeItem(element: Item): TreeItem {
		return element;
	}

	getChildren(element?: Item | undefined): ProviderResult<Item[]> {
		if (element === undefined) {
			return this.data;
		}
		return element.children;
	}

	updatePages(items: any[]) {
		const pagesItem = this.data[0];

		pagesItem.children = items.map((label) => ({
			id: uuid(),
			label: label === '/' ? '/index' : label,
			iconPath: pageIcon,
			tooltip: 'Open this page in the browser',
			command: {
				command: 'forge.selectPage',
				title: '',
				arguments: [ label ]
			},
			children: []
		}));
	}

	updatePageComponents(registeredComponents: RegisteredComponents) {
		const pageComponentsItem = this.data[1];
		const components: PageComponent[] = [];

		for (let name in registeredComponents) {
			const items = registeredComponents[name];

			items.forEach(({ content, html }, index) => {
				const label = index ? `${name} ${index + 1}` : name;
				components.push({ label, content, html });
			});
		}

		pageComponentsItem.children = components.map(({ label, content, html }) => {
			html = `${renderedContent}\n\n${beautify(html)}\n\n${originalContent}\n\n${content}`;

			return {
				id: uuid(),
				label,
				iconPath: componentIcon,
				tooltip: 'View code of this component',
				command: {
					command: 'forge.selectComponent',
					title: '',
					arguments: [ label, html ]
				},
				children: []
			};
		});
	}

	updateComponents(items: Components) {
		const components = Object.entries(items);
		const componentsItem = this.data[2];

		componentsItem.children = components.map(([ label, html ]) => {
			html = `${originalContent}\n\n${html}`;

			return {
				id: uuid(),
				label,
				iconPath: componentIcon,
				tooltip: 'View code of this component',
				command: {
					command: 'forge.selectComponent',
					title: '',
					arguments: [ label, html ]
				},
				children: []
			};
		});
		this.render();
	}

	updateActivePage(path: string) {
		this.activePage = path === '/' ? '/index' : path;
		const pagesItem = this.data[0];

		pagesItem.children &&
			pagesItem.children.forEach((page) => {
				if (page.label === this.activePage) {
					page.iconPath = pageActiveIcon;
				} else {
					page.iconPath = pageIcon;
				}
			});
	}

	render() {
		window.registerTreeDataProvider('forgeTree', this);
	}
}

export const forgeTree = new ForgeTree();
