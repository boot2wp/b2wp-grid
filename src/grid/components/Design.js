/**
 * WordPress dependencies
 */
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

/**
 * Internal dependencies
 */
import { DesignSettings } from './design-settings';
import PluginGridDesignPanel from '../plugins/plugin-grid-design-panel';

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
						</>
					) }
				</TabPanel>
			</PanelBody>
		</Panel>
	);
};

const TemplateColumns = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Template Columns' ) }
		help={ __(
			"Value for grid-template-columns CSS property, like '1fr 1fr 1fr'"
		) }
		value={ attributes.templateColumns }
		onChange={ ( val ) => setAttributes( { templateColumns: val } ) }
	/>
);

const TemplateRows = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Template Rows' ) }
		help={ __(
			"Value for grid-template-rows CSS property, like '100px 1fr'"
		) }
		value={ attributes.templateRows }
		onChange={ ( val ) => setAttributes( { templateRows: val } ) }
	/>
);

const TemplateAreas = ( { attributes, setAttributes } ) => (
	<TextareaControl
		rows={ 6 }
		label={ __( 'Template Areas' ) }
		help={ __(
			"Value for grid-template-areas CSS property, like 'a a' 'b c'"
		) }
		value={ attributes.templateAreas }
		onChange={ ( val ) => setAttributes( { templateAreas: val } ) }
	/>
);

const NumberNamedAreas = ( { attributes, setAttributes } ) => (
	<RangeControl
		label={ __( 'Number of named areas' ) }
		help={ __( "Auto-generate named areas starting at 'a'" ) }
		value={ attributes.numberNamedAreas }
		onChange={ ( val ) => setAttributes( { numberNamedAreas: val } ) }
		min={ 0 }
		max={ 26 }
	/>
);

const AutoColumns = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Auto Columns' ) }
		help={ __(
			"Value for grid-auto-columns CSS property, like 'min-content'"
		) }
		value={ attributes.autoColumns }
		onChange={ ( val ) => setAttributes( { autoColumns: val } ) }
	/>
);

const AutoRows = ( { attributes, setAttributes } ) => (
	<TextControl
		label={ __( 'Auto Rows' ) }
		help={ __(
			"Value for grid-auto-rows CSS property, like 'min-content'"
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
		const newOption = option === 'none' ? '' : option;
		if ( option === 'other' ) {
			return;
		}
		setAttributes( { autoFlow: newOption } );
	};

	return (
		<PanelRow>
			<RadioControl
				label={ __( 'Auto Flow' ) }
				help={ __( 'Value for grid-auto-flow CSS property' ) }
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
			label={ __( 'Custom CSS' ) }
			help={ __(
				"Enter custom CSS. '.wp-grid-name' will be auto-replaced with block's grid name."
			) }
			placeholder=".wp-grid-name {}"
			value={ attributes.customCSS }
			onChange={ ( val ) => setAttributes( { customCSS: val } ) }
		/>
	</PanelRow>
);
