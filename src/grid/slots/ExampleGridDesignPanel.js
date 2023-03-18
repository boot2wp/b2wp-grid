import { getPlugin } from '@wordpress/plugins';

import PluginGridDesignPanel from './PluginGridDesignPanel';

export const ExampleGridDesignPanel = ({ title }) => {
    const plugin = getPlugin('plugin-grid-design-panel');
    return (
        <PluginGridDesignPanel
            title={title}
        >
            <div>gridName: {plugin.settings.attributes.gridName}</div>
        </PluginGridDesignPanel>
    )
}