export const showDesignPanel = (attributes) => {
    if (!attributes.enableDesignMode) {
        return false;
    }

    if (!attributes.disableDesignModeIfMovementLocked) {
        return true;
    }

    if (attributes.lock === undefined) {
        return true;
    }

    if (attributes.lock.move === true) {
        return false;
    }
    return true;
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