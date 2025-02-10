import koffi from 'koffi';
import { join } from 'node:path';

const VALID_PLATFORMS: NodeJS.Platform[] = ['win32', 'darwin', 'linux'];
const VALID_ARCHITECTURES: NodeJS.Architecture[] = ['arm64', 'x64'];

const compilerLibPath = resolveCompilerBinaryPathOrThrow();
const compilerLib = koffi.load(compilerLibPath);

export function compileAndRun(code: string): Promise<string> {
	return new Promise((resolve) => {
		const compileFunc = compilerLib.func('char* CompileAndRun(char*)');
		const result = compileFunc(code);

		resolve(result);
	});
}

export function resolveCompilerBinaryPathOrThrow(): string {
	const platform = process.platform;
	const arch = process.arch;

	if (!VALID_PLATFORMS.includes(platform)) {
		throw new Error(
			`Unsupported platform: ${platform}, expected one of the following: ${VALID_PLATFORMS.join(', ')}`
		);
	}

	if (!VALID_ARCHITECTURES.includes(arch)) {
		throw new Error(
			`Unsupported architecture: ${platform}, expected one of the following: ${VALID_PLATFORMS.join(', ')}`
		);
	}

	if (platform === 'win32' && arch === 'arm64') {
		throw new Error(
			'Unsupported platform architecture combination: windows arm64, is currently not yet supported'
		);
	}

	const pathFragments = [process.cwd(), 'bin', platform, `monkeyc_${arch}.so`];

	return join(...pathFragments);
}
