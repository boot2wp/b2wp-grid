import { __ } from '@wordpress/i18n';
import {
    Panel, PanelBody,
    CheckboxControl,
    TextControl,
} from '@wordpress/components';

import { useState } from '@wordpress/element';

export const DesignSettings = ({ attributes, setAttributes }) => {
    return (
        <Panel>
            <PanelBody title={__('Settings', 'b2wp-grid')} initialOpen={false}>
                <GridName attributes={attributes} setAttributes={setAttributes} />
                <Panels attributes={attributes} setAttributes={setAttributes} />
                <ApplyToQueryLoop attributes={attributes} setAttributes={setAttributes} />
            </PanelBody>
        </Panel>
    );
}

const GridName = ({ attributes, setAttributes }) => (
    <TextControl
        label={__('Grid Name', 'b2wp-grid')}
        help="Each grid on a post or page should have a unique name."
        value={attributes.gridName}
        onChange={(val) => setAttributes({ gridName: val })}
    />
);

const ApplyToQueryLoop = ({ attributes, setAttributes }) => (
    (
        <CheckboxControl
            label="Apply to Query Loop block"
            help={__("Apply the css grid property to a Query Loop block inside the grid, instead of to the CSS Grid block itself.", 'b2wp-grid')}
            checked={attributes.applyToQueryLoop}
            onChange={(val) => setAttributes({ applyToQueryLoop: val })}
        />
    )
);

const Panels = ({ attributes, setAttributes }) => {
    const enablePanels = attributes.enablePanels;

    const setChecked = (val, panelName) => {
        let newEnablePanels = [];

        if (!val) {
            newEnablePanels = attributes.enablePanels.filter(function (panel) {
                return panel.name !== panelName;
            });

            setAttributes({ enablePanels: newEnablePanels })
            return;
        }

        newEnablePanels = [...attributes.enablePanels, { name: panelName }]
        setAttributes({ enablePanels: newEnablePanels })
    }

    return (
        <>
            <CheckboxControl
                label={__('Columns', 'b2wp-grid')}
                checked={enablePanels.find(panel => panel["name"] === 'Columns')}
                onChange={(val) => setChecked(val, "Columns")}
            />
            <CheckboxControl
                label={__('Auto', 'b2wp-grid')}
                checked={enablePanels.find(panel => panel["name"] === 'Auto')}
                onChange={(val) => setChecked(val, "Auto")}
            />
            <CheckboxControl
                label={__('Sidebars', 'b2wp-grid')}
                checked={enablePanels.find(panel => panel["name"] === 'Sidebars')}
                onChange={(val) => setChecked(val, "Sidebars")}
            />
            <CheckboxControl
                label="Areas"
                checked={enablePanels.find(panel => panel["name"] === 'Areas')}
                onChange={(val) => setChecked(val, "Areas")}
            />
        </>
    )
};

