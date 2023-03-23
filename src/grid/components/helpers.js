export const setCSSAttributes = (cssAttributes, setAttributes) => {

    const attributeSettings = wp.data.select('core/blocks').getBlockType('b2wp/grid').attributes;

    let newCSSAttributes = {
        "templateColumns": attributeSettings.templateColumns.default,
        "templateRows": attributeSettings.templateRows.default,
        "templateAreas": attributeSettings.templateAreas.default,
        "autoColumns": attributeSettings.autoColumns.default,
        "autoRows": attributeSettings.autoRows.default,
        "autoFlow": attributeSettings.autoFlow.default,
        "customCSS": attributeSettings.customCSS.default,
        "numberNamedAreas": attributeSettings.numberNamedAreas.default,
        "rowGap": attributeSettings.rowGap.default,
        "columnGap": attributeSettings.columnGap.default,
    };

    newCSSAttributes = { ...newCSSAttributes, ...cssAttributes }
    setAttributes({ ...newCSSAttributes });
}


export const showDesignPanel = (attributes) => {
    return attributes.enableDesignMode;
}

export const setGridAttributes = (setAttributes, newGridAttributes) => {
    let gridAttributes = {
        "templateColumns": "",
        "templateRows": "",
        "templateAreas": "",
        "autoColumns": "",
        "autoRows": "",
        "autoFlow": "none",
        "customCSS": ".wp-grid-name-class {}",
        "numberNamedAreas": 0,
        "rowGap": "1rem",
        "columnGap": "1rem",
    };
    gridAttributes = { ...gridAttributes, ...newGridAttributes };
    setAttributes(gridAttributes);
}

export const autoColumnsOnMobileCSS = () => {
    return `@media screen and (max-width: 600px) {
.wp-grid-name-class {
grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
}
}`

}

export const oneColumnOnMobileCSS = () => {
    return `@media screen and (max-width: 600px) {
.wp-grid-name-class {
grid-template-columns: 1fr;
}
}`

}