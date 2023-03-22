import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import { RangeControl, CheckboxControl } from '@wordpress/components';

import { getPlugin } from '@wordpress/plugins';
import PluginGridUserPanel from './PluginGridUserPanel';

export const ColumnsPanel = () => {
    const plugin = getPlugin('plugin-grid-user-panel');
    const setAttributes = plugin.settings.setAttributes;
    const setCSSAttributes = plugin.settings.setCSSAttributes;

    const [hasUpdated, setHasUpdated] = useState(false);
    const [autoLayout, setAutoLayout] = useState(false);
    const [columns, setColumns] = useState(undefined);

    useEffect(() => {

        if (!hasUpdated) {
            return;
        }

        let newTemplateColumns = '';
        for (let i = 0; i < columns; i++) {
            newTemplateColumns = newTemplateColumns + '1fr ';
        }

        const newAttributes = {
            templateColumns: newTemplateColumns.trim()
        };

        if (autoLayout) {
            newAttributes['customCSS'] = `@media screen and (max-width: 600px) {
  .wp-grid-name-class {
  grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
  }
}
`
        }

        setCSSAttributes(newAttributes, setAttributes)
    }, [autoLayout, columns]);

    return (
        <PluginGridUserPanel
            title={__('Columns', 'b2wp-grid')}
        >
            <SetColumns
                columns={columns}
                setColumns={setColumns}
                setHasUpdated={setHasUpdated}
            />
            <SetAutoOnMobile
                autoLayout={autoLayout}
                setAutoLayout={setAutoLayout}
                setHasUpdated={setHasUpdated}
            />
        </PluginGridUserPanel>
    )
}

const SetColumns = ({ columns, setColumns, setHasUpdated }) => {

    const updateColumns = (val) => {
        setHasUpdated(true);
        setColumns(val);
    }

    return (
        <RangeControl
            label={__('Number of columns', 'b2wp-grid')}
            value={columns}
            onChange={(val) => updateColumns(val)}
            min={1}
            max={12}
        />
    )
};

const SetAutoOnMobile = ({ autoLayout, setAutoLayout, setHasUpdated }) => {

    const updateAutoLayout = (val) => {
        setHasUpdated(true);
        setAutoLayout(val);
    }

    return (
        <CheckboxControl
            label={__('Set to auto layout on mobile', 'b2wp-grid')}
            help={__('At mobile width screen, auto-calculate number of columns.', 'b2wp-grid')}
            checked={autoLayout}
            onChange={(val) => updateAutoLayout(val)}
        />
    )
};