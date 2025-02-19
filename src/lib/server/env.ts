type EnvKind = 'dev' | 'ci' | 'prod';

export function isRunningIn(env: EnvKind): boolean {
	const nodeEnv = process.env.NODE_ENV;

	if (env === 'dev') {
		return nodeEnv === 'development';
	}

	if (env === 'ci') {
		return nodeEnv === 'ci';
	}

	return nodeEnv === 'production';
}
