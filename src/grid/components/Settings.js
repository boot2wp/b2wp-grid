import { __ } from '@wordpress/i18n';
import {
    Panel, PanelBody, CheckboxControl, TextControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalUnitControl as UnitControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { TwoColumnIcon, ThreeColumnIcon, FourColumnIcon } from './Icons.js';
import { PresetsTwoColumn } from './PresetsTwoColumn';
import { PresetsThreeColumn } from './PresetsThreeColumn';
import { PresetsFourColumn } from './PresetsFourColumn';
import { PresetsAuto } from './PresetsAuto';
import { PresetsCustom } from './PresetsCustom';

import PluginGridUserPanel from '../slotfills/PluginGridUserPanel.js';
import styled from '@emotion/styled';

export const Settings = ({ attributes, setAttributes, showGrid, setShowGrid }) => {

    const [layouts, setLayouts] = useState(undefined);

    function onChangeLayouts(value) {
        setLayouts(value);
    }

    return (
        <>
            <Panel>
                <PanelBody>
                    {
                        !attributes.showStandardLayouts &&
                        <PresetsCustom attributes={attributes} setAttributes={setAttributes} />
                    }
                    {
                        attributes.showStandardLayouts &&
                        <>
                            <ToggleGroupControl
                                label={__('Layouts', 'b2wp-grid')}
                                // value="vertical"
                                isDeselectable={true}
                                onChange={(value) => onChangeLayouts(value)}
                                isBlock
                            >
                                <ToggleGroupControlOptionIcon value="2col" icon={TwoColumnIcon} label={__('2 columns', 'b2wp-grid')} />
                                <ToggleGroupControlOptionIcon value="3col" icon={ThreeColumnIcon} label={__('3 columns', 'b2wp-grid')} />
                                <ToggleGroupControlOptionIcon value="4col" icon={FourColumnIcon} label={__('4 columns', 'b2wp-grid')} />
                                <ToggleGroupControlOption value="auto" label={__('auto', 'b2wp-grid')} />
                                <ToggleGroupControlOption value="custom" label={__('custom', 'b2wp-grid')} />
                            </ToggleGroupControl>
                            <>
                                {layouts === '2col' && (
                                    <PresetsTwoColumn attributes={attributes} setAttributes={setAttributes} />
                                )}
                                {layouts === '3col' && (
                                    <PresetsThreeColumn attributes={attributes} setAttributes={setAttributes} />
                                )}
                                {layouts === '4col' && (
                                    <PresetsFourColumn attributes={attributes} setAttributes={setAttributes} />
                                )}
                                {layouts === 'auto' && (
                                    <PresetsAuto attributes={attributes} setAttributes={setAttributes} />
                                )}
                                {layouts === 'custom' && (
                                    <PresetsCustom attributes={attributes} setAttributes={setAttributes} />
                                )}
                            </>
                        </>
                    }

                </PanelBody>
            </Panel>
            <PluginGridUserPanel.Slot />
            <Panel>
                <PanelBody>
                    <ShowGrid showGrid={showGrid} setShowGrid={setShowGrid} />
                    <GridName attributes={attributes} setAttributes={setAttributes} />
                    <GridGapPanel attributes={attributes} setAttributes={setAttributes} />
                </PanelBody>
            </Panel>
        </>
    );
}

const ShowGrid = ({ showGrid, setShowGrid }) => (
    (
        <CheckboxControl
            label={__('Show grid', 'b2wp-grid')}
            help={__('Show outline around grid areas in the editor', 'b2wp-grid')}
            checked={showGrid}
            onChange={(val) => setShowGrid(val)}
        />
    )
);

const GridName = ({ attributes, setAttributes }) => (
    <TextControl
        label={__('Grid Name', 'b2wp-grid')}
        help="Each grid on a post or page should have a unique name."
        value={attributes.gridName}
        onChange={(val) => setAttributes({ gridName: val })}
    />
);

const PanelDescription = styled.div`
    grid-column: span 2;
`;

const SingleColumnItem = styled(ToolsPanelItem)`
    grid-column: span 1;
`;

function GridGapPanel({ attributes, setAttributes }) {

    const resetAll = () => {
        setAttributes({ rowGap: "" });
        setAttributes({ columnGap: "" });
    };

    return (
        <ToolsPanel label={__('Grid Gap')} resetAll={resetAll}>
            <SingleColumnItem
                hasValue={() => !!attributes.rowGap}
                label={__('Row', 'b2wp-grid')}
                onDeselect={() => setAttributes({ rowGap: "" })}
                isShownByDefault
            >
                <UnitControl
                    label={__('Row', 'b2wp-grid')}
                    onChange={(val) => setAttributes({ rowGap: val })}
                    value={attributes.rowGap}
                />
            </SingleColumnItem>
            <SingleColumnItem
                hasValue={() => !!attributes.columnGap}
                label={__('Column', 'b2wp-grid')}
                onDeselect={() => setAttributes({ columnGap: "" })}
                isShownByDefault
            >
                <UnitControl
                    label={__('Column', 'b2wp-grid')}
                    onChange={(val) => setAttributes({ columnGap: val })}
                    value={attributes.columnGap}
                />
            </SingleColumnItem>
        </ToolsPanel>
    );
}