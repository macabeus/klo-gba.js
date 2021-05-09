import isPrimitive from './is-primitive';

const getPrimitiveProperties = (obj) =>
	Object
		.keys(obj)
		.reduce((building, prop) => {
			const value = obj[prop];

			if (isPrimitive(value)) {
				building[prop] = value;
			}

			return building;
		}, {});

export default getPrimitiveProperties;
