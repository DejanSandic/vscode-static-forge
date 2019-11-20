import { Server } from 'http';
import * as socketIo from 'socket.io';

class SocketHandler {
	private io: socketIo.Server | undefined;

	init(app: Server) {
		this.io = socketIo(app);
	}

	emit(event: string, data: any) {
		this.io && this.io.emit(event, data);
	}

	update(type: string, name: string) {
		this.io && this.io.emit('update', { type, name, status: 'OK' });
	}
}

export const socket = new SocketHandler();
