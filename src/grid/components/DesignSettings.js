import { __ } from '@wordpress/i18n';
import {
    Panel, PanelBody,
    CheckboxControl,
} from '@wordpress/components';

export const DesignSettings = ({ attributes, setAttributes }) => {
    return (
        <>
            <Panel>
                <PanelBody title={__('Panels', 'b2wp-grid')} initialOpen={false}>
                    <Panels attributes={attributes} setAttributes={setAttributes} />
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <ApplyToQueryLoop attributes={attributes} setAttributes={setAttributes} />
                </PanelBody>
            </Panel>
        </>
    );
}

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
                label={__('Layouts', 'b2wp-grid')}
                checked={enablePanels.find(panel => panel["name"] === 'Layouts')}
                onChange={(val) => setChecked(val, "Layouts")}
            />
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

