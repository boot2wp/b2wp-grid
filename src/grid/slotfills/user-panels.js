/**
 * Internal dependencies
 */
import { ColumnsPanel } from './columns-panel';
import { SidebarsPanel } from './sidebars-panel';
import { CardPanel } from './card-panel';

export const UserPanels = ( { attributes } ) => {
	const enablePanels = attributes.enablePanels;

	return (
		<>
			{ enablePanels.find( ( panel ) => panel.name === 'Columns' ) && (
				<ColumnsPanel />
			) }
			{ enablePanels.find( ( panel ) => panel.name === 'Sidebars' ) && (
				<SidebarsPanel />
			) }
			{ enablePanels.find( ( panel ) => panel.name === 'Card' ) && (
				<CardPanel />
			) }
		</>
	);
};
