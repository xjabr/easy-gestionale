export const getPercByAteco = (ateco: string) => {
	if (ateco.substring(0, 2) == '62') return 0.67;
	if (ateco.substring(0, 2) == '74') return 0.78;
	return 1;
}