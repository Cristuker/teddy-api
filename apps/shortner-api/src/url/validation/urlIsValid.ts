export function isValidUrl(string: string): boolean {
	try {
		new URL(string);
		return true;
	} catch (e) {
		return false;
	}
}