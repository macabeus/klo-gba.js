const restorePrimitiveProperties = (obj, primitives) => {
	Object.keys(primitives).forEach((prop) => {
		obj[prop] = primitives[prop];
	});
}

export default restorePrimitiveProperties;
