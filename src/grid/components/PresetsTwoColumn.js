import { __ } from '@wordpress/i18n';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	TwoColumnFeaturedIcon,
	TwoColumnMagazineIcon,
	TwoColumnSidebarIcon,
	TwoColumnEqualIcon,
} from './Icons';
import { setGridAttributes } from './utils';

export const PresetsTwoColumn = ( { setAttributes } ) => {
	const [ presets, setPresets ] = useState( undefined );

	function onChangePresets( value ) {
		let newGridAttributes = {};
		switch ( value ) {
			case 'featured':
				newGridAttributes = {
					templateAreas: `'a a'
'b c'`,
					numberNamedAreas: 3,
				};
				break;
			case 'magazine':
				newGridAttributes = {
					templateAreas: `'a b'
'a c'`,
					numberNamedAreas: 3,
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
				};
				break;
			case 'equal':
				newGridAttributes = {
					templateColumns: '1fr 1fr',
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
				label={ __( '2 Columns', 'b2wp-grid' ) }
				isAdaptiveWidth={ true }
				value=""
				isDeselectable={ true }
				onChange={ ( value ) => onChangePresets( value ) }
				isBlock
			>
				<ToggleGroupControlOptionIcon
					value="featured"
					icon={ TwoColumnFeaturedIcon }
					label={ __( 'featured-block', 'b2wp-grid' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="magazine"
					icon={ TwoColumnMagazineIcon }
					label={ __( 'magazine', 'b2wp-grid' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="sidebar"
					icon={ TwoColumnSidebarIcon }
					label={ __( 'sidebar', 'b2wp-grid' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="equal"
					icon={ TwoColumnEqualIcon }
					label={ __( 'equal-columns', 'b2wp-grid' ) }
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
				{ presets === 'sidebar' && (
					<p>{ __( 'Sidebar layout selected', 'b2wp-grid' ) }</p>
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
