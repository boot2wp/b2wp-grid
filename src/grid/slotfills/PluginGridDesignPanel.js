
import {
    createSlotFill,
    Panel,
    PanelBody,
    PanelRow,
} from '@wordpress/components';

const { Fill, Slot } = createSlotFill('PluginGridUserPanel');

const PluginGridDesignPanel = ({ children, title }) => (
    <Fill>
        <Panel>
            <PanelBody title={title} initialOpen={false}>
                <PanelRow>
                    {children}
                </PanelRow>
            </PanelBody>
        </Panel>
    </Fill>
);

PluginGridDesignPanel.Slot = () => (
    <Slot>
        {(fills) => {
            return fills.length ? (
                <>
                    {fills}
                </>
            ) : null;
        }}
    </Slot>
);
export default PluginGridDesignPanel;
