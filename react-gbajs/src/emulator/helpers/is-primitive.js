const isPrimitive = (val) => {
	if (val === null) {
		return true;
	}

	const t = typeof val;

	return (
		t === 'number' || t === 'string' || t === 'boolean' || t === 'undefined'
	);
}

export default isPrimitive;
