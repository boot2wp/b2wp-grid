import { __ } from '@wordpress/i18n';
import { Button, __experimentalSpacer as Spacer } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { setGridAttributes, showDesignPanel } from './utils.js';

export const PresetsCustom = ( { attributes, setAttributes } ) => {
	const [ selectedMessage, setSelectedMessage ] =
		useState( 'Select a layout' );

	function onChangeCustomLayout( layoutIndex ) {
		setGridAttributes(
			setAttributes,
			attributes.savedLayouts[ layoutIndex ].attributes
		);
		setSelectedMessage(
			attributes.savedLayouts[ layoutIndex ].name + ' selected'
		);
	}

	return (
		<>
			<CustomLayouts
				attributes={ attributes }
				onChangeCustomLayout={ onChangeCustomLayout }
				selectedMessage={ selectedMessage }
			/>
		</>
	);
};

const CustomLayouts = ( {
	attributes,
	onChangeCustomLayout,
	selectedMessage,
} ) => {
	const hasNoCustomLayouts =
		attributes.savedLayouts.length === 0 ? true : false;

	const layouts = attributes.savedLayouts.map( function ( layout, index ) {
		return (
			<Button
				key={ index }
				variant="tertiary"
				showTooltip={ true }
				label={ layout.description }
				onClick={ () => onChangeCustomLayout( index ) }
			>
				{ layout.name }
			</Button>
		);
	} );
	return (
		<>
			{ hasNoCustomLayouts && (
				<HasNoCustomLayouts attributes={ attributes } />
			) }
			{ ! hasNoCustomLayouts && (
				<>
					{ layouts }
					<Spacer padding={ 2 }></Spacer>
					<p>{ selectedMessage }</p>
				</>
			) }
		</>
	);
};

const HasNoCustomLayouts = ( { attributes } ) => {
	return (
		<>
			{ showDesignPanel( attributes ) && (
				<p>
					{ __(
						'No custom layouts have been saved. Design and save a layout yourself!',
						'b2wp-grid'
					) }
				</p>
			) }
		</>
	);
};
