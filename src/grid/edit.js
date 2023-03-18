import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, InspectorControls, } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { Slot, SlotFillProvider } from '@wordpress/components';
import { PluginArea, registerPlugin } from '@wordpress/plugins';
import { useEffect } from '@wordpress/element';

import { EditorGridStyle } from './components/GridStyle.js';
import { Settings } from './components/Settings.js';
import { Design } from './components/Design.js';
import { saveCustomLayout } from './components/SaveCustomLayouts.js';
import { showDesignPanel } from './components/helpers.js';

import { ExampleGridUserPanel } from './slots/ExampleGridUserPanel.js';
import { ExampleGridDesignPanel } from './slots/ExampleGridDesignPanel.js';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	useEffect(() => {
		registerPlugin('plugin-grid-user-panel', {
			render: () => (<></>),
			scope: 'grid-slots',
			settings: {
				name: "Fred",
				attributes: attributes,
				setAttributes: setAttributes,
				saveCustomLayout: saveCustomLayout,
			},
		});
	}, []);

	useEffect(() => {
		registerPlugin('plugin-grid-design-panel', {
			render: () => (<></>),
			scope: 'grid-slots',
			settings: {
				attributes: attributes,
				setAttributes: setAttributes,
				saveCustomLayout: saveCustomLayout,
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

			<InspectorControls>
				<SlotFillProvider>
					<ExampleGridUserPanel
						title="Example grid user panel" />
					<Settings
						attributes={attributes}
						setAttributes={setAttributes}
						showGrid={showGrid}
						setShowGrid={setShowGrid}
					/>
					<PluginArea scope="grid-user-slots" />
				</SlotFillProvider>
				<SlotFillProvider>
					<ExampleGridDesignPanel
						title="Example grid designer panel"
					/>
					{showDesignPanel(attributes) && (
						<Design
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					)}
					<PluginArea scope="grid-designer-slots" />
				</SlotFillProvider>
			</InspectorControls>
		</div>
	);
}
