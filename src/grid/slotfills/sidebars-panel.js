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
import PluginGridUserPanel from '../plugins/plugin-grid-user-panel';
import {
	autoColumnsOnMobileCSS,
	oneColumnOnMobileCSS,
} from '../components/utils';

export const SidebarsPanel = () => {
	const { clientId } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const [ hasUpdated, setHasUpdated ] = useState( false );
	const [ sidebarLocation, setSidebarLocation ] = useState( 'right' );
	const [ sidebarWidth, setSidebarWidth ] = useState( '200px' );
	const [ onMobile, setOnMobile ] = useState( 'oneColumn' );

	useEffect( () => {
		if ( ! hasUpdated ) {
			return;
		}

		let columns = '';

		if ( sidebarLocation === 'left' ) {
			columns = `${ sidebarWidth } 1fr`;
		} else {
			columns = `1fr ${ sidebarWidth }`;
		}

		let onMobileCSS = '';
		switch ( onMobile ) {
			case 'noChange':
				break;
			case 'oneColumn':
				onMobileCSS = oneColumnOnMobileCSS();
				break;
			case 'autoColumns':
				onMobileCSS = autoColumnsOnMobileCSS();
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
		sidebarWidth,
		sidebarLocation,
		onMobile,
		clientId,
		hasUpdated,
		updateBlockAttributes,
	] );

	return (
		<PluginGridUserPanel title={ __( 'Sidebars' ) }>
			<SetSidebarLocation
				sidebarLocation={ sidebarLocation }
				setSidebarLocation={ setSidebarLocation }
				setHasUpdated={ setHasUpdated }
			/>
			<SetSidebarWidth
				sidebarWidth={ sidebarWidth }
				setSidebarWidth={ setSidebarWidth }
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

const SetSidebarLocation = ( {
	sidebarLocation,
	setSidebarLocation,
	setHasUpdated,
} ) => {
	const updateSidebarLocation = ( val ) => {
		setHasUpdated( true );
		setSidebarLocation( val );
	};

	return (
		<RadioControl
			label="Select Sidebar Location"
			help="Put sidebar on left or right."
			selected={ sidebarLocation }
			options={ [
				{
					label: __( 'Left' ),
					value: 'left',
				},
				{
					label: __( 'Right' ),
					value: 'right',
				},
			] }
			onChange={ ( value ) => updateSidebarLocation( value ) }
		/>
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
					label: __( 'No change' ),
					value: 'noChange',
				},
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

const SingleColumnItem = styled( ToolsPanelItem )`
	grid-column: span 1;
`;

const SetSidebarWidth = ( {
	sidebarWidth,
	setSidebarWidth,
	setHasUpdated,
} ) => {
	const updateSidebarWidth = ( val ) => {
		setHasUpdated( true );
		setSidebarWidth( val );
	};

	const resetAll = () => {
		setSidebarWidth( '200px' );
	};

	return (
		<ToolsPanel label={ __( 'Set Sidebar Width' ) } resetAll={ resetAll }>
			<SingleColumnItem
				hasValue={ () => !! sidebarWidth }
				label={ __( 'Width' ) }
				onDeselect={ () => setSidebarWidth( '200px' ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Width' ) }
					onChange={ ( val ) => updateSidebarWidth( val ) }
					value={ sidebarWidth }
				/>
			</SingleColumnItem>
		</ToolsPanel>
	);
};
