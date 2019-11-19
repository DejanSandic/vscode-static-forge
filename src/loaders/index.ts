import { head } from './head';
import { script } from './script';
import { favicon } from './favicon';
import { pages } from './pages';

function startAll() {
	head.startWatching();
	script.startWatching();
	favicon.startWatching();
	pages.startWatching();
}

export { head, script, favicon, pages, startAll };
