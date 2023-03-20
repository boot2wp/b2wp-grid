import { __ } from '@wordpress/i18n';

import { getPlugin } from '@wordpress/plugins';

import PluginGridUserPanel from './PluginGridUserPanel';

export const SidebarsPanel = () => {
    const plugin = getPlugin('plugin-grid-user-panel');
    return (
        <PluginGridUserPanel
            title={__('Sidebars', 'b2wp-grid')}
            id="wp-grid-user-panel-auto"
        >
            <div>Sidebars Panel</div>
            <div>gridName: {plugin.settings.attributes.gridName}</div>
        </PluginGridUserPanel>
    )
}