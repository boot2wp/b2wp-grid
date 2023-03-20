import { __ } from '@wordpress/i18n';

import { getPlugin } from '@wordpress/plugins';

import PluginGridUserPanel from './PluginGridUserPanel';

export const ColumnsPanel = () => {
    const plugin = getPlugin('plugin-grid-user-panel');
    return (
        <PluginGridUserPanel
            title={__('Columns', 'b2wp-grid')}
            id="wp-grid-user-panel-auto"
        >
            <div>Columns Panel</div>
            <div>gridName: {plugin.settings.attributes.gridName}</div>
        </PluginGridUserPanel>
    )
}