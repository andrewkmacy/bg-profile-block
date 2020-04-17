<?php

/**
 * Plugin Name: BG Better Blocks
 * Plugin URI: https://github.com/WordPress/gutenberg-examples
 * Description: A simple plugin that adds a profile block for the Gutenberg page editor.
 * Version: 1.0.2
 * Author: the Gutenberg Team
 *
 * @package bg-better-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'bg_profile_block_load_textdomain' );

function bg_profile_block_load_textdomain() {
	load_plugin_textdomain( 'bg-better-blocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function bg_profile_block_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'bg-profile-block',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);

	wp_register_style(
		'bg-profile-block',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'bg-better-blocks/bg-profile-block', array(
		'style' => 'bg-profile-block',
		'editor_script' => 'bg-profile-block',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'bg-profile-block', 'bg-better-blocks' );
  }

}
add_action( 'init', 'bg_profile_block_register_block' );
