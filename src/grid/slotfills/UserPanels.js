import { AutoPanel } from './AutoPanel.js';
import { ColumnsPanel } from './ColumnsPanel.js';
import { SidebarsPanel } from './SidebarsPanel.js';

export const UserPanels = ({ attributes }) => {

    const enablePanels = attributes.enablePanels;

    return (
        <>
            {enablePanels.find(panel => panel["name"] === 'Columns') && (
                <ColumnsPanel />
            )}
            {enablePanels.find(panel => panel["name"] === 'Auto') && (
                <AutoPanel />
            )}
            {enablePanels.find(panel => panel["name"] === 'Sidebars') && (
                <SidebarsPanel />
            )}
        </>
    )
}