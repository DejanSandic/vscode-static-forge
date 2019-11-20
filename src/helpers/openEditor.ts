import { workspace, window } from 'vscode';

export async function openEditor(name: string, text: string) {
	try {
		const document = await workspace.openTextDocument({ language: 'html', content: text });
		await window.showTextDocument(document, 1, false);
	} catch (err) {
		window.showErrorMessage('Error while opening', name, ':\n' + err);
	}
}
