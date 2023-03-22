import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import {
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { getPlugin } from '@wordpress/plugins';
import styled from '@emotion/styled';

import PluginGridUserPanel from './PluginGridUserPanel';

export const AutoPanel = () => {
    const plugin = getPlugin('plugin-grid-user-panel');
    const setAttributes = plugin.settings.setAttributes;
    const setCSSAttributes = plugin.settings.setCSSAttributes;

    const [hasUpdated, setHasUpdated] = useState(false);
    const [minimumColumnWidth, setMinimumColumnWidth] = useState('10rem');

    useEffect(() => {

        if (!hasUpdated) {
            return;
        }

        const columns = `repeat(auto-fill, minmax(min(${minimumColumnWidth}, 100%), 1fr))`

        const newAttributes = {
            templateColumns: columns
        };

        setCSSAttributes(newAttributes, setAttributes)
    }, [minimumColumnWidth]);

    return (
        <PluginGridUserPanel
            title={__('Auto', 'b2wp-grid')}
        >
            <SetMinWidth
                minimumColumnWidth={minimumColumnWidth}
                setMinimumColumnWidth={setMinimumColumnWidth}
                setHasUpdated={setHasUpdated}
            />
        </PluginGridUserPanel>
    )
}

const SingleColumnItem = styled(ToolsPanelItem)`
    grid-column: span 1;
`;

const SetMinWidth = ({ minimumColumnWidth, setMinimumColumnWidth, setHasUpdated }) => {

    const updateMinimumColumnWidth = (val) => {
        setHasUpdated(true);
        setMinimumColumnWidth(val);
    }

    const resetAll = () => {
        setMinimumColumnWidth('10rem');
    };

    return (
        <ToolsPanel label={__('Set Minimum Column Width')} resetAll={resetAll}>
            <SingleColumnItem
                hasValue={() => !!minimumColumnWidth}
                label={__('Width', 'b2wp-grid')}
                onDeselect={() => setMinimumColumnWidth('10rem')}
                isShownByDefault
            >
                <UnitControl
                    label={__('Width', 'b2wp-grid')}
                    onChange={(val) => updateMinimumColumnWidth(val)}
                    value={minimumColumnWidth}
                />
            </SingleColumnItem>
        </ToolsPanel>
    );
};
