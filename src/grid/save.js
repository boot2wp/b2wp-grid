import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { GridStyle } from './components/GridStyle.js';

export default function save( { attributes } ) {
	return (
		<div
			{ ...useBlockProps.save( {
				className: `${ attributes.gridName }`,
			} ) }
		>
			<GridStyle attributes={ attributes } />
			<InnerBlocks.Content />
		</div>
	);
}
