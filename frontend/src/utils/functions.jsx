export const getPagination = (length, limit, edit, save) => {
	let items = [];
	let x = Math.ceil(length / limit);

	for (let i = 0; i < x; i++) {
		items.push(<li key={i} className="page-item"><button onClick={() => edit(i * limit)} className="page-link">{i + 1}</button></li>)
	}

	save(items);
}