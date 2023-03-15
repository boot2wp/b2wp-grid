import { __ } from '@wordpress/i18n';
import {
    PanelRow,
    Button,
    TextControl,
    __experimentalSpacer as Spacer,
    Flex, FlexItem,
    __experimentalDivider as Divider,
    Animate, Notice,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export const SaveCustomLayouts = ({ attributes, setAttributes }) => {

    const [visible, setVisible] = useState(false);
    const [layoutName, setLayoutName] = useState("Custom layout");
    const [layoutDescription, setLayoutDescription] = useState("Custom layout");
    const [savedSuccess, setSavedSuccess] = useState(false);

    const toggleVisible = () => {
        setVisible((current) => !current);
    };

    function onRemoveCustomLayout(layoutIndex, attributes, setAttributes) {
        const newLayouts = attributes.customLayouts;
        newLayouts.splice(layoutIndex, 1);
        setAttributes({ customLayouts: [...newLayouts] });
    }

    function onSaveCustomLayout(name, description, attributes, setAttributes) {
        let newLayout = {
            name: name,
            description: description,
            attributes: {
                "templateColumns": attributes.templateColumns,
                "templateRows": attributes.templateRows,
                "templateAreas": attributes.templateAreas,
                "autoColumns": attributes.autoColumns,
                "autoRows": attributes.autoRows,
                "autoFlow": attributes.autoFlow,
                "customCSS": attributes.customCSS,
                "numberNamedAreas": attributes.numberNamedAreas,
                "rowGap": attributes.rowGap,
                "columnGap": attributes.columnGap,
            }
        };
        const newLayouts = attributes.customLayouts;
        newLayouts.push(newLayout);
        setAttributes({ customLayouts: [...newLayouts] });
        setSavedSuccess(() => true);
    }

    return (
        <>
            <PanelRow>
                <Spacer marginTop={2} marginBottom={6}>
                    <Button
                        variant="secondary"
                        isPressed={visible}
                        onClick={toggleVisible}
                    >
                        {__('Manage saved layouts', 'b2wp-grid')}
                    </Button>
                </Spacer>
            </PanelRow>
            {
                visible &&
                <>
                    <LayoutName layoutName={layoutName} setLayoutName={setLayoutName} />
                    <LayoutDescription layoutDescription={layoutDescription} setLayoutDescription={setLayoutDescription} />
                    <SaveLayout attributes={attributes} setAttributes={setAttributes} onSaveCustomLayout={onSaveCustomLayout} layoutName={layoutName} layoutDescription={layoutDescription} savedSuccess={savedSuccess} setSavedSuccess={setSavedSuccess} />
                    <SavedLayouts attributes={attributes} setAttributes={setAttributes} onRemoveCustomLayout={onRemoveCustomLayout} />
                </>
            }
        </>
    )
}

const LayoutName = ({ layoutName, setLayoutName }) => (
    <TextControl
        label={__('Layout name', 'b2wp-grid')}
        value={layoutName}
        onChange={(val) => setLayoutName(val)}
    />
);

const LayoutDescription = ({ layoutDescription, setLayoutDescription }) => (
    <TextControl
        label={__('Layout description', 'b2wp-grid')}
        value={layoutDescription}
        onChange={(val) => setLayoutDescription(val)}
    />
);

const SaveLayout = ({
    attributes,
    setAttributes,
    onSaveCustomLayout,
    layoutName,
    layoutDescription,
    savedSuccess,
    setSavedSuccess }
) => (
    <>
        <PanelRow>
            <Button
                variant="primary"
                onClick={() => onSaveCustomLayout(layoutName, layoutDescription, attributes, setAttributes)}
            >
                Save layout
            </Button>
            {
                savedSuccess &&
                <SuccessNotice setSavedSuccess={setSavedSuccess} />
            }
        </PanelRow>
    </>
);

const SuccessNotice = ({ setSavedSuccess }) => {
    const remove = () => {
        setSavedSuccess(false)
    }

    return (
        <Animate
            type="slide-in"
            options={{ origin: 'top' }
            }>
            {() => (
                <Notice
                    status="success"
                    onRemove={remove}
                >
                    {__('Saved!', 'b2wp-grid')}
                </Notice>
            )}
        </Animate >
    );
}

const SavedLayouts = ({ attributes, setAttributes, onRemoveCustomLayout }) => {
    var layouts = attributes.customLayouts.map(
        function (layout, index) {
            return (
                <Flex>
                    <FlexItem>
                        {layout.name}
                    </FlexItem>
                    <FlexItem>
                        <Button
                            variant="tertiary"
                            showTooltip={true}
                            label={__('remove saved layout', 'b2wp-grid')}
                            onClick={() => onRemoveCustomLayout(index, attributes, setAttributes)}
                        >
                            x
                        </Button>
                    </FlexItem>
                </Flex>
            );
        }
    )
    return (
        <>
            <Divider />
            <h2>{__('Saved layouts', 'b2wp-grid')}</h2>
            {layouts}
            <Divider />
        </>
    );
}
