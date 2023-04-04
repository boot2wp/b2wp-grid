/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import {
	RangeControl,
	RadioControl,
	CheckboxControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import PluginGridUserPanel from '../plugins/plugin-grid-user-panel';
import {
	autoColumnsOnMobileCSS,
	oneColumnOnMobileCSS,
} from '../components/utils';

export const ColumnsPanel = () => {
	const { clientId } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const [ hasUpdated, setHasUpdated ] = useState( false );
	const [ columns, setColumns ] = useState( undefined );
	const [ onMobile, setOnMobile ] = useState( 'oneColumn' );
	const [ autoWidth, setAutoWidth ] = useState( false );

	useEffect( () => {
		if ( ! hasUpdated ) {
			return;
		}

		let newTemplateColumns = '';
		const columnType = autoWidth ? 'auto ' : '1fr ';
		for ( let i = 0; i < columns; i++ ) {
			newTemplateColumns = newTemplateColumns + columnType;
		}

		let onMobileCSS = '';
		switch ( onMobile ) {
			case 'noChange':
				break;
			case 'oneColumn':
				onMobileCSS = oneColumnOnMobileCSS();
				break;
			case 'autoColumns':
				onMobileCSS = autoColumnsOnMobileCSS();
				break;
			default:
				break;
		}
		const newAttributes = {
			templateColumns: newTemplateColumns.trim(),
			templateRows: '',
			templateAreas: '',
			autoColumns: '',
			autoRows: '',
			autoFlow: '',
			customCSS: onMobileCSS,
			numberNamedAreas: 0,
		};

		if ( clientId ) {
			updateBlockAttributes( [ clientId ], newAttributes );
		}
	}, [
		columns,
		onMobile,
		autoWidth,
		clientId,
		hasUpdated,
		updateBlockAttributes,
	] );

	return (
		<PluginGridUserPanel title={ __( 'Columns' ) }>
			<SetColumns
				columns={ columns }
				setColumns={ setColumns }
				setHasUpdated={ setHasUpdated }
			/>
			<SetAutoWidth
				autoWidth={ autoWidth }
				setAutoWidth={ setAutoWidth }
				setHasUpdated={ setHasUpdated }
			/>
			<SetOnMobileType
				onMobile={ onMobile }
				setOnMobile={ setOnMobile }
				setHasUpdated={ setHasUpdated }
			/>
		</PluginGridUserPanel>
	);
};

const SetColumns = ( { columns, setColumns, setHasUpdated } ) => {
	const updateColumns = ( val ) => {
		setHasUpdated( true );
		setColumns( val );
	};

	return (
		<RangeControl
			label={ __( 'Number of columns' ) }
			value={ columns }
			onChange={ ( val ) => updateColumns( val ) }
			min={ 1 }
			max={ 12 }
		/>
	);
};

const SetOnMobileType = ( { onMobile, setOnMobile, setHasUpdated } ) => {
	const updateOnMobileType = ( val ) => {
		setHasUpdated( true );
		setOnMobile( val );
	};

	return (
		<RadioControl
			label="On mobile"
			help="Select grid layout for mobile width."
			selected={ onMobile }
			options={ [
				{
					label: __( 'No change' ),
					value: 'noChange',
				},
				{
					label: __( 'One column' ),
					value: 'oneColumn',
				},
				{
					label: __( 'Auto columns' ),
					value: 'autoColumns',
				},
			] }
			onChange={ ( value ) => updateOnMobileType( value ) }
		/>
	);
};

const SetAutoWidth = ( { autoWidth, setAutoWidth, setHasUpdated } ) => {
	const updateAutoWidth = ( val ) => {
		setHasUpdated( true );
		setAutoWidth( val );
	};

	return (
		<CheckboxControl
			label="Auto width column"
			checked={ autoWidth }
			onChange={ ( val ) => updateAutoWidth( val ) }
		/>
	);
};
