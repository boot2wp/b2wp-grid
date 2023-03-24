import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, InspectorControls, } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { SlotFillProvider } from '@wordpress/components';
import { PluginArea, registerPlugin, getPlugin } from '@wordpress/plugins';
import { useEffect, memo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { EditorGridStyle } from './components/GridStyle.js';
import { User, GridGapPanel } from './components/User.js';
import { Design } from './components/Design.js';
import { saveLayout } from './components/SaveLayouts.js';
import { showDesignPanel } from './components/helpers.js';
import { UserPanels } from './slotfills/UserPanels.js'
import { DesignPanels } from './slotfills/DesignPanels.js'
import { setCSSAttributes } from './components/helpers.js';

import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {

	useEffect(() => {
		const userPlugin = getPlugin('plugin-grid-user-panel');
		if (!userPlugin) {
			registerPlugin('plugin-grid-user-panel', {
				render: () => (<></>),
				scope: 'grid-user-slots',
				settings: {
					attributes: attributes,
					setAttributes: setAttributes,
					setCSSAttributes: setCSSAttributes,
					saveLayout: saveLayout,
				},
			});
		}
	}, []);

	useEffect(() => {
		const userPlugin = getPlugin('plugin-grid-design-panel');
		if (!userPlugin) {
			registerPlugin('plugin-grid-design-panel', {
				render: () => (<></>),
				scope: 'grid-design-slots',
				settings: {
					attributes: attributes,
					setAttributes: setAttributes,
					setCSSAttributes: setCSSAttributes,
					saveLayout: saveLayout,
				},
			});
		}
	}, []);

	useEffect(() => {
		const menuSettingsPlugin = getPlugin('plugin-grid-menu-settings');
		if (!menuSettingsPlugin) {
			registerPlugin('plugin-grid-menu-settings', {
				render: () => (
					<ToggleEnableDesignMode
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				),
			});
		}
	}, []);

	const blocks = useSelect((select) => {
		return wp.data.select('core/block-editor').getBlocks()
	});

	useEffect(() => {
		const gridBlockNames = blocks
			.filter((block) => block.name === 'b2wp/grid')
			.map((block) => block.attributes.gridName)

		const countOfDuplicates = gridBlockNames.filter((name) => name === `${attributes.gridName}`).length;
		if (!attributes.gridName || (countOfDuplicates > 1)) {
			console.log(`reseting gridName to grid-${clientId}`)
			setAttributes({ gridName: `grid-${clientId}` });
		}
	}, []);

	const [showGrid, setShowGrid] = useState(true);

	return (
		<div {...useBlockProps(
			{
				className: `${attributes.gridName}`,
			}
		)}>
			{/* <ToggleEnableDesignMode
				attributes={attributes}
				setAttributes={setAttributes}
			/> */}
			<EditorGridStyle
				attributes={attributes}
				showGrid={showGrid}
			/>
			<InnerBlocks />
			<InspectorControls group="styles">
				<GridGapPanel
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
			<InspectorControls>
				<SlotFillProvider>
					<UserPanels attributes={attributes} />
					<User
						attributes={attributes}
						setAttributes={setAttributes}
						showGrid={showGrid}
						setShowGrid={setShowGrid}
					/>
					<PluginArea scope="grid-user-slots" />
				</SlotFillProvider>
				<SlotFillProvider>
					<DesignPanels attributes={attributes} />
					{showDesignPanel(attributes) && (
						<Design
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					)}
					<PluginArea scope="grid-design-slots" />
				</SlotFillProvider>
			</InspectorControls>
		</div>
	);
}

const ToggleEnableDesignMode = memo(({ attributes, setAttributes }) => {
	const message = attributes.enableDesignMode === true
		? __('Disable Design Mode', 'b2wp-grid')
		: __('Enable Design Mode', 'b2wp-grid')
	const lockIcon = attributes.enableDesignMode === true ? 'unlock' : 'lock'

	return (
		<PluginBlockSettingsMenuItem
			allowedBlocks={['b2wp/grid']}
			icon={lockIcon}
			label={message}
			onClick={() => {
				setAttributes({ enableDesignMode: !attributes.enableDesignMode })
			}}
		/>
	)
});