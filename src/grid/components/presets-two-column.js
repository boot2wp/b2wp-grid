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
	TwoColumnFeaturedIcon,
	TwoColumnMagazineIcon,
	TwoColumnSidebarIcon,
	TwoColumnEqualIcon,
} from './icons';
import {
	setGridAttributes,
	oneColumnOnMobileCSS,
	oneColumnNoAreasOnMobileCSS,
} from './utils';

export const PresetsTwoColumn = ( { setAttributes } ) => {
	const [ presets, setPresets ] = useState( undefined );

	function onChangePresets( value ) {
		let newGridAttributes = {};
		switch ( value ) {
			case 'featured-block':
				newGridAttributes = {
					templateAreas: `'a a'
'b c'`,
					numberNamedAreas: 3,
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'magazine':
				newGridAttributes = {
					templateAreas: `'a b'
'a c'`,
					numberNamedAreas: 3,
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'sidebar':
				newGridAttributes = {
					templateAreas: `
'a b'
'c d'
'e f'
`,
					numberNamedAreas: 6,
					templateColumns: '1fr 200px',
					customCSS: oneColumnNoAreasOnMobileCSS(),
				};
				break;
			case 'equal':
				newGridAttributes = {
					templateColumns: '1fr 1fr',
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
				label={ __( '2 Columns' ) }
				isAdaptiveWidth={ true }
				value=""
				isDeselectable={ true }
				onChange={ ( value ) => onChangePresets( value ) }
				isBlock
			>
				<ToggleGroupControlOptionIcon
					value="featured-block"
					icon={ TwoColumnFeaturedIcon }
					label={ __( 'featured-block' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="magazine"
					icon={ TwoColumnMagazineIcon }
					label={ __( 'magazine' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="sidebar"
					icon={ TwoColumnSidebarIcon }
					label={ __( 'sidebar' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="equal"
					icon={ TwoColumnEqualIcon }
					label={ __( 'equal-columns' ) }
				/>
			</ToggleGroupControl>
			<>
				{ presets === 'featured-block' && (
					<p>{ __( 'Featured-block layout selected' ) }</p>
				) }
				{ presets === 'magazine' && (
					<p>{ __( 'Magazine layout selected' ) }</p>
				) }
				{ presets === 'sidebar' && (
					<p>{ __( 'Sidebar layout selected' ) }</p>
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
