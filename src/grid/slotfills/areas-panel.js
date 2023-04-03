/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	TextareaControl,
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import PluginGridDesignPanel from '../plugins/plugin-grid-design-panel';

export const AreasPanel = () => {
	const { clientId } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

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
  .wp-grid-name {
    grid-template-areas: ${ mobileAreas };
  }
}`;

		const newAttributes = {
			templateColumns: '',
			templateAreas: areas,
			customCSS: onMobileCSS,
			numberNamedAreas,
		};

		if ( clientId ) {
			updateBlockAttributes( [ clientId ], newAttributes );
		}
	}, [
		areas,
		mobileAreas,
		numberNamedAreas,
		mobileBreakpoint,
		clientId,
		hasUpdated,
		updateBlockAttributes,
	] );

	return (
		<PluginGridDesignPanel title={ __( 'Areas' ) }>
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
		</PluginGridDesignPanel>
	);
};

const SetAreas = ( { areas, setAreas, setHasUpdated } ) => {
	const updateAreas = ( val ) => {
		setHasUpdated( true );
		setAreas( val );
	};

	return (
		<TextareaControl
			rows={ 4 }
			label={ __( 'Template Areas' ) }
			help={ __(
				"Value for grid-template-areas CSS property, like 'a a' 'b c'"
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
			rows={ 4 }
			label={ __( 'Mobile Template Areas' ) }
			help={ __( 'Value for grid-template-areas on mobile widths' ) }
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
			label={ __( 'Number of named areas' ) }
			help={ __( "Auto-generate named areas starting at 'a'" ) }
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
				label={ __( 'Width' ) }
				onDeselect={ () => setMobileBreakpoint( '600px' ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Width' ) }
					onChange={ ( val ) => updateMobileBreakpoint( val ) }
					value={ mobileBreakpoint }
				/>
			</SingleColumnItem>
		</ToolsPanel>
	);
};
