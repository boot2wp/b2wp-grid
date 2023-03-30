/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	RadioControl,
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
import { oneColumnOnMobileCSS } from '../components/utils';
import PluginGridUserPanel from './plugin-grid-user-panel';

export const AutoPanel = () => {
	const { clientId } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const [ hasUpdated, setHasUpdated ] = useState( false );
	const [ minimumColumnWidth, setMinimumColumnWidth ] = useState( '10rem' );
	const [ onMobile, setOnMobile ] = useState( 'autoColumn' );

	useEffect( () => {
		if ( ! hasUpdated ) {
			return;
		}

		const columns = `repeat(auto-fill, minmax(min(${ minimumColumnWidth }, 100%), 1fr))`;

		let onMobileCSS = '';
		switch ( onMobile ) {
			case 'oneColumn':
				onMobileCSS = oneColumnOnMobileCSS();
				break;
			case 'autoColumn':
				break;
			default:
				break;
		}

		const newAttributes = {
			templateColumns: columns,
			customCSS: onMobileCSS,
		};

		if ( clientId ) {
			updateBlockAttributes( [ clientId ], newAttributes );
		}
	}, [
		minimumColumnWidth,
		onMobile,
		clientId,
		hasUpdated,
		updateBlockAttributes,
	] );

	return (
		<PluginGridUserPanel title={ __( 'Auto' ) }>
			<SetMinWidth
				minimumColumnWidth={ minimumColumnWidth }
				setMinimumColumnWidth={ setMinimumColumnWidth }
				setHasUpdated={ setHasUpdated }
			/>
			<SetOnMobileType
				onMobile={ onMobile }
				setOnMobile={ setOnMobile }
				setHasUpdated={ setHasUpdated }
			/>
		</PluginGridUserPanel>
	);
};

const SingleColumnItem = styled( ToolsPanelItem )`
	grid-column: span 1;
`;

const SetMinWidth = ( {
	minimumColumnWidth,
	setMinimumColumnWidth,
	setHasUpdated,
} ) => {
	const updateMinimumColumnWidth = ( val ) => {
		setHasUpdated( true );
		setMinimumColumnWidth( val );
	};

	const resetAll = () => {
		setMinimumColumnWidth( '10rem' );
	};

	return (
		<ToolsPanel
			label={ __( 'Set Minimum Column Width' ) }
			resetAll={ resetAll }
		>
			<SingleColumnItem
				hasValue={ () => !! minimumColumnWidth }
				label={ __( 'Width' ) }
				onDeselect={ () => setMinimumColumnWidth( '10rem' ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Width' ) }
					onChange={ ( val ) => updateMinimumColumnWidth( val ) }
					value={ minimumColumnWidth }
				/>
			</SingleColumnItem>
		</ToolsPanel>
	);
};

const SetOnMobileType = ( { onMobile, setOnMobile, setHasUpdated } ) => {
	const updateOnMobileType = ( val ) => {
		setHasUpdated( true );
		setOnMobile( val );
	};

	return (
		<RadioControl
			label="On mobile"
			help="Select grid layout for mobile width."
			selected={ onMobile }
			options={ [
				{
					label: __( 'One column' ),
					value: 'oneColumn',
				},
				{
					label: __( 'Auto columns' ),
					value: 'autoColumns',
				},
			] }
			onChange={ ( value ) => updateOnMobileType( value ) }
		/>
	);
};
