export const GridStyle = ( { attributes } ) => {
	let gridSelector = `.wp-block-b2wp-grid.${ attributes.gridName }`;
	if ( attributes.applyToQueryLoop ) {
		gridSelector = `.wp-block-b2wp-grid.${ attributes.gridName } > .wp-block-query > .wp-block-post-template`;
	}
	return (
		<style>
			{ `
${ gridSelector } {
    ${ gridStyleProperties( attributes ) }
}
` }
			{ overRideLayoutFlow( gridSelector, attributes ) }
			{ gridNamesRule( gridSelector, attributes, true ) }
			{ gridCustomCSS( attributes ) }
		</style>
	);
};

export const EditorGridStyle = ( { attributes, showGrid } ) => {
	let gridSelector = `.wp-block-b2wp-grid.${ attributes.gridName } > * > .block-editor-block-list__layout`;
	if ( attributes.applyToQueryLoop ) {
		gridSelector = `.wp-block-b2wp-grid.${ attributes.gridName } .wp-block-query > .wp-block-post-template`;
	}
	return (
		<style>
			{ `
${ gridSelector } {
    ${ gridStyleProperties( attributes ) }
}
` }
			{ overRideLayoutFlow( gridSelector, attributes ) }
			{ gridNamesRule( gridSelector, attributes, false ) }
			{ editorShowGrid( attributes, gridSelector, showGrid ) }
			{ editorGridCustomCSS( attributes, gridSelector ) }
		</style>
	);
};

function gridStyleProperties( attributes ) {
	return `display: grid;${ gridTemplateColumns(
		attributes
	) }${ gridTemplateRows( attributes ) }${ gridTemplateAreas(
		attributes
	) }${ gridAutoColumns( attributes ) }${ gridAutoRows(
		attributes
	) }${ gridAutoFlow( attributes ) }${ gridGap( attributes ) }`;
}

function gridTemplateColumns( attributes ) {
	const templateColumns = attributes.templateColumns.trim();
	if ( templateColumns.length !== 0 ) {
		return `
    grid-template-columns: ${ templateColumns };`;
	}
	return '';
}

function gridTemplateRows( attributes ) {
	const templateRows = attributes.templateRows.trim();
	if ( templateRows.length !== 0 ) {
		return `
    grid-template-rows: ${ templateRows };`;
	}
	return '';
}

function gridTemplateAreas( attributes ) {
	const templateAreas = attributes.templateAreas.trim();
	if ( templateAreas.length !== 0 ) {
		return `
    grid-template-areas: ${ templateAreas };`;
	}
	return '';
}

function gridAutoColumns( attributes ) {
	const autoColumns = attributes.autoColumns.trim();
	if ( autoColumns.length !== 0 ) {
		return `
    grid-auto-columns: ${ autoColumns };`;
	}
	return '';
}

function gridAutoRows( attributes ) {
	const autoRows = attributes.autoRows.trim();
	if ( autoRows.length !== 0 ) {
		return `
    grid-auto-rows: ${ autoRows };`;
	}
	return '';
}

function gridAutoFlow( attributes ) {
	const autoFlow = attributes.autoFlow.trim();
	if ( autoFlow.length !== 0 && autoFlow !== 'none' ) {
		return `
    grid-auto-flow: ${ autoFlow };`;
	}
	return '';
}

function gridGap( attributes ) {
	let gap = '';
	const gridRowGap = attributes.rowGap.trim();
	const gridColumnGap = attributes.columnGap.trim();
	if ( gridRowGap.length !== 0 ) {
		gap += `
    row-gap: ${ gridRowGap };`;
	}
	if ( gridColumnGap.length !== 0 ) {
		gap += `
    column-gap: ${ gridColumnGap };`;
	}
	return gap;
}

function gridCustomCSS( attributes ) {
	const defaultGridSelector = `.wp-block-b2wp-grid.${ attributes.gridName }`;
	let customCSS = attributes.customCSS.trim();
	if ( customCSS.length !== 0 ) {
		customCSS = customCSS.replaceAll(
			'.wp-grid-name-class',
			defaultGridSelector
		);
		return customCSS;
	}
	return '';
}

function editorGridCustomCSS( attributes, gridSelector ) {
	const defaultGridSelector = `.wp-block-b2wp-grid.${ attributes.gridName }`;
	let customCSS = attributes.customCSS.trim();
	if ( customCSS.length !== 0 ) {
		customCSS = customCSS.replaceAll( defaultGridSelector, gridSelector );
		customCSS = customCSS.replaceAll( '.wp-grid-name-class', gridSelector );
		return customCSS;
	}
	return '';
}

function overRideLayoutFlow( gridSelector, attributes ) {
	let layoutFlowOverRide = '';
	if ( attributes.applyToQueryLoop ) {
		layoutFlowOverRide = `
${ gridSelector }.is-layout-flow * {
    margin-block-start: 0 !important;
}
`;
	}
	return layoutFlowOverRide;
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

function gridNamesRule( gridSelector, attributes, skipFirstElement ) {
	let gridNames = '';
	const count = attributes.numberNamedAreas;
	let currentLetter = 0;

	for ( let i = 0; i < count; i++ ) {
		if ( skipFirstElement && i === 0 ) {
			continue;
		}

		gridNames += `
${ gridSelector } > :nth-child(${ i + 1 }) {grid-area: ${
			LETTERS[ currentLetter++ ]
		};}`;
	}
	return gridNames;
}

function editorShowGrid( attributes, gridSelector, showGrid ) {
	let showGridRules = '';

	if ( showGrid === false ) {
		return showGridRules;
	}

	showGridRules += `
${ gridSelector } > * {
    outline: dashed #32a1ce;
}
`;
	const count = attributes.numberNamedAreas;

	for ( let i = 0; i < count; i++ ) {
		showGridRules += `
    ${ gridSelector } > :nth-child(${ i + 1 })::before{
        content: "${ LETTERS[ i ] }";
        color: red;
        position: absolute;
        right: 10px;
        top: 0px;
        z-index: 100;
    }`;
	}

	return showGridRules;
}
