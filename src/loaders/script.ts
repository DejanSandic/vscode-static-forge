import { Watcher, paths, socket } from '../helpers';

export const script = new Watcher(paths.script, '', function(context, _, path) {
	const data = context.readFile(path);
	context.content = data;
	socket.update('script');
});
