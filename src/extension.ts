import { forgeTree } from './tree';
import * as actions from './actions';

// Import types
import { ExtensionContext, commands, workspace } from 'vscode';

export function activate(context: ExtensionContext) {
	// Check is the workspace opened in the editor
	const workspaceOpened = workspace.workspaceFolders && workspace.workspaceFolders.length;

	if (workspaceOpened) {
		commands.executeCommand('setContext', 'workspaceOpened', true);

		// Render the tree
		forgeTree.render();

		// Register all events
		Object.values(actions).forEach((action) => context.subscriptions.push(action));
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
