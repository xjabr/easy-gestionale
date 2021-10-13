export const getPercByAteco = (ateco) => {
	if (ateco.substring(0, 2) == '62') return 0.67;
	return 1;
}