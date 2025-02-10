import { describe, it, expect, test } from 'vitest';
import { join } from 'node:path';
import { resolveCompilerBinaryPathOrThrow } from './index';

type PlatformArchTuple = [NodeJS.Platform, NodeJS.Architecture];

describe('resolveCompilerBinaryPathOrThrow', () => {
	test.each([
		['darwin', 'arm64'],
		['darwin', 'x64'],
		['linux', 'arm64'],
		['linux', 'x64'],
		['win32', 'x64']
	] as PlatformArchTuple[])(
		`should resolve path to correct binary: %s %s`,
		(platform: NodeJS.Platform, arch: NodeJS.Architecture) => {
			// arrange
			const expected = join(process.cwd(), 'bin', platform, `monkeyc_${arch}.so`);
			defineProcessArch(arch);
			defineProcessPlatform(platform);

			// act
			const path = resolveCompilerBinaryPathOrThrow();

			// assert
			expect(path).toBe(expected);
		}
	);

	it('should throw for unsupported architecture', () => {
		// arrange
		defineProcessArch('riscv64');
		defineProcessPlatform('win32');

		// act & assert
		expect(resolveCompilerBinaryPathOrThrow).toThrowError();
	});

	it('should throw for unsupported platform', () => {
		// arrange
		defineProcessArch('arm64');
		defineProcessPlatform('freebsd');

		// act & assert
		expect(resolveCompilerBinaryPathOrThrow).toThrowError();
	});

	it('should throw for win32 arm64', () => {
		// arrange
		defineProcessArch('arm64');
		defineProcessPlatform('win32');

		// act & assert
		expect(resolveCompilerBinaryPathOrThrow).toThrowError();
	});
});

function defineProcessPlatform(platform: NodeJS.Platform) {
	Object.defineProperty(process, 'platform', {
		value: platform
	});
}

function defineProcessArch(arch: NodeJS.Architecture) {
	Object.defineProperty(process, 'arch', {
		value: arch
	});
}
