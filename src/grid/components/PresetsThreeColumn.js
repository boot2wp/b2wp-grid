import { __ } from '@wordpress/i18n';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	ThreeColumnFeaturedIcon,
	ThreeColumnMagazineIcon,
	ThreeColumnEqualIcon,
} from './Icons.js';
import { setGridAttributes } from './helpers.js';

export const PresetsThreeColumn = ( { setAttributes } ) => {
	const [ presets, setPresets ] = useState( undefined );

	function onChangePresets( value ) {
		let newGridAttributes = {};
		switch ( value ) {
			case 'featured':
				newGridAttributes = {
					templateAreas: `'a a a'
'b b c'
'd d e'`,
					numberNamedAreas: 3,
				};
				break;
			case 'magazine':
				newGridAttributes = {
					templateAreas: `'a a b'
'a a c'
'd e f'`,
					numberNamedAreas: 6,
				};
				break;
			case 'equal':
				newGridAttributes = {
					templateColumns: '1fr 1fr 1fr',
				};
				break;
			default:
				return;
		}
		setGridAttributes( setAttributes, newGridAttributes );
		setPresets( value );
	}

	return (
		<>
			<ToggleGroupControl
				label={ __( '3 columns', 'b2wp-grid' ) }
				isAdaptiveWidth={ true }
				value=""
				isDeselectable={ true }
				onChange={ ( value ) => onChangePresets( value ) }
				isBlock
			>
				<ToggleGroupControlOptionIcon
					value="featured"
					icon={ ThreeColumnFeaturedIcon }
					label={ __( 'featured', 'b2wp-grid' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="magazine"
					icon={ ThreeColumnMagazineIcon }
					label={ __( 'magazine', 'b2wp-grid' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="equal"
					icon={ ThreeColumnEqualIcon }
					label={ __( 'equal', 'b2wp-grid' ) }
				/>
			</ToggleGroupControl>
			<>
				{ presets === 'featured' && (
					<p>
						{ __( 'Featured-block layout selected', 'b2wp-grid' ) }
					</p>
				) }
				{ presets === 'magazine' && (
					<p>{ __( 'Magazine layout selected', 'b2wp-grid' ) }</p>
				) }
				{ presets === 'equal' && (
					<p>
						{ __( 'Equal-columns layout selected', 'b2wp-grid' ) }
					</p>
				) }
				{ presets === undefined && (
					<p>{ __( 'Select a grid layout', 'b2wp-grid' ) }</p>
				) }
			</>
		</>
	);
};
