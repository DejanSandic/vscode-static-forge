import { workspace } from 'vscode';

class Paths {
	path: string;

	constructor() {
		this.path = '';
		this.reSetPath();
	}

	reSetPath() {
		const [ path ] = workspace.workspaceFolders || [];
		this.path = path ? path.uri.fsPath : '';
	}

	get root() {
		return this.path;
	}

	get assets() {
		return this.path + '/assets';
	}

	get components() {
		return this.path + '/components';
	}

	get pages() {
		return this.path + '/pages';
	}

	get sass() {
		return this.path + '/sass';
	}

	get css() {
		return this.path + '/assets/css';
	}

	get head() {
		return this.path + '/head.html';
	}

	get script() {
		return this.path + '/script.html';
	}
}

export const paths = new Paths();
