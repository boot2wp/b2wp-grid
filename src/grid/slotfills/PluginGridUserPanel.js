
import {
    createSlotFill,
    Panel,
    PanelBody,
    PanelRow,
} from '@wordpress/components';

const { Fill, Slot } = createSlotFill('PluginGridUserPanel');

const PluginGridUserPanel = ({ children, title }) => (
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

PluginGridUserPanel.Slot = () => (
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
export default PluginGridUserPanel;
