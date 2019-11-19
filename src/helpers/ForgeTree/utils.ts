import { join } from 'path';
import * as uuid from 'uuid';
import { TreeItem } from 'vscode';

// Icon loader
const loadIcon = (icon: string): string => join(__dirname, '../../../assets/icons/', icon);

// Icons
const pagesIcon = loadIcon('pages.svg');
const pageIcon = loadIcon('page.svg');
const componentsIcon = loadIcon('components.svg');
const componentIcon = loadIcon('component.svg');

// Types
export interface Item extends TreeItem {
	children: Item[] | undefined;
}

// Items
export const pagesItem = {
	id: 'forgePages',
	label: 'Pages',
	iconPath: pagesIcon,
	collapsibleState: 2,
	children: []
};

export const componentsItem = {
	id: 'forgeComponents',
	label: 'All components',
	iconPath: componentsIcon,
	collapsibleState: 2,
	children: []
};

export const pageComponentsItem = {
	id: 'forgePageComponents',
	label: 'Page components',
	iconPath: componentsIcon,
	collapsibleState: 2,
	children: []
};

// Functions
export function generatePage(label: string, ...args: any[]) {
	return {
		id: uuid(),
		label,
		iconPath: pageIcon,
		command: {
			command: 'forge.selectPage',
			title: 'Open this page in the browser',
			arguments: args
		},
		children: []
	};
}
export function generateComponent(label: string, ...args: any[]) {
	return {
		id: uuid(),
		label,
		iconPath: componentIcon,
		command: {
			command: 'forge.selectComponent',
			title: 'View code of this component',
			arguments: args
		},
		children: []
	};
}
export function generatePageComponent(label: string, ...args: any[]) {
	return {
		id: uuid(),
		label,
		iconPath: componentIcon,
		command: {
			command: 'forge.selectComponent',
			title: 'View code of this component',
			arguments: args
		},
		children: []
	};
}
