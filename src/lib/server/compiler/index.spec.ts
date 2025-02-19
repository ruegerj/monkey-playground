import { describe, it, expect, test } from 'vitest';
import { join } from 'node:path';
import { resolveCompilerBinaryPathOrThrow } from './index';

type PlatformArchTuple = [NodeJS.Platform, NodeJS.Architecture, string];

describe('resolveCompilerBinaryPathOrThrow', () => {
	test.each([
		['darwin', 'arm64', 'dylib'],
		['darwin', 'x64', 'dylib'],
		['linux', 'x64', 'so'],
		['win32', 'x64', 'dll']
	] as PlatformArchTuple[])(
		`should resolve path to correct binary: %s %s`,
		(platform: NodeJS.Platform, arch: NodeJS.Architecture, extension: string) => {
			// arrange
			const expected = join(process.cwd(), 'bin', platform, `monkeyc_${arch}.${extension}`);
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

	test.each(['win32', 'linux'] as NodeJS.Platform[])('should throw for win32 arm64', (platform) => {
		// arrange
		defineProcessArch('arm64');
		defineProcessPlatform(platform);

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
