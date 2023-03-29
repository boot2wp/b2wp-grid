/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

import './style.scss';

import Edit from './edit';
import save from './save';
import transforms from './transforms';
import metadata from './block.json';
import icon from './icon';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	transforms,
	icon,
} );
