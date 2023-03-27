export const setGridAttributes = ( setAttributes, gridAttributes ) => {
	let newGridAttributes = {
		templateColumns: 'repeat(auto-fill, minmax(min(10rem, 100%), 1fr))',
		templateRows: '',
		templateAreas: '',
		autoColumns: '',
		autoRows: '',
		autoFlow: '',
		customCSS: '.wp-grid-name-class {}',
		numberNamedAreas: 0,
	};

	newGridAttributes = { ...newGridAttributes, ...gridAttributes };
	setAttributes( { ...newGridAttributes } );
};

export const resetGridAttributes = ( setAttributes ) => {
	setGridAttributes( setAttributes, {} );
};

export const showDesignPanel = ( attributes ) => {
	return attributes.enableDesignMode;
};

// export const setGridAttributes = ( setAttributes, newGridAttributes ) => {
// 	let gridAttributes = {
// 		templateColumns: '',
// 		templateRows: '',
// 		templateAreas: '',
// 		autoColumns: '',
// 		autoRows: '',
// 		autoFlow: '',
// 		customCSS: '',
// 		numberNamedAreas: 0,
// 		rowGap: '',
// 		columnGap: '',
// 	};
// 	gridAttributes = { ...gridAttributes, ...newGridAttributes };
// 	setAttributes( gridAttributes );
// };

export const autoColumnsOnMobileCSS = () => {
	return `@media screen and (max-width: 600px) {
.wp-grid-name-class {
grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
}
}`;
};

export const oneColumnOnMobileCSS = () => {
	return `@media screen and (max-width: 600px) {
.wp-grid-name-class {
grid-template-columns: 1fr;
}
}`;
};
