export function capitalize(text: string) {
	const words = text.split(" ");

	const capitalized = words.map((word) => {
		if (word.length <= 2) return word;
		return `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;
	});

	return capitalized.join(" ");
}
