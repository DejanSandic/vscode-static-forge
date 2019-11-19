import { TreeDataProvider, ProviderResult, TreeItem } from 'vscode';
import {
	Item,
	pagesItem,
	componentsItem,
	pageComponentsItem,
	generatePage,
	generateComponent,
	generatePageComponent
} from './utils';

class ForgeTree implements TreeDataProvider<Item> {
	data: Item[];

	pagesItem: Item;
	componentsItem: Item;

	pageComponentsItem: Item;
	pageComponents: boolean;

	constructor() {
		this.data = [];

		this.pagesItem = pagesItem;
		this.componentsItem = componentsItem;

		this.pageComponentsItem = pageComponentsItem;
		this.pageComponents = true;

		this.updatePages([ '/index', '/contact' ]);
		this.updateComponents([ 'my-header', 'my-footer' ]);
		this.updatePageComponents([ 'my-navbar', 'my-sidebar' ]);
		this.renderTree();
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
		this.pagesItem.children = items.map(generatePage);
	}
	updatePageComponents(items: any[]) {
		this.pageComponentsItem.children = items.map(generatePageComponent);
	}
	updateComponents(items: any[]) {
		this.componentsItem.children = items.map(generateComponent);
	}

	renderTree() {
		const { pagesItem, componentsItem, pageComponentsItem, pageComponents } = this;

		if (pageComponents) {
			this.data = [ pagesItem, pageComponentsItem, componentsItem ];
		} else {
			this.data = [ pagesItem, componentsItem ];
		}
	}
}

export const forgeTree = new ForgeTree();
