import {
    createSlotFill,
    Panel,
    PanelBody,
    PanelRow,
} from '@wordpress/components';

const { Fill, Slot } = createSlotFill('PluginGridUserPanel');

const PluginGridDesignPanel = ({ children, title, description, id }) => (
    <Fill>
        <Panel>
            <PanelBody title={title} initialOpen={false}>
                {children}
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
