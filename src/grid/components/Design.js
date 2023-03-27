import { __ } from '@wordpress/i18n';
import {
	Panel,
	PanelBody,
	PanelRow,
	TabPanel,
	TextControl,
	TextareaControl,
	RadioControl,
	RangeControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

import { DesignSettings } from './DesignSettings';
import PluginGridDesignPanel from '../slotfills/PluginGridDesignPanel.js';

export const Design = ( { attributes, setAttributes } ) => {
	return (
		<Panel>
			<PanelBody title="Design" initialOpen={ false }>
				<DesignSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<PluginGridDesignPanel.Slot />
				<TabPanel
					className="grid-design-tab-panel"
					tabs={ [
						{
							name: 'tabtemplate',
							title: 'Template',
							className: 'tab-template',
						},
						{
							name: 'tabauto',
							title: 'Auto',
							className: 'tab-auto',
						},
						{
							name: 'tabcustomcss',
							title: 'Custom',
							className: 'tab-custom-css',
						},
						// {
						// 	name: 'tabcss',
						// 	title: 'CSS',
						// 	className: 'tab-css',
						// },
					] }
				>
					{ ( tab ) => (
						<>
							{ tab.name === 'tabtemplate' && (
								<Spacer marginTop={ 6 }>
									<TemplateColumns
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<TemplateRows
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<NumberNamedAreas
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<TemplateAreas
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								</Spacer>
							) }
							{ tab.name === 'tabauto' && (
								<Spacer marginTop={ 6 }>
									<AutoColumns
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<AutoRows
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<AutoFlow
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								</Spacer>
							) }
							{ tab.name === 'tabcustomcss' && (
								<Spacer marginTop={ 6 }>
									<CustomCSS
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
								</Spacer>
							) }
							{ /* { tab.name === 'tabcss' && (
								<Spacer marginTop={ 6 }>
									<div>CSS</div>
								</Spacer>
							) } */ }
						</>
					) }
				</TabPanel>
			</PanelBody>
		</Panel>
	);
};

const TemplateColumns = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Template Columns', 'b2wp-grid' ) }
		help={ __(
			"Value for grid-template-columns CSS property, like '1fr 1fr 1fr'",
			'b2wp-grid'
		) }
		value={ attributes.templateColumns }
		onChange={ ( val ) => setAttributes( { templateColumns: val } ) }
	/>
);

const TemplateRows = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Template Rows', 'b2wp-grid' ) }
		help={ __(
			"Value for grid-template-rows CSS property, like '100px 1fr'",
			'b2wp-grid'
		) }
		value={ attributes.templateRows }
		onChange={ ( val ) => setAttributes( { templateRows: val } ) }
	/>
);

const TemplateAreas = ( { attributes, setAttributes } ) => (
	<TextareaControl
		rows={ 6 }
		label={ __( 'Template Areas', 'b2wp-grid' ) }
		help={ __(
			"Value for grid-template-areas CSS property, like 'a a' 'b c'",
			'b2wp-grid'
		) }
		value={ attributes.templateAreas }
		onChange={ ( val ) => setAttributes( { templateAreas: val } ) }
	/>
);

const NumberNamedAreas = ( { attributes, setAttributes } ) => (
	<RangeControl
		label={ __( 'Number of named areas', 'b2wp-grid' ) }
		help={ __( "Auto-generate named areas starting at 'a'", 'b2wp-grid' ) }
		value={ attributes.numberNamedAreas }
		onChange={ ( val ) => setAttributes( { numberNamedAreas: val } ) }
		min={ 0 }
		max={ 26 }
	/>
);

const AutoColumns = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Auto Columns', 'b2wp-grid' ) }
		help={ __(
			"Value for grid-auto-columns CSS property, like 'min-content'",
			'b2wp-grid'
		) }
		value={ attributes.autoColumns }
		onChange={ ( val ) => setAttributes( { autoColumns: val } ) }
	/>
);

const AutoRows = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Auto Rows', 'b2wp-grid' ) }
		help={ __(
			"Value for grid-auto-rows CSS property, like 'min-content'",
			'b2wp-grid'
		) }
		value={ attributes.autoRows }
		onChange={ ( val ) => setAttributes( { autoRows: val } ) }
	/>
);

const AutoFlow = ( { attributes, setAttributes } ) => {
	const getAutoFlowSelected = () => {
		const options = [
			'row',
			'column',
			'dense',
			'row dense',
			'column dense',
		];

		if ( attributes.autoFlow === '' ) {
			return 'none';
		}

		if ( options.includes( attributes.autoFlow ) ) {
			return attributes.autoFlow;
		}

		return 'other';
	};
	const updateAutoFlow = ( option ) => {
		let newOption = option === 'none' ? '' : option;
		if ( option === 'other' ) {
			return;
		}
		setAttributes( { autoFlow: newOption } );
	};

	return (
		<PanelRow>
			<RadioControl
				label={ __( 'Auto Flow', 'b2wp-grid' ) }
				help={ __(
					'Value for grid-auto-flow CSS property',
					'b2wp-grid'
				) }
				selected={ getAutoFlowSelected() }
				options={ [
					{ label: 'none', value: 'none' },
					{ label: 'row', value: 'row' },
					{ label: 'column', value: 'column' },
					{ label: 'dense', value: 'dense' },
					{ label: 'row dense', value: 'row dense' },
					{ label: 'column dense', value: 'column dense' },
					{ label: 'other', value: 'other' },
				] }
				onChange={ ( option ) => {
					updateAutoFlow( option );
				} }
			/>
		</PanelRow>
	);
};

const CustomCSS = ( { attributes, setAttributes } ) => (
	<PanelRow>
		<TextareaControl
			rows={ 30 }
			label={ __( 'Custom CSS', 'b2wp-grid' ) }
			help={ __(
				"Enter custom CSS. '.wp-grid-name-class' will be auto-replaced with block's grid name.",
				'b2wp-grid'
			) }
			placeholder=".wp-grid-name-class {}"
			value={ attributes.customCSS }
			onChange={ ( val ) => setAttributes( { customCSS: val } ) }
		/>
	</PanelRow>
);
