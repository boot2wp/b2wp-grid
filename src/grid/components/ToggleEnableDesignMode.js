/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { lockOutline, unlock } from '@wordpress/icons';

export const ToggleEnableDesignMode = () => {
	const { clientId, enableDesignMode } = useSelect( ( select ) => {
		const { getSelectedBlockClientId, getBlockAttributes } =
			select( blockEditorStore );
		const selectedClientId = getSelectedBlockClientId();

		return {
			clientId: selectedClientId,
			enableDesignMode: selectedClientId
				? getBlockAttributes( selectedClientId ).enableDesignMode
				: true,
		};
	} );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	let message = enableDesignMode
		? __( 'Disable design mode' )
		: __( 'Enable design mode' );

	const setEnableDesignMode = () => {
		if ( clientId ) {
			updateBlockAttributes( [ clientId ], {
				enableDesignMode: ! enableDesignMode,
			} );
		}
	};

	return (
		<PluginBlockSettingsMenuItem
			allowedBlocks={ [ 'b2wp/grid' ] }
			icon={ enableDesignMode ? unlock : lockOutline }
			label={ message }
			onClick={ setEnableDesignMode }
		/>
	);
};
