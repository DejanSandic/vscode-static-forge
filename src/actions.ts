import { commands, window } from 'vscode';

/**
 * VIEW TITLE
 */
export const start = commands.registerCommand('forge.start', () => {
	window.showInformationMessage('Static forge started');
	commands.executeCommand('setContext', 'running', true);
});
export const restart = commands.registerCommand('forge.restart', () => {
	window.showInformationMessage('Static forge restarted');
});
export const stop = commands.registerCommand('forge.stop', () => {
	window.showInformationMessage('Static forge stopped');
	commands.executeCommand('setContext', 'running', false);
});
export const browser = commands.registerCommand('forge.browser', () => {
	window.showInformationMessage('Opening browser');
});

/**
 * VIEW TITLE
 */
export const selectPage = commands.registerCommand('forge.selectPage', (s) => {
	console.log({ s });
	window.showInformationMessage('Page selected');
});
