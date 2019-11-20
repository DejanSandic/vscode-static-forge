import { forgeTree } from './forgeTree';
import * as actions from './actions';

// Import types
import { ExtensionContext, window } from 'vscode';

export function activate(context: ExtensionContext) {
	// Set the tree views
	forgeTree.render();

	// Register all events
	Object.values(actions).forEach((action) => context.subscriptions.push(action));
}

// this method is called when your extension is deactivated
export function deactivate() {}
