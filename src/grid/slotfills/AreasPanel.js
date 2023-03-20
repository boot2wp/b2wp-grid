import { __ } from '@wordpress/i18n';

import { getPlugin } from '@wordpress/plugins';

import PluginGridDesignPanel from './PluginGridDesignPanel';

export const AreasPanel = () => {
    const plugin = getPlugin('plugin-grid-design-panel');
    return (
        <PluginGridDesignPanel
            title={__('Areas', 'b2wp-grid')}
            id="wp-grid-design-panel-areas"
        >
            <div>Areas panel</div>
        </PluginGridDesignPanel>
    )
}