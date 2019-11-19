import { join } from 'path';
import { Watcher, paths } from '../helpers';

const faviconPath = join(paths.assets, 'favicon.ico');

export const favicon = new Watcher(faviconPath, '', function(context, _, path) {
	const data = context.readFile(path);
	context.content = data;
});
