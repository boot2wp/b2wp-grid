/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	ThreeColumnFeaturedIcon,
	ThreeColumnMagazineIcon,
	ThreeColumnEqualIcon,
} from './icons';
import {
	setGridAttributes,
	oneColumnOnMobileCSS,
	oneColumnNoAreasOnMobileCSS,
} from './utils';

export const PresetsThreeColumn = ( { setAttributes } ) => {
	const [ presets, setPresets ] = useState( undefined );

	function onChangePresets( value ) {
		let newGridAttributes = {};
		switch ( value ) {
			case 'featured-block':
				newGridAttributes = {
					templateAreas: `'a a a'
'b b c'
'd d e'`,
					numberNamedAreas: 3,
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'magazine':
				newGridAttributes = {
					templateAreas: `'a a b'
'a a c'
'd e f'`,
					numberNamedAreas: 6,
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'equal':
				newGridAttributes = {
					templateColumns: '1fr 1fr 1fr',
					customCSS: oneColumnOnMobileCSS(),
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
				label={ __( '3 columns' ) }
				isAdaptiveWidth={ true }
				value=""
				isDeselectable={ true }
				onChange={ ( value ) => onChangePresets( value ) }
				isBlock
			>
				<ToggleGroupControlOptionIcon
					value="featured-block"
					icon={ ThreeColumnFeaturedIcon }
					label={ __( 'featured-block' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="magazine"
					icon={ ThreeColumnMagazineIcon }
					label={ __( 'magazine' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="equal"
					icon={ ThreeColumnEqualIcon }
					label={ __( 'equal' ) }
				/>
			</ToggleGroupControl>
			<>
				{ presets === 'featured-block' && (
					<p>{ __( 'Featured-block layout selected' ) }</p>
				) }
				{ presets === 'magazine' && (
					<p>{ __( 'Magazine layout selected' ) }</p>
				) }
				{ presets === 'equal' && (
					<p>{ __( 'Equal-columns layout selected' ) }</p>
				) }
				{ presets === undefined && (
					<p>{ __( 'Select a grid layout' ) }</p>
				) }
			</>
		</>
	);
};
