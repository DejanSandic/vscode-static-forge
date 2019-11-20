import { Watcher, paths, socket } from '../helpers';

export const head = new Watcher(paths.head, '', function(context, _, path) {
	const data = context.readFile(path);
	context.content = data;
	socket.update('head');
});
