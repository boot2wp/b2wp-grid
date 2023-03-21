import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import { RangeControl } from '@wordpress/components';

import { getPlugin } from '@wordpress/plugins';
import PluginGridUserPanel from './PluginGridUserPanel';
import { setCSSAttributes } from '../components/helpers.js';

export const ColumnsPanel = () => {
    const plugin = getPlugin('plugin-grid-user-panel');
    return (
        <PluginGridUserPanel
            title={__('Columns', 'b2wp-grid')}
            id="wp-grid-user-panel-auto"
        >
            <SetColumns
                attributes={plugin.settings.attributes}
                setAttributes={plugin.settings.setAttributes}
            />
        </PluginGridUserPanel>
    )
}

const SetColumns = ({ attributes, setAttributes }) => {
    const [columns, setColumns] = useState(2);

    const updateColumns = (val) => {
        let newTemplateColumns = '';

        for (let i = 0; i < val; i++) {
            newTemplateColumns = newTemplateColumns + '1fr ';
        }

        setCSSAttributes({ templateColumns: newTemplateColumns.trim() }, setAttributes)
        setColumns(val)
    }

    return (
        <RangeControl
            label={__('Columns', 'b2wp-grid')}
            value={columns}
            onChange={(val) => updateColumns(val)}
            min={1}
            max={12}
        />
    )
};