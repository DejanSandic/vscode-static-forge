import { head } from './head';
import { script } from './script';
import { favicon } from './favicon';
import { pages } from './pages';
import { components } from './components';

function startAll() {
	head.startWatching();
	script.startWatching();
	favicon.startWatching();
	pages.startWatching();
	components.startWatching();
}

export { head, script, favicon, pages, components, startAll };
