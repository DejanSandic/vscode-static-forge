import * as vscode from 'vscode';
import { workspace, window } from 'vscode';

export async function openEditor(name: string, text: string) {
	try {
		const document = await workspace.openTextDocument({ language: 'html' });
		const editor = await window.showTextDocument(document, 1, false);

		editor.edit((content) => {
			const position = new vscode.Position(0, 0);
			content.insert(position, text);
		});
	} catch (err) {
		window.showErrorMessage('Error while opening', name, ':\n' + err);
	}
}
