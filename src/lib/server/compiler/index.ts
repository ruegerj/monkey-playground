import { join } from 'node:path';
import koffi from 'koffi';
import { building } from '$app/environment';

export interface RunResult {
	successful: boolean;
	/**
	 * Output when successful, error message when failed
	 */
	result: string;
	/**
	 * Collected stdout of run
	 */
	std_output: string;
}

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
	defineKoffiStubs();
}

export function compileAndRun(code: string): Promise<RunResult> {
	return new Promise((resolve) => {
		const compileFunc = compilerLib.func('RunResult CompileAndRun(char*)');
		const result: RunResult = compileFunc(code);

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

function defineKoffiStubs() {
	koffi.struct('RunResult', {
		successful: 'bool',
		result: 'char*',
		std_output: 'char*'
	});
}
