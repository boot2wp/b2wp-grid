import { __ } from '@wordpress/i18n';

import { getPlugin } from '@wordpress/plugins';

import PluginGridUserPanel from './PluginGridUserPanel';

export const AutoPanel = () => {
    const plugin = getPlugin('plugin-grid-user-panel');
    return (
        <PluginGridUserPanel
            title={__('Auto', 'b2wp-grid')}
            id="wp-grid-user-panel-auto"
        >
            <div>Auto Panel</div>
            <div>gridName: {plugin.settings.attributes.gridName}</div>
        </PluginGridUserPanel>
    )
}