/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { AutoColumnIcon, AutoRowIcon, CenteredIcon } from './Icons';

/**
 * Internal dependencies
 */
import { setGridAttributes } from './utils';

export const PresetsAuto = ( { setAttributes } ) => {
	const [ presets, setPresets ] = useState( undefined );

	function onChangePresets( value ) {
		let newGridAttributes = {};
		switch ( value ) {
			case 'column':
				newGridAttributes = {
					templateColumns:
						'repeat(auto-fill, minmax(min(10rem, 100%), 1fr))',
				};
				break;
			case 'row':
				newGridAttributes = {
					autoFlow: 'column dense',
				};
				break;
			case 'centered':
				newGridAttributes = {
					customCSS: `.wp-grid-name-class {
  place-items: center;
}`,
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
				label={ __( 'Auto' ) }
				isAdaptiveWidth={ true }
				value=""
				isDeselectable={ true }
				onChange={ ( value ) => onChangePresets( value ) }
				isBlock
			>
				<ToggleGroupControlOptionIcon
					value="column"
					icon={ AutoColumnIcon }
					label={ __( 'auto-column' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="row"
					icon={ AutoRowIcon }
					label={ __( 'auto-row' ) }
				/>
				<ToggleGroupControlOptionIcon
					value="centered"
					icon={ CenteredIcon }
					label={ __( 'centerd' ) }
				/>
			</ToggleGroupControl>
			<>
				{ presets === 'column' && (
					<p>{ __( 'Auto-column layout selected' ) }</p>
				) }
				{ presets === 'row' && (
					<p>{ __( 'Auto-row layout selected' ) }</p>
				) }
				{ presets === 'centered' && (
					<p>{ __( 'Centered layout selected' ) }</p>
				) }
				{ presets === undefined && (
					<p>{ __( 'Select a grid layout' ) }</p>
				) }
			</>
		</>
	);
};
