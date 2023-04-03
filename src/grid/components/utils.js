export const setGridAttributes = ( setAttributes, gridAttributes ) => {
	let newGridAttributes = {
		templateColumns: '',
		templateRows: '',
		templateAreas: '',
		autoColumns: '',
		autoRows: '',
		autoFlow: '',
		customCSS: '',
		numberNamedAreas: 0,
	};

	newGridAttributes = { ...newGridAttributes, ...gridAttributes };
	setAttributes( { ...newGridAttributes } );
};

export const resetGridAttributes = ( setAttributes ) => {
	const defaultGridAttributes = {
		templateColumns: 'repeat(auto-fill, minmax(min(10rem, 100%), 1fr))',
	};
	setGridAttributes( setAttributes, defaultGridAttributes );
};

export const showDesignPanel = ( attributes ) => {
	return attributes.enableDesignMode;
};

export const autoColumnsOnMobileCSS = () => {
	return `@media screen and (max-width: 600px) {
  .wp-grid-name {
    grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
  }
}`;
};

export const oneColumnOnMobileCSS = () => {
	return `@media screen and (max-width: 600px) {
  .wp-grid-name {
    grid-template-columns: 1fr;
  }
}`;
};

export const oneColumnNoAreasOnMobileCSS = () => {
	return `@media screen and (max-width: 600px) {
.wp-grid-name {
	grid-template-areas: none;
	grid-template-columns: 1fr;
}
.wp-grid-name > * {
	grid-area: auto !important;
}
}`;
};
