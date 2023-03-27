/**
 * Internal dependencies
 */
import { AreasPanel } from './AreasPanel';

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
