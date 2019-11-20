import { extname, basename, dirname, join } from 'path';
import { existsSync, readdirSync, writeFileSync, mkdirSync, lstatSync } from 'fs';
import { renderSync } from 'sass';
import { Watcher, paths, socket } from '../helpers';

function isDir(path: string) {
	const exists = existsSync(path);
	return exists && lstatSync(path).isDirectory();
}

function isSassFile(file: string) {
	const ext = extname(file);
	const name = basename(file, ext);
	const isPartial = name.startsWith('_');
	const isSass = [ '.sass', '.scss' ].includes(ext);

	return !isPartial && isSass;
}

function writeCss(target: string, css: string) {
	if (existsSync(target)) {
		writeFileSync(target, css);
	} else {
		const dir = dirname(target);
		mkdirSync(dir, { recursive: true });
		writeFileSync(target, css);
	}
}

function scanDirectory(source: string) {
	if (!existsSync(source)) return [];
	if (!isDir(source)) return [ source ];

	let list: string[] = [];
	const children = readdirSync(source);

	children.forEach((child) => {
		const childPath = join(source, child);

		if (isDir(childPath)) {
			const dirFiles = scanDirectory(childPath);
			list = [ ...list, ...dirFiles ];
		} else {
			list = [ ...list, childPath ];
		}
	});

	return list;
}
let i = 0;
export const sass = new Watcher(paths.sass, [], function() {
	const files = scanDirectory(paths.sass);
	const sassFiles = files.filter(isSassFile);

	sassFiles.forEach((file) => {
		const data = renderSync({ file });
		const ext = extname(file);
		const css = data.css.toString();
		const target = file.replace(paths.sass, paths.css).replace(ext, '.css');
		writeCss(target, css);
		socket.emit('update', { type: 'sass' });
	});
});
