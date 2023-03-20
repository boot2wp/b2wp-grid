import { getPlugin } from '@wordpress/plugins';

import PluginGridUserPanel from './PluginGridUserPanel';

export const ExampleGridUserPanel = ({ title }) => {
    const plugin = getPlugin('plugin-grid-user-panel');
    return (
        <PluginGridUserPanel
            title={title}
        >
            <div>gridName: {plugin.settings.attributes.gridName}</div>
        </PluginGridUserPanel>
    )
}