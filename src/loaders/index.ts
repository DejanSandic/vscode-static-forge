import { head } from './head';
import { script } from './script';
import { favicon } from './favicon';

function startAll() {
	head.startWatching();
	script.startWatching();
	favicon.startWatching();
}

export { head, script, favicon, startAll };
