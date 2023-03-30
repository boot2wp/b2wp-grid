/**
 * WordPress dependencies
 */
import { createSlotFill, Panel, PanelBody } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'PluginGridDesignPanel' );

const PluginGridDesignPanel = ( { children, title } ) => (
	<Fill>
		<Panel>
			<PanelBody title={ title } initialOpen={ false }>
				{ children }
			</PanelBody>
		</Panel>
	</Fill>
);

PluginGridDesignPanel.Slot = () => (
	<Slot>
		{ ( fills ) => {
			return fills.length ? <>{ fills }</> : null;
		} }
	</Slot>
);
export default PluginGridDesignPanel;
