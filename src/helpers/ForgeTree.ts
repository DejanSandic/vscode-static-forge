import { TreeDataProvider, ProviderResult, TreeItem, TreeItemCollapsibleState as State } from 'vscode';
import { loadIcon } from './loadIcon';

const pagesIcon = loadIcon('pages.svg');
const pageIcon = loadIcon('page.svg');
const pageActiveIcon = loadIcon('page-active.svg');
const componentsIcon = loadIcon('components.svg');
const componentIcon = loadIcon('component.svg');

interface Item extends TreeItem {
	children: Item[] | undefined;
}

export class ForgeTree implements TreeDataProvider<Item> {
	data: Item[];

	constructor() {
		this.data = [
			{
				id: 'forgePages',
				label: 'Pages',
				iconPath: pagesIcon,
				collapsibleState: 2,
				children: [
					{
						id: 'forgePages1',
						label: '/index',
						iconPath: pageActiveIcon,
						command: {
							command: 'forge.selectPage',
							title: 'Open this page in the browser',
							arguments: [ 'Hello' ]
						},
						children: []
					},
					{
						id: 'forgeComponents1',
						label: '/about/us',
						iconPath: pageIcon,
						command: {
							command: 'forge.selectPage',
							title: 'Open this page in the browser',
							arguments: [ 'Hello' ]
						},
						children: []
					}
				]
			},
			{
				id: 'forgeComponents',
				label: 'Components',
				iconPath: componentsIcon,
				collapsibleState: 2,
				children: [
					{
						id: 'forgePages2',
						label: 'my-header',
						iconPath: componentIcon,
						children: []
					},
					{
						id: 'forgeComponents2',
						label: 'my-footer',
						iconPath: componentIcon,
						children: []
					}
				]
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
}
