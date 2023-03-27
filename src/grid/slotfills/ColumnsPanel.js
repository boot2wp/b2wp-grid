import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { RangeControl, RadioControl } from '@wordpress/components';

import PluginGridUserPanel from './PluginGridUserPanel';
import {
	autoColumnsOnMobileCSS,
	oneColumnOnMobileCSS,
} from '../components/utils';

export const ColumnsPanel = () => {
	const { clientId } = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		const clientId = getSelectedBlockClientId();

		return {
			clientId,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const [ hasUpdated, setHasUpdated ] = useState( false );
	const [ columns, setColumns ] = useState( undefined );
	const [ onMobile, setOnMobile ] = useState( 'oneColumn' );

	useEffect( () => {
		if ( ! hasUpdated ) {
			return;
		}

		let newTemplateColumns = '';
		for ( let i = 0; i < columns; i++ ) {
			newTemplateColumns = newTemplateColumns + '1fr ';
		}

		let onMobileCSS = '';
		switch ( onMobile ) {
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
	}, [ columns, onMobile ] );

	return (
		<PluginGridUserPanel title={ __( 'Columns', 'b2wp-grid' ) }>
			<SetColumns
				columns={ columns }
				setColumns={ setColumns }
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
			label={ __( 'Number of columns', 'b2wp-grid' ) }
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
			help="Select grid for mobile width."
			selected={ onMobile }
			options={ [
				{
					label: __( 'One column', 'b2wp-grid' ),
					value: 'oneColumn',
				},
				{
					label: __( 'Auto columns', 'b2wp-grid' ),
					value: 'autoColumns',
				},
			] }
			onChange={ ( value ) => updateOnMobileType( value ) }
		/>
	);
};
