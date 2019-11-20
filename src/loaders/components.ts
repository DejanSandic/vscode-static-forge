import { relative } from 'path';
import { Watcher, paths, extension, socket } from '../helpers';
import { forgeTree } from '../tree';

function formatComponentName(componentPath: string) {
	const name = relative(paths.components, componentPath);
	return name.replace(/\\/g, '-').replace('.html', '');
}
export const components = new Watcher(paths.components, {}, function(context, event, path) {
	// Only track html files
	if (!extension(path, '.html')) return;

	const components = { ...context.content };
	const name = formatComponentName(path);
	const changed = event === 'add' || event === 'change';

	if (changed) components[name] = context.readFile(path);
	else if (event === 'unlink') delete components[name];

	context.content = components;
	socket.update('component', name);

	const treeItems = Object.keys(components);
	forgeTree.updateComponents(treeItems);
});
