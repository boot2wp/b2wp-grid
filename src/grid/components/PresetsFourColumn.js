import { __ } from '@wordpress/i18n';
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
    FourColumnFeaturedIcon, FourColumnMagazineIcon,
    FourColumnEqualIcon
} from './Icons.js';
import { setGridAttributes } from './helpers.js';

export const PresetsFourColumn = ({ attributes, setAttributes }) => {
    const [presets, setPresets] = useState(undefined);

    function onChangePresets(value, setAttributes) {
        let newGridAttributes = {};
        switch (value) {
            case 'featured':
                newGridAttributes = {
                    "templateAreas": `'a a a a'
'a a a a'
'b c d e'`,
                    "numberNamedAreas": 5,
                };
                break;
            case 'magazine':
                newGridAttributes = {
                    "templateAreas": `'a a a b'
'a a a c'
'd e f g'
`,
                    "numberNamedAreas": 7,
                };
                break;
            case 'equal':
                newGridAttributes = {
                    "templateColumns": "1fr 1fr 1fr 1fr",
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
                label={__('4 columns', 'b2wp-grid')}
                isAdaptiveWidth={true}
                value=""
                isDeselectable={true}
                onChange={(value) => onChangePresets(value, setAttributes)}
                isBlock
            >
                <ToggleGroupControlOptionIcon value="featured" icon={FourColumnFeaturedIcon} label={__('featured', 'b2wp-grid')} />
                <ToggleGroupControlOptionIcon value="magazine" icon={FourColumnMagazineIcon} label={__('magazine', 'b2wp-grid')} />
                <ToggleGroupControlOptionIcon value="equal" icon={FourColumnEqualIcon} label={__('equal', 'b2wp-grid')} />
            </ToggleGroupControl>
            <>
                {presets === 'featured' && (
                    <p>{__('Featured-block layout selected', 'b2wp-grid')}</p>
                )}
                {presets === 'magazine' && (
                    <p>{__('Magazine layout selected', 'b2wp-grid')}</p>
                )}
                {presets === 'equal' && (
                    <p>{__('Equal - columns layout selected', 'b2wp - grid')}</p>
                )}
                {presets === undefined && (
                    <p>{__('Select a grid layout', 'b2wp-grid')}</p>
                )}
            </>
        </>
    )
}