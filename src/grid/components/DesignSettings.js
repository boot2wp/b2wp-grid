import { __ } from '@wordpress/i18n';
import {
    Panel, PanelBody, PanelRow,
    TabPanel, CheckboxControl,
    TextControl, TextareaControl, RadioControl, RangeControl,
    __experimentalSpacer as Spacer,
} from '@wordpress/components';

export const DesignSettings = ({ attributes, setAttributes }) => {
    return (
        <Panel>
            <PanelBody title={__('Settings', 'b2wp-grid')} initialOpen={false}>
                <GridName attributes={attributes} setAttributes={setAttributes} />
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

