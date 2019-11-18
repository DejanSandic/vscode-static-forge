import * as vscode from 'vscode';
import * as path from 'path';

// Import types
import { ExtensionContext, TreeDataProvider, TreeItem } from 'vscode';

export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "static-forge" is now active!');

	vscode.window.registerTreeDataProvider('forgePages', new PageTree());

	// The code you place here will be executed every time your command is executed
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
		vscode.commands.executeCommand('setContext', 'testTest', true);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class PageTree implements TreeDataProvider<TreeItem> {
	data: TreeItem[];

	constructor() {
		const iconPath = path.join(__dirname, '../assets/logo.png');

		this.data = [
			{
				id: '123',
				label: 'Test 2',
				iconPath,
				tooltip: 'Here go again',
				command: { command: 'extension.helloWorld', title: 'Say hi' },
				contextValue: 'page'
			}
		];
	}

	getTreeItem(element: TreeItem) {
		return element;
	}

	getChildren(element?: TreeItem | undefined) {
		return Promise.resolve(this.data);
	}
}
