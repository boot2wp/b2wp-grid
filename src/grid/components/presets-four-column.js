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
	FourColumnFeaturedIcon,
	FourColumnMagazineIcon,
	FourColumnEqualIcon,
} from './icons';
import {
	setGridAttributes,
	oneColumnOnMobileCSS,
	oneColumnNoAreasOnMobileCSS,
} from './utils';

export const PresetsFourColumn = ( { setAttributes } ) => {
	const [ presets, setPresets ] = useState( undefined );

	function onChangePresets( value ) {
		let newGridAttributes = {};
		switch ( value ) {
			case 'featured-block':
				newGridAttributes = {
					templateAreas: `'a a a a'
'a a a a'
'b c d e'`,
					numberNamedAreas: 5,
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'magazine':
				newGridAttributes = {
					templateAreas: `'a a a b'
'a a a c'
'd e f g'
`,
					numberNamedAreas: 7,
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'equal':
				newGridAttributes = {
					templateColumns: '1fr 1fr 1fr 1fr',
					customCSS: oneColumnNoAreasOnMobileCSS(),
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
				label={ __( '4 columns' ) }
				isAdaptiveWidth={ true }
				value=""
				isDeselectable={ true }
				onChange={ ( value ) => onChangePresets( value ) }
				isBlock
			>
				<ToggleGroupControlOptionIcon
					value="featured-block"
					icon={ FourColumnFeaturedIcon }
					label={ __( 'featured-block' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="magazine"
					icon={ FourColumnMagazineIcon }
					label={ __( 'magazine' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="equal"
					icon={ FourColumnEqualIcon }
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
					<p>
						{ __(
							'Equal - columns layout selected',
							'b2wp - grid'
						) }
					</p>
				) }
				{ presets === undefined && (
					<p>{ __( 'Select a grid layout' ) }</p>
				) }
			</>
		</>
	);
};
