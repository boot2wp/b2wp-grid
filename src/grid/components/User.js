import { __ } from '@wordpress/i18n';
import {
	Panel,
	PanelBody,
	CheckboxControl,
	Flex,
	FlexItem,
	Button,
	__experimentalSpacer as Spacer,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { undo } from '@wordpress/icons';

import { TwoColumnIcon, ThreeColumnIcon, FourColumnIcon } from './Icons.js';
import { PresetsTwoColumn } from './PresetsTwoColumn';
import { PresetsThreeColumn } from './PresetsThreeColumn';
import { PresetsFourColumn } from './PresetsFourColumn';
import { PresetsAuto } from './PresetsAuto';
import { PresetsCustom } from './PresetsCustom';
import { resetGridAttributes } from './utils.js';

import PluginGridUserPanel from '../slotfills/PluginGridUserPanel.js';
import styled from '@emotion/styled';

export const User = ( {
	attributes,
	setAttributes,
	showGrid,
	setShowGrid,
} ) => {
	const [ layouts, setLayouts ] = useState( undefined );
	const [ showLayoutsPanel, setLayoutsPanel ] = useState(
		attributes.enablePanels.find( ( panel ) => panel.name === 'Layouts' )
	);

	useEffect( () => {
		setLayoutsPanel(
			attributes.enablePanels.find(
				( panel ) => panel.name === 'Layouts'
			)
		);
	}, [ attributes.enablePanels ] );

	return (
		<>
			<Panel>
				<PanelBody>
					{ ! showLayoutsPanel && (
						<PresetsCustom
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					) }
					{ showLayoutsPanel && (
						<>
							<ToggleGroupControl
								label={ __( 'Layouts', 'b2wp-grid' ) }
								isDeselectable={ true }
								onChange={ ( value ) => setLayouts( value ) }
								isBlock
							>
								<ToggleGroupControlOptionIcon
									value="2col"
									icon={ TwoColumnIcon }
									label={ __( '2 columns', 'b2wp-grid' ) }
								/>
								<ToggleGroupControlOptionIcon
									value="3col"
									icon={ ThreeColumnIcon }
									label={ __( '3 columns', 'b2wp-grid' ) }
								/>
								<ToggleGroupControlOptionIcon
									value="4col"
									icon={ FourColumnIcon }
									label={ __( '4 columns', 'b2wp-grid' ) }
								/>
								<ToggleGroupControlOption
									value="auto"
									showTooltip={ true }
									aria-label={ __(
										'auto layouts',
										'b2wp-grid'
									) }
									label={ __( 'auto', 'b2wp-grid' ) }
								/>
								<ToggleGroupControlOption
									value="custom"
									showTooltip={ true }
									aria-label={ __(
										'custom layouts',
										'b2wp-grid'
									) }
									label={ __( 'custom', 'b2wp-grid' ) }
								/>
							</ToggleGroupControl>
							<>
								{ layouts === '2col' && (
									<PresetsTwoColumn
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								) }
								{ layouts === '3col' && (
									<PresetsThreeColumn
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								) }
								{ layouts === '4col' && (
									<PresetsFourColumn
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								) }
								{ layouts === 'auto' && (
									<PresetsAuto
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								) }
								{ layouts === 'custom' && (
									<PresetsCustom
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								) }
							</>
						</>
					) }
				</PanelBody>
			</Panel>
			<PluginGridUserPanel.Slot />
			<Panel>
				<PanelBody>
					<UserSettings
						setAttributes={ setAttributes }
						showGrid={ showGrid }
						setShowGrid={ setShowGrid }
					/>
				</PanelBody>
			</Panel>
		</>
	);
};

const UserSettings = ( { setAttributes, showGrid, setShowGrid } ) => (
	<Spacer paddingBottom={ 2 }>
		<Flex>
			<FlexItem>
				<CheckboxControl
					label={ __( 'Show grid', 'b2wp-grid' ) }
					checked={ showGrid }
					onChange={ ( val ) => setShowGrid( val ) }
				/>
			</FlexItem>
			<FlexItem>
				<Button
					icon={ undo }
					showTooltip={ true }
					label={ __( 'Reset to default grid layout', 'b2wp-grid' ) }
					onClick={ () => resetGridAttributes( setAttributes ) }
				/>
			</FlexItem>
		</Flex>
	</Spacer>
);

const SingleColumnItem = styled( ToolsPanelItem )`
	grid-column: span 1;
`;

export const GridGapPanel = ( { attributes, setAttributes } ) => {
	const resetAll = () => {
		setAttributes( { rowGap: '' } );
		setAttributes( { columnGap: '' } );
	};

	return (
		<ToolsPanel label={ __( 'Grid Gap' ) } resetAll={ resetAll }>
			<SingleColumnItem
				hasValue={ () => !! attributes.rowGap }
				label={ __( 'Row', 'b2wp-grid' ) }
				onDeselect={ () => setAttributes( { rowGap: '' } ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Row', 'b2wp-grid' ) }
					onChange={ ( val ) => setAttributes( { rowGap: val } ) }
					value={ attributes.rowGap }
				/>
			</SingleColumnItem>
			<SingleColumnItem
				hasValue={ () => !! attributes.columnGap }
				label={ __( 'Column', 'b2wp-grid' ) }
				onDeselect={ () => setAttributes( { columnGap: '' } ) }
				isShownByDefault
			>
				<UnitControl
					label={ __( 'Column', 'b2wp-grid' ) }
					onChange={ ( val ) => setAttributes( { columnGap: val } ) }
					value={ attributes.columnGap }
				/>
			</SingleColumnItem>
		</ToolsPanel>
	);
};
