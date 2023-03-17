import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, InspectorControls, } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { Slot, SlotFillProvider } from '@wordpress/components';
import { PluginArea } from '@wordpress/plugins';

import { EditorGridStyle } from './components/GridStyle.js';
import { Settings } from './components/Settings.js';
import { Design } from './components/Design.js';
import { showDesignPanel } from './components/helpers.js';

import { ExampleGridUserPanel } from './slots/ExampleGridUserPanel.js';
import { ExampleGridDesignerPanel } from './slots/ExampleGridDesignerPanel.js';

import './slots/register.js';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

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
					<ExampleGridUserPanel title="Example grid user panel" attributes={attributes} setAttributes={setAttributes} />
					<ExampleGridDesignerPanel title="Example grid designer panel" attributes={attributes} setAttributes={setAttributes} />
					<Settings
						attributes={attributes}
						setAttributes={setAttributes}
						showGrid={showGrid}
						setShowGrid={setShowGrid}
					/>
					{showDesignPanel(attributes) && (
						<Design
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					)}

					<PluginArea scope="grid-slots" />
				</SlotFillProvider>
			</InspectorControls>
		</div>
	);
}
