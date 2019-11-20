import { relative } from 'path';
import { Watcher, paths, extension, socket } from '../helpers';

function formatPageName(pagePath: string) {
	const fullName = relative(paths.pages, pagePath);
	const name = fullName.replace(/\\/g, '/').replace('.html', '');
	return name === 'index' ? '/' : `/${name}`;
}

export const pages = new Watcher(paths.pages, {}, function(context, event, path) {
	// Only track html files
	if (!extension(path, '.html')) return;

	const pages = { ...context.content };
	const name = formatPageName(path);
	const changed = event === 'add' || event === 'change';

	if (changed) pages[name] = context.readFile(path);
	else if (event === 'unlink') delete pages[name];

	context.content = pages;
	socket.update('page', name);
});
