import { join } from 'path';
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
		return join(this.path, '/assets');
	}

	get components() {
		return join(this.path, '/components');
	}

	get pages() {
		return join(this.path, '/pages');
	}

	get sass() {
		return join(this.path, '/sass');
	}

	get css() {
		return join(this.path, '/assets/css');
	}

	get head() {
		return join(this.path, '/head.html');
	}

	get script() {
		return join(this.path, '/script.html');
	}
}

export const paths = new Paths();
