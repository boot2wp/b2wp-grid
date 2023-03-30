<?php
/**
 * Plugin Name:       Grid
 * Plugin URI:        https://boot2wp.com
 * Description:       Use, create, and share CSS grid layouts.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Boot2WP
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       b2wp-grid
 * Domain Path:       b2wp
 *
 * @package           b2wp
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function b2wp_grid_block_init() {
	register_block_type( __DIR__ . '/build/grid' );
}
add_action( 'init', 'b2wp_grid_block_init' );
