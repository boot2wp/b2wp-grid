/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	CheckboxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
	Card,
	CardBody,
} from '@wordpress/components';

/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import PluginGridUserPanel from '../plugins/plugin-grid-user-panel';

export const CardPanel = () => {
	const { clientId } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const [ hasUpdated, setHasUpdated ] = useState( false );
	const [ height, setHeight ] = useState( undefined );
	const [ fullHeight, setFullHeight ] = useState( false );

	useEffect( () => {
		if ( ! hasUpdated ) {
			return;
		}

		let newCustomCSS = '';
		if ( fullHeight ) {
			newCustomCSS = `.wp-grid-name {
  height: calc(100vh - var(--wp-admin--admin-bar--height, 0px));
} `;
		} else {
			newCustomCSS = `.wp-grid-name {
  height: ${ height };
} `;
		}

		const newAttributes = {
			templateColumns: '',
			templateRows: 'auto 1fr auto',
			templateAreas: '',
			autoColumns: '',
			autoRows: '',
			autoFlow: '',
			customCSS: newCustomCSS,
			numberNamedAreas: 0,
		};

		if ( clientId ) {
			updateBlockAttributes( [ clientId ], newAttributes );
		}
	}, [ height, fullHeight, clientId, hasUpdated, updateBlockAttributes ] );

	return (
		<PluginGridUserPanel title={ __( 'Card' ) }>
			<Card size="xSmall" isBorderless>
				<CardBody>
					Expects 3 inner blocks for the header, body, and footer. To
					put multiple blocks in the body, use a group or CSS grid
					block.
				</CardBody>
			</Card>
			<SetFullHeight
				fullHeight={ fullHeight }
				setFullHeight={ setFullHeight }
				setHasUpdated={ setHasUpdated }
			/>
			{ ! fullHeight && (
				<SetHeight
					height={ height }
					setHeight={ setHeight }
					setHasUpdated={ setHasUpdated }
				/>
			) }
		</PluginGridUserPanel>
	);
};

const SingleColumnItem = styled( ToolsPanelItem )`
	grid-column: span 1;
`;

const SetHeight = ( { height, setHeight, setHasUpdated } ) => {
	const updateHeight = ( val ) => {
		setHasUpdated( true );
		setHeight( val );
	};

	const resetAll = () => {
		setHeight( undefined );
	};

	return (
		<ToolsPanel label={ __( 'Set height' ) } resetAll={ resetAll }>
			<SingleColumnItem
				hasValue={ () => !! height }
				label={ __( 'Width' ) }
				onDeselect={ () => setHeight( undefined ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Height' ) }
					onChange={ ( val ) => updateHeight( val ) }
					value={ height }
				/>
			</SingleColumnItem>
		</ToolsPanel>
	);
};

const SetFullHeight = ( { fullHeight, setFullHeight, setHasUpdated } ) => {
	const updateFullHeight = ( val ) => {
		setHasUpdated( true );
		setFullHeight( val );
	};

	return (
		<CheckboxControl
			label="Set to full screen height"
			checked={ fullHeight }
			onChange={ ( val ) => updateFullHeight( val ) }
		/>
	);
};
