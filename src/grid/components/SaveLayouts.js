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

export const saveLayout = (name, description, attributes, setAttributes) => {
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
    const newLayouts = attributes.savedLayouts;
    newLayouts.push(newLayout);
    setAttributes({ savedLayouts: [...newLayouts] });
    setSavedSuccess(() => true);
}

export const SaveLayouts = ({ attributes, setAttributes }) => {

    const [visible, setVisible] = useState(false);
    const [layoutName, setLayoutName] = useState("Custom layout");
    const [layoutDescription, setLayoutDescription] = useState("Custom layout");
    const [savedSuccess, setSavedSuccess] = useState(false);

    const toggleVisible = () => {
        setVisible((current) => !current);
    };

    function onRemoveSavedLayout(layoutIndex, attributes, setAttributes) {
        const newLayouts = attributes.savedLayouts;
        newLayouts.splice(layoutIndex, 1);
        setAttributes({ savedLayouts: [...newLayouts] });
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
                    <SaveLayout attributes={attributes} setAttributes={setAttributes} saveLayout={saveLayout} layoutName={layoutName} layoutDescription={layoutDescription} savedSuccess={savedSuccess} setSavedSuccess={setSavedSuccess} />
                    <SavedLayouts attributes={attributes} setAttributes={setAttributes} onRemoveSavedLayout={onRemoveSavedLayout} />
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
    saveLayout,
    layoutName,
    layoutDescription,
    savedSuccess,
    setSavedSuccess }
) => (
    <>
        <PanelRow>
            <Button
                variant="primary"
                onClick={() => saveLayout(layoutName, layoutDescription, attributes, setAttributes)}
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

const SavedLayouts = ({ attributes, setAttributes, onRemoveSavedLayout }) => {
    var layouts = attributes.savedLayouts.map(
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
                            onClick={() => onRemoveSavedLayout(index, attributes, setAttributes)}
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
