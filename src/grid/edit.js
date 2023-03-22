import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, InspectorControls, } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { SlotFillProvider } from '@wordpress/components';
import { PluginArea, registerPlugin, getPlugin } from '@wordpress/plugins';
import { useEffect } from '@wordpress/element';

import { EditorGridStyle } from './components/GridStyle.js';
import { User, GridGapPanel } from './components/User.js';
import { Design } from './components/Design.js';
import { saveLayout } from './components/SaveLayouts.js';
import { showDesignPanel } from './components/helpers.js';
import { UserPanels } from './slotfills/UserPanels.js'
import { DesignPanels } from './slotfills/DesignPanels.js'
import { setCSSAttributes } from './components/helpers.js';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

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
	}, []);



	const ToggleEnableDesignMode = ({ attributes, setAttributes }) => {
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
	};


	const [showGrid, setShowGrid] = useState(true);

	return (
		<div {...useBlockProps(
			{
				className: `${attributes.gridName}`,
			}
		)}>
			<ToggleEnableDesignMode
				attributes={attributes}
				setAttributes={setAttributes}
			/>
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
