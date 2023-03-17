import { registerPlugin } from '@wordpress/plugins';

const CustomSlotFill = () => (
    <>
    </>
);

registerPlugin('grid-slotfills', {
    render: CustomSlotFill,
    scope: 'grid-slots',
});
