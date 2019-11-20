import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

export function loadHelper(name: string) {
	const fullPath = join(__dirname, '../../assets/client-helpers', name);
	console.log(fullPath);
	const exists = existsSync(fullPath);

	if (!exists) return '';
	else return readFileSync(fullPath, 'utf8');
}
