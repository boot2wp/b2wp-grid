import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import {
	TextareaControl,
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { getPlugin } from '@wordpress/plugins';

import styled from '@emotion/styled';

import PluginGridUserPanel from './PluginGridUserPanel';

export const AreasPanel = () => {
	const plugin = getPlugin( 'plugin-grid-user-panel' );
	const setAttributes = plugin.settings.setAttributes;
	const setGridAttributes = plugin.settings.setGridAttributes;

	const [ hasUpdated, setHasUpdated ] = useState( false );
	const [ numberNamedAreas, setNumberNamedAreas ] = useState( 3 );
	const [ areas, setAreas ] = useState( "'a a b' 'a a c'" );
	const [ mobileAreas, setMobileAreas ] = useState( "'a' 'b' 'c'" );
	const [ mobileBreakpoint, setMobileBreakpoint ] = useState( '600px' );

	useEffect( () => {
		if ( ! hasUpdated ) {
			return;
		}

		const onMobileCSS = `@media screen and (max-width: ${ mobileBreakpoint }) {
.wp-grid-name-class {
grid-template-areas: ${ mobileAreas };
}
}`;

		const newAttributes = {
			templateColumns: '',
			templateAreas: areas,
			customCSS: onMobileCSS,
			numberNamedAreas,
		};

		setGridAttributes( setAttributes, newAttributes );
	}, [ areas, mobileAreas, numberNamedAreas, mobileBreakpoint ] );

	return (
		<PluginGridUserPanel title={ __( 'Areas', 'b2wp-grid' ) }>
			<SetAreas
				areas={ areas }
				setAreas={ setAreas }
				setHasUpdated={ setHasUpdated }
			/>
			<SetMobileAreas
				mobileAreas={ mobileAreas }
				setMobileAreas={ setMobileAreas }
				setHasUpdated={ setHasUpdated }
			/>
			<SetNumberNamedAreas
				numberNamedAreas={ numberNamedAreas }
				setNumberNamedAreas={ setNumberNamedAreas }
				setHasUpdated={ setHasUpdated }
			/>
			<SetMobileBreakpoint
				mobileBreakpoint={ mobileBreakpoint }
				setMobileBreakpoint={ setMobileBreakpoint }
				setHasUpdated={ setHasUpdated }
			/>
		</PluginGridUserPanel>
	);
};

const SetAreas = ( { areas, setAreas, setHasUpdated } ) => {
	const updateAreas = ( val ) => {
		setHasUpdated( true );
		setAreas( val );
	};

	return (
		<TextareaControl
			rows={ 6 }
			label={ __( 'Template Areas', 'b2wp-grid' ) }
			help={ __(
				"Value for grid-template-areas CSS property, like 'a a' 'b c'",
				'b2wp-grid'
			) }
			value={ areas }
			onChange={ ( val ) => updateAreas( val ) }
		/>
	);
};

const SetMobileAreas = ( { mobileAreas, setMobileAreas, setHasUpdated } ) => {
	const updateMobileAreas = ( val ) => {
		setHasUpdated( true );
		setMobileAreas( val );
	};

	return (
		<TextareaControl
			rows={ 6 }
			label={ __( 'Mobile Template Areas', 'b2wp-grid' ) }
			help={ __(
				'Value for grid-template-areas on mobile widths',
				'b2wp-grid'
			) }
			value={ mobileAreas }
			onChange={ ( val ) => updateMobileAreas( val ) }
		/>
	);
};

const SetNumberNamedAreas = ( {
	numberNamedAreas,
	setNumberNamedAreas,
	setHasUpdated,
} ) => {
	const updateNumberNamedAreas = ( val ) => {
		setHasUpdated( true );
		setNumberNamedAreas( val );
	};

	return (
		<RangeControl
			label={ __( 'Number of named areas', 'b2wp-grid' ) }
			help={ __(
				"Auto-generate named areas starting at 'a'",
				'b2wp-grid'
			) }
			value={ numberNamedAreas }
			onChange={ ( val ) => updateNumberNamedAreas( val ) }
			min={ 0 }
			max={ 26 }
		/>
	);
};

const SingleColumnItem = styled( ToolsPanelItem )`
	grid-column: span 1;
`;

const SetMobileBreakpoint = ( {
	mobileBreakpoint,
	setMobileBreakpoint,
	setHasUpdated,
} ) => {
	const updateMobileBreakpoint = ( val ) => {
		setHasUpdated( true );
		setMobileBreakpoint( val );
	};

	const resetAll = () => {
		setMobileBreakpoint( '600px' );
	};

	return (
		<ToolsPanel
			label={ __( 'Set Mobile Breakpoint' ) }
			resetAll={ resetAll }
		>
			<SingleColumnItem
				hasValue={ () => !! mobileBreakpoint }
				label={ __( 'Width', 'b2wp-grid' ) }
				onDeselect={ () => setMobileBreakpoint( '600px' ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Width', 'b2wp-grid' ) }
					onChange={ ( val ) => updateMobileBreakpoint( val ) }
					value={ mobileBreakpoint }
				/>
			</SingleColumnItem>
		</ToolsPanel>
	);
};
