import { Server } from 'http';
import * as getPort from 'get-port';
import * as express from 'express';
import { window, commands } from 'vscode';

const app = express();
const server = new Server(app);

app.get('/test', (req, res) => {
	res.end('Working');
});
app.get('/test2', (req, res) => {
	res.end('Still Working');
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
