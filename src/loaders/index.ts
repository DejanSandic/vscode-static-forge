import { head } from './head';
import { script } from './script';
import { favicon } from './favicon';
import { pages } from './pages';
import { components } from './components';
import { sass } from './sass';

function startAll() {
	head.startWatching();
	script.startWatching();
	favicon.startWatching();
	pages.startWatching();
	components.startWatching();
	sass.startWatching();
}

export { head, script, favicon, pages, components, sass, startAll };
