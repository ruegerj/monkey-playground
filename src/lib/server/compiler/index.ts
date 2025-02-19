import { join } from 'node:path';
import koffi from 'koffi';
import { building } from '$app/environment';

const VALID_PLATFORMS: NodeJS.Platform[] = ['win32', 'darwin', 'linux'];
const VALID_ARCHITECTURES: NodeJS.Architecture[] = ['arm64', 'x64'];
const PLATFORM_EXTENSION_LOOKUP: Partial<Record<NodeJS.Platform, string>> = {
	darwin: 'dylib',
	linux: 'so',
	win32: 'dll'
};

let compilerLib: koffi.IKoffiLib;

if (!building) {
	const compilerLibPath = resolveCompilerBinaryPathOrThrow();
	compilerLib = koffi.load(compilerLibPath);
}

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

	if (arch === 'arm64' && platform != 'darwin') {
		throw new Error(
			'Unsupported platform architecture combination: only darwin is currently supported for arm64'
		);
	}

	const pathFragments = [
		process.cwd(),
		'bin',
		platform,
		`monkeyc_${arch}.${PLATFORM_EXTENSION_LOOKUP[platform]}`
	];

	return join(...pathFragments);
}
