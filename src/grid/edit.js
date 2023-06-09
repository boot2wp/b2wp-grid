/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { SlotFillProvider } from '@wordpress/components';
import { PluginArea, registerPlugin, getPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { EditorGridStyle } from './components/grid-style';
import { User, GridGapPanel } from './components/user';
import { Design } from './components/design';
import { ToggleEnableDesignMode } from './components/toggle-enable-design-mode';
import { showDesignPanel } from './components/utils';
import { UserPanels } from './slotfills/user-panels';
import { DesignPanels } from './slotfills/design-panels';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	useEffect( () => {
		const userPlugin = getPlugin( 'plugin-grid-user-panel' );
		if ( ! userPlugin ) {
			registerPlugin( 'plugin-grid-user-panel', {
				render: () => <></>,
				scope: 'grid-user-slots',
			} );
		}
	}, [] );

	useEffect( () => {
		const userPlugin = getPlugin( 'plugin-grid-design-panel' );
		if ( ! userPlugin ) {
			registerPlugin( 'plugin-grid-design-panel', {
				render: () => <></>,
				scope: 'grid-design-slots',
			} );
		}
	}, [] );

	useEffect( () => {
		const menuSettingsPlugin = getPlugin( 'plugin-grid-menu-settings' );
		if ( ! menuSettingsPlugin ) {
			registerPlugin( 'plugin-grid-menu-settings', {
				render: () => <ToggleEnableDesignMode />,
			} );
		}
	}, [] );

	const blocks = useSelect( ( select ) => {
		return select( blockEditorStore ).getBlocks();
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
	}, [ attributes.gridName, blocks, clientId, setAttributes ] );

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
