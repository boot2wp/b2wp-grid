import { __ } from '@wordpress/i18n';
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
    AutoColumnIcon, AutoRowIcon
} from './Icons.js';
import { setGridAttributes } from './helpers.js';

export const PresetsAuto = ({ attributes, setAttributes }) => {
    const [presets, setPresets] = useState(undefined);

    function onChangePresets(value, setAttributes) {
        let newGridAttributes = {};
        switch (value) {
            case 'column':
                newGridAttributes = {
                    "templateColumns": "repeat(auto-fill, minmax(min(10rem, 100%), 1fr))"

                };
                break;
            case 'row':
                newGridAttributes = {
                    "autoFlow": "column dense",
                };
                break;
            default:
                return;
        }
        setGridAttributes(setAttributes, newGridAttributes)
        setPresets(value);
    }

    return (
        <>
            <ToggleGroupControl
                label={__("Auto", 'b2wp-grid')}
                isAdaptiveWidth={true}
                value=""
                isDeselectable={true}
                onChange={(value) => onChangePresets(value, setAttributes)}
                isBlock
            >
                <ToggleGroupControlOptionIcon value="column" icon={AutoColumnIcon} label={__('auto-column', 'b2wp-grid')} />
                <ToggleGroupControlOptionIcon value="row" icon={AutoRowIcon} label={__('auto-row', 'b2wp-grid')} />
            </ToggleGroupControl>
            <>
                {presets === 'column' && (
                    <p>{__('Auto-column layout selected', 'b2wp-grid')}</p>
                )}
                {presets === 'row' && (
                    <p>{__('Auto-row layout selected', 'b2wp-grid')}</p>
                )}
                {presets === undefined && (
                    <p>{__('Select a grid layout', 'b2wp-grid')}</p>
                )}
            </>
        </>
    )
}
