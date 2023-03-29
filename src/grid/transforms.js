/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock( 'core/group', attributes, innerBlocks );
			},
		},
	],
	from: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock( 'b2wp/grid', attributes, innerBlocks );
			},
		},
	],
};

export default transforms;
