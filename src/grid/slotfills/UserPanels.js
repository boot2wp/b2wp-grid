/**
 * Internal dependencies
 */
import { AutoPanel } from './AutoPanel';
import { ColumnsPanel } from './ColumnsPanel';
import { SidebarsPanel } from './SidebarsPanel';

export const UserPanels = ( { attributes } ) => {
	const enablePanels = attributes.enablePanels;

	return (
		<>
			{ enablePanels.find( ( panel ) => panel.name === 'Columns' ) && (
				<ColumnsPanel />
			) }
			{ enablePanels.find( ( panel ) => panel.name === 'Auto' ) && (
				<AutoPanel />
			) }
			{ enablePanels.find( ( panel ) => panel.name === 'Sidebars' ) && (
				<SidebarsPanel />
			) }
		</>
	);
};
