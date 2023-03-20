import { __ } from '@wordpress/i18n';

import { AreasPanel } from './AreasPanel.js';

export const DesignPanels = ({ attributes }) => {
    const enablePanels = attributes.enablePanels;

    return (
        <>
            {enablePanels.find(panel => panel["name"] === 'Areas') && (
                <AreasPanel />
            )}
        </>
    )
}