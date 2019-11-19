import * as open from 'open';
import { commands, window } from 'vscode';
import * as loaders from './loaders';
import { startServer, stopServer } from './server';
const { showInformationMessage, showErrorMessage } = window;

let port: number;

/**
 * Server actions
 */
export const start = commands.registerCommand('forge.start', async () => {
	try {
		port = await startServer();
		loaders.startAll();
		showInformationMessage('Static forge started on the port ' + port);
		commands.executeCommand('setContext', 'running', true);
	} catch (err) {
		showErrorMessage('Error while starting the forge:\n' + err);
	}
});

export const stop = commands.registerCommand('forge.stop', async () => {
	try {
		await stopServer();
		showInformationMessage('Static forge stopped');
		commands.executeCommand('setContext', 'running', false);
	} catch (err) {
		showErrorMessage('Error while stopping the forge:\n' + err);
	}
});

export const restart = commands.registerCommand('forge.restart', async () => {
	try {
		await stopServer();
		port = await startServer();
		showInformationMessage('Static forge restarted on the port ' + port);
	} catch (err) {
		showErrorMessage('Error while restarting the forge:\n' + err);
	}
});

export const browser = commands.registerCommand('forge.browser', async () => {
	await open('http://localhost:' + port);
});

/**
 * Tree actions
 */
export const selectPage = commands.registerCommand('forge.selectPage', (s) => {
	console.log({ s });
	showInformationMessage('Page selected');
});

export const selectComponent = commands.registerCommand('forge.selectComponent', (s) => {
	console.log({ s });
	showInformationMessage('Component selected');
});
