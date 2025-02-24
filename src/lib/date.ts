const unitsMS = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000
} as Record<Intl.RelativeTimeFormatUnit, number>;

const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

// see: https://stackoverflow.com/a/53800501
export function relativeTime(a: Date, b = new Date()): string {
	const elapsed = a.getTime() - b.getTime();
	const units = Object.keys(unitsMS) as Intl.RelativeTimeFormatUnit[];

	for (const unit of units) {
		const msOffset = unitsMS[unit];
		if (Math.abs(elapsed) > msOffset || unit === 'second') {
			return relativeTimeFormat.format(Math.round(elapsed / msOffset), unit);
		}
	}

	return '';
}
