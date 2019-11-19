import { forgeTree, actions } from './components';

// Import types
import { ExtensionContext, window } from 'vscode';

export function activate(context: ExtensionContext) {
	// Set the tree views
	window.registerTreeDataProvider('forgeTree', forgeTree);

	// Register all events
	Object.values(actions).forEach((action) => context.subscriptions.push(action));
}

// this method is called when your extension is deactivated
export function deactivate() {}
