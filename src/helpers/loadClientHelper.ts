import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

const clientHelpers = resolve(__dirname, '../../assets/client-helpers');

export default function loadClientHelper(name: string) {
	const fullPath = join(clientHelpers, name);
	const exists = existsSync(fullPath);

	if (!exists) return '';
	else return readFileSync(fullPath, 'utf8');
}
