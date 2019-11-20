import { head, script, pages, components } from '../loaders';
import { page404 } from './404';
import { loadHelper } from './loadHelper';

// Load helpers
const hide = loadHelper('hide.js');
const tilde = loadHelper('tilde.js');
const socket = loadHelper('socket.js');
const polyfil = loadHelper('polyfil.js');
const navigation = loadHelper('navigation.html');
const loadNavigation = loadHelper('loadNavigation.js');
const loadComponents = loadHelper('loadComponents.js');

export function createIndex(path: string) {
	const page = pages.content[path] || page404;
	const links = Object.keys(pages.content);

	return `
      <html>
         ${head.content}
         <body>
            ${page}
            <script class="rbsk" src="/socket.io/socket.io.js"></script>
            <script class="rbsk">${polyfil}</script>
            <script class="rbsk">
            const socket = io();
            ${socket}
            const pages = ${JSON.stringify(links)};
            const registeredComponents = {};

            (function init() {
               const componentsMap = ${JSON.stringify(components.content)};
               const components = Object.entries(componentsMap);

               ${loadComponents}
            })();
            
            ${loadNavigation}
            ${tilde}
            ${hide}
            </script>
            ${navigation}
            ${script.content}
         </body>
      </html>
   `;
}
