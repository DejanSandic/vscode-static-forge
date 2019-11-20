import { extname } from 'path';

export function extension(path: string, wanted: string) {
	return extname(path) === wanted;
}
