import { Server } from 'http';
import * as socketIo from 'socket.io';

class SocketHandler {
	private io: socketIo.Server | undefined;

	init(app: Server) {
		this.io = socketIo(app);
	}

	on(event: string, callback: any) {
		this.io && this.io.on(event, callback);
	}

	emit(event: string, data: any) {
		this.io && this.io.emit(event, data);
	}

	update(type: string, name?: string) {
		this.io && this.io.emit('update', { type, name, status: 'OK' });
	}

	redirect(path: string) {
		this.io && this.io.emit('redirect', path);
	}

	clientLoaded(callback: (path: string) => void) {
		this.io &&
			this.io.on('connection', (socket) => {
				socket.on('client-loaded', callback);
			});
	}
}

export const socket = new SocketHandler();
