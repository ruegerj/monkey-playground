import koffi from 'koffi';
import { join } from 'node:path';

export function compileAndRun(code: string): Promise<string> {
	return new Promise((resolve) => {
		const lib = koffi.load(join(process.cwd(), 'bin', 'monkeyc.so'));

		const compileFunc = lib.func('char* CompileAndRun(char*)');

		const result = compileFunc(code);

		resolve(result);
	});
}
