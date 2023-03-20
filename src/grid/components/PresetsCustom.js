import { __ } from '@wordpress/i18n';
import {
    Button,
    __experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { setGridAttributes, showDesignPanel } from './helpers.js';

export const PresetsCustom = ({ attributes, setAttributes }) => {
    const [selectedMessage, setSelectedMessage] = useState("Select a layout");

    function onChangeCustomLayout(layoutIndex, attributes, setAttributes) {
        setGridAttributes(setAttributes, attributes.savedLayouts[layoutIndex].attributes)
        setSelectedMessage(attributes.savedLayouts[layoutIndex].name + ' selected')
    }

    return (
        <>
            <CustomLayouts
                attributes={attributes}
                setAttributes={setAttributes}
                onChangeCustomLayout={onChangeCustomLayout}
                selectedMessage={selectedMessage}
            />
        </>
    )
}

const CustomLayouts = ({ attributes, setAttributes, onChangeCustomLayout, selectedMessage }) => {
    const hasNoCustomLayouts = (attributes.savedLayouts.length === 0) ? true : false;

    var layouts = attributes.savedLayouts.map(
        function (layout, index) {
            return (
                <Button
                    variant="tertiary"
                    showTooltip={true}
                    label={layout.description}
                    onClick={() => onChangeCustomLayout(index, attributes, setAttributes)}
                >
                    {layout.name}
                </Button>);
        }
    )
    return (
        <>
            {hasNoCustomLayouts && (
                <HasNoCustomLayouts attributes={attributes} showDesignPanel={showDesignPanel} />
            )}
            {!hasNoCustomLayouts && (
                <>
                    {layouts}
                    <Spacer padding={2}></Spacer>
                    <p>{selectedMessage}</p>
                </>
            )}
        </>
    );
}

const HasNoCustomLayouts = ({ attributes, showDesignPanel }) => {
    return (
        <>
            {showDesignPanel(attributes) && (
                <p>
                    {__('No custom layouts have been saved. Design and save a layout yourself!', 'b2wp-grid')}
                </p>
            )}
            {!showDesignPanel(attributes) && (
                <p>
                    {__('No custom layouts have been saved.', 'b2wp-grid')}
                </p>
            )}
        </>
    )

}