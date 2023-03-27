import { __ } from '@wordpress/i18n';
import {
	PanelRow,
	Button,
	TextControl,
	__experimentalSpacer as Spacer,
	Flex,
	FlexItem,
	__experimentalDivider as Divider,
	Animate,
	Notice,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { cancelCircleFilled } from '@wordpress/icons';

const saveLayout = (
	name,
	description,
	attributes,
	setAttributes,
	setSavedSuccess
) => {
	const newLayout = {
		name,
		description,
		attributes: {
			templateColumns: attributes.templateColumns,
			templateRows: attributes.templateRows,
			templateAreas: attributes.templateAreas,
			autoColumns: attributes.autoColumns,
			autoRows: attributes.autoRows,
			autoFlow: attributes.autoFlow,
			customCSS: attributes.customCSS,
			numberNamedAreas: attributes.numberNamedAreas,
			rowGap: attributes.rowGap,
			columnGap: attributes.columnGap,
		},
	};
	const newLayouts = attributes.savedLayouts;
	newLayouts.push( newLayout );
	setAttributes( { savedLayouts: [ ...newLayouts ] } );
	setSavedSuccess( () => true );
};

const onRemoveSavedLayout = ( layoutIndex, attributes, setAttributes ) => {
	const newLayouts = attributes.savedLayouts;
	newLayouts.splice( layoutIndex, 1 );
	setAttributes( { savedLayouts: [ ...newLayouts ] } );
};

export const SaveLayouts = ( { attributes, setAttributes } ) => {
	const [ layoutName, setLayoutName ] = useState( 'Custom layout' );
	const [ layoutDescription, setLayoutDescription ] =
		useState( 'Custom layout' );
	const [ savedSuccess, setSavedSuccess ] = useState( false );

	const toggleVisible = () => {
		setVisible( ( current ) => ! current );
	};

	return (
		<>
			<LayoutName
				layoutName={ layoutName }
				setLayoutName={ setLayoutName }
			/>
			<LayoutDescription
				layoutDescription={ layoutDescription }
				setLayoutDescription={ setLayoutDescription }
			/>
			<SaveLayout
				attributes={ attributes }
				setAttributes={ setAttributes }
				layoutName={ layoutName }
				layoutDescription={ layoutDescription }
				savedSuccess={ savedSuccess }
				setSavedSuccess={ setSavedSuccess }
			/>
			<SavedLayouts
				attributes={ attributes }
				setAttributes={ setAttributes }
				onRemoveSavedLayout={ onRemoveSavedLayout }
			/>
		</>
	);
};

const LayoutName = ( { layoutName, setLayoutName } ) => (
	<TextControl
		label={ __( 'Layout name' ) }
		value={ layoutName }
		onChange={ ( val ) => setLayoutName( val ) }
	/>
);

const LayoutDescription = ( { layoutDescription, setLayoutDescription } ) => (
	<TextControl
		label={ __( 'Layout description' ) }
		value={ layoutDescription }
		onChange={ ( val ) => setLayoutDescription( val ) }
	/>
);

const SaveLayout = ( {
	attributes,
	setAttributes,
	layoutName,
	layoutDescription,
	savedSuccess,
	setSavedSuccess,
} ) => (
	<>
		<PanelRow>
			<Button
				variant="primary"
				onClick={ () =>
					saveLayout(
						layoutName,
						layoutDescription,
						attributes,
						setAttributes,
						setSavedSuccess
					)
				}
			>
				Save layout
			</Button>
			{ savedSuccess && (
				<SuccessNotice setSavedSuccess={ setSavedSuccess } />
			) }
		</PanelRow>
	</>
);

const SuccessNotice = ( { setSavedSuccess } ) => {
	const remove = () => {
		setSavedSuccess( false );
	};

	return (
		<Animate type="slide-in" options={ { origin: 'top' } }>
			{ () => (
				<Notice status="success" onRemove={ remove }>
					{ __( 'Saved!' ) }
				</Notice>
			) }
		</Animate>
	);
};

const SavedLayouts = ( { attributes, setAttributes } ) => {
	const hasNoCustomLayouts =
		attributes.savedLayouts.length === 0 ? true : false;

	const layouts = attributes.savedLayouts.map( function ( layout, index ) {
		return (
			<Flex key={ index }>
				<FlexItem>{ layout.name }</FlexItem>
				<FlexItem>
					<Button
						variant="tertiary"
						icon={ cancelCircleFilled }
						showTooltip={ true }
						label={ __( 'remove saved layout' ) }
						onClick={ () =>
							onRemoveSavedLayout(
								index,
								attributes,
								setAttributes
							)
						}
					></Button>
				</FlexItem>
			</Flex>
		);
	} );
	return (
		<>
			<Divider />
			<h2>{ __( 'Saved layouts' ) }</h2>
			{ hasNoCustomLayouts && (
				<p>{ __( 'No custom layouts have been saved.' ) }</p>
			) }
			{ layouts }
			<Divider />
		</>
	);
};
