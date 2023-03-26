import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { SlotFillProvider } from '@wordpress/components';
import { PluginArea, registerPlugin, getPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';

import { EditorGridStyle } from './components/GridStyle.js';
import { User, GridGapPanel } from './components/User.js';
import { Design } from './components/Design.js';
import { ToggleEnableDesignMode } from './components/ToggleEnableDesignMode.js';
import { showDesignPanel, setCSSAttributes } from './components/helpers.js';
import { UserPanels } from './slotfills/UserPanels.js';
import { DesignPanels } from './slotfills/DesignPanels.js';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	useEffect( () => {
		const userPlugin = getPlugin( 'plugin-grid-user-panel' );
		if ( ! userPlugin ) {
			registerPlugin( 'plugin-grid-user-panel', {
				render: () => <></>,
				scope: 'grid-user-slots',
				settings: {
					attributes,
					setAttributes,
					setCSSAttributes,
				},
			} );
		}
	}, [] );

	useEffect( () => {
		const userPlugin = getPlugin( 'plugin-grid-design-panel' );
		if ( ! userPlugin ) {
			registerPlugin( 'plugin-grid-design-panel', {
				render: () => <></>,
				scope: 'grid-design-slots',
				settings: {
					attributes,
					setAttributes,
					setCSSAttributes,
				},
			} );
		}
	}, [] );

	useEffect( () => {
		const menuSettingsPlugin = getPlugin( 'plugin-grid-menu-settings' );
		if ( ! menuSettingsPlugin ) {
			registerPlugin( 'plugin-grid-menu-settings', {
				render: () => (
					<ToggleEnableDesignMode
						attributes={ attributes }
						setAttributes={ setAttributes }
						clientId={ clientId }
					/>
				),
			} );
		}
	}, [] );

	const blocks = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlocks();
	} );

	useEffect( () => {
		const gridBlockNames = blocks
			.filter( ( block ) => block.name === 'b2wp/grid' )
			.map( ( block ) => block.attributes.gridName );

		const countOfDuplicates = gridBlockNames.filter(
			( name ) => name === `${ attributes.gridName }`
		).length;
		if ( ! attributes.gridName || countOfDuplicates > 1 ) {
			setAttributes( { gridName: `grid-${ clientId }` } );
		}
	}, [] );

	const [ showGrid, setShowGrid ] = useState( true );

	return (
		<div
			{ ...useBlockProps( {
				className: `${ attributes.gridName }`,
			} ) }
		>
			<EditorGridStyle attributes={ attributes } showGrid={ showGrid } />
			<InnerBlocks />
			<InspectorControls group="styles">
				<GridGapPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<InspectorControls>
				<SlotFillProvider>
					<UserPanels attributes={ attributes } />
					<User
						attributes={ attributes }
						setAttributes={ setAttributes }
						showGrid={ showGrid }
						setShowGrid={ setShowGrid }
					/>
					<PluginArea scope="grid-user-slots" />
				</SlotFillProvider>
				<SlotFillProvider>
					<DesignPanels attributes={ attributes } />
					{ showDesignPanel( attributes ) && (
						<Design
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					) }
					<PluginArea scope="grid-design-slots" />
				</SlotFillProvider>
			</InspectorControls>
		</div>
	);
}
