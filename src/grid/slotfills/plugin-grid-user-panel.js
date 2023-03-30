/**
 * WordPress dependencies
 */
import { createSlotFill, Panel, PanelBody } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'PluginGridUserPanel' );

const PluginGridUserPanel = ( { children, title } ) => (
	<Fill>
		<Panel>
			<PanelBody title={ title } initialOpen={ false }>
				{ children }
			</PanelBody>
		</Panel>
	</Fill>
);

PluginGridUserPanel.Slot = () => (
	<Slot>
		{ ( fills ) => {
			return fills.length ? <>{ fills }</> : null;
		} }
	</Slot>
);
export default PluginGridUserPanel;
