import { Server } from 'http';
import * as getPort from 'get-port';
import * as express from 'express';

// Import loaders
import { head, favicon, script, pages, components } from './loaders';

// Import helpers
import { paths, createIndex } from './helpers';
import { page404 } from './client-helpers/404';

// Create server
const app = express();
const server = new Server(app);

// Return favicon
app.get('/favicon.ico', (_, res) => {
	res.send(favicon.content);
});

// Set static assets
app.use(express.static(paths.assets));

app.get('*', (req, res) => {
	// const head = loadHead();
	// const script = loadScript();
	// const pages = loadPages();
	// const components = loadComponents();
	// const pageLinks = Object.keys(pages);

	// const pageName = req.params[0];
	// const page = pages[pageName] || page404;
	// const index = createIndex(head, page, components, pageLinks, script);

	const pageName = req.params[0];
	const index = createIndex(pageName);
	res.end(index);
});

// Track connections so they can be killed before server is closed
let connections: any[] = [];

export async function startServer() {
	const port = await getPort({ port: [ 3000, 3100, 3200, 3300 ] });
	await server.listen(port);
	server.on('connection', (connection) => connections.push(connection));
	return port;
}

export async function stopServer() {
	await server.close();
	connections.forEach((connection) => connection.destroy());
}
