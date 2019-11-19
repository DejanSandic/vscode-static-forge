import { existsSync, readFileSync } from 'fs';
import { watch, FSWatcher } from 'chokidar';

type callback = (context: Watcher, event: string, path: string) => void;

export class Watcher {
	private path: string;
	private callback: callback;

	private watcher: FSWatcher | undefined;
	private _data: any;

	constructor(path: string, callback: (...args: any) => any) {
		this.path = path;
		this.callback = callback;
	}

	readFile(path: string, def: any) {
		const exists = existsSync(path);
		if (exists) return readFileSync(path, 'utf8');
		else return '';
	}

	startWatching() {
		const self = this;
		this.watcher && this.watcher.close();
		this.watcher = watch(this.path).on('all', (event, path) => {
			// Wait 100ms for text editor to release the file
			// this is the common bug with VS code
			setTimeout(() => {
				this.callback && this.callback(self, event, path);
			}, 100);
		});
	}

	set content(data: any) {
		this._data = data;
	}

	get content() {
		return this._data;
	}
}
