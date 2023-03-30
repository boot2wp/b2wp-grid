/**
 * Internal dependencies
 */
import { AreasPanel } from './areas-panel';

export const DesignPanels = ( { attributes } ) => {
	const enablePanels = attributes.enablePanels;

	return (
		<>
			{ enablePanels.find( ( panel ) => panel.name === 'Areas' ) && (
				<AreasPanel />
			) }
		</>
	);
};
