import { InnerBlocks, useBlockProps, InspectorControls, } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

import { EditorGridStyle } from './components/GridStyle.js';
import { Settings } from './components/Settings.js';
import { Design } from './components/Design.js';

import { showDesignPanel } from './components/helpers.js';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	const [showGrid, setShowGrid] = useState(true);

	return (
		<div {...useBlockProps(
			{
				className: `${attributes.gridName}`,
			}
		)}>
			<EditorGridStyle
				attributes={attributes}
				showGrid={showGrid}
			/>
			<InnerBlocks />
			<InspectorControls>
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
			</InspectorControls>
		</div>
	);
}
