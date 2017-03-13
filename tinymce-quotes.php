<?php

/**
 * @link              http://github.com/unicornio8/quotes-button-for-tinymce
 * @since             1.0.0
 * @package           Quote button for TinyMCE
 *
 * @wordpress-plugin
 * Plugin Name:       Quote button for TinyMCE
 * Plugin URI:        http://github.com/unicornio8/quotes-button-for-tinymce
 * Description:       Provides Quotes button for WordPress TinyMCE visual editor.
 * Version:           1.0.0
 * Author:            Rafael Martínez
 * Author URI:        http://github.com/unicornio8
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       quotes-button-for-tinymce
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class TinyMCE_Quotes {
	/**
	* Plugin constructor.
	*/
	function __construct() {
		if ( is_admin() ) {
			add_action( 'init', array(  $this, 'setup_tinymce_quote' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_styles_tinymce_quote' ) );
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_tinymce_quote' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'add_styles_tinymce_quote' ) );
		}
	}
	/**
	* Add tooltip script
	* 
	*/
	function add_scripts_tinymce_quote()
	{
		// Register the script like this for a plugin:
		wp_register_script( 'quotes-tooltips-lib-script', plugins_url( '/public/js/tooltips.js', __FILE__ ) );
		// For either a plugin or a theme, you can then enqueue the script:
		wp_enqueue_script( 'quotes-tooltips-lib-script' );
		// Register the script like this for a plugin:
		wp_register_script( 'quotes-tooltips-script', plugins_url( '/public/js/tooltips_quotes.js', __FILE__ ) );
		// For either a plugin or a theme, you can then enqueue the script:
		wp_enqueue_script( 'quotes-tooltips-script' );
	}
	/**
	* Add tooltip style
	* 
	*/
	function add_styles_tinymce_quote()
	{
		wp_enqueue_style('quotes-tooltips-style', plugins_url( '/public/css/tooltips.css' , __FILE__ ));
	}
	/**
	* Add tooltip style
	* 
	*/
	function add_admin_styles_tinymce_quote()
	{
		wp_enqueue_style('quotes-admin-style', plugins_url( '/admin/css/tinymce-quote-class.css' , __FILE__ ));
	}
	/**
	* Check if the current user can edit Posts or Pages, and is using the Visual Editor
	* If so, add some filters
	*/
	function setup_tinymce_quote() {
		// Check if the logged in WordPress User can edit Posts or Pages
		// If not, don't register
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
        	return;
		}

		// Check if the logged in WordPress User has the Visual Editor enabled
		// If not, don't register
		if ( get_user_option( 'rich_editing' ) !== 'true' ) {
			return;
		}
		// Setup filters
		add_action( 'plugins_loaded', 'load_languages_tinymce_quote' );
		add_action( 'before_wp_tiny_mce', array( &$this, 'translate_tinymce_quote' ) );
		add_filter( 'mce_external_plugins', array( &$this, 'add_tinymce_quote' ) );
		add_filter( 'mce_buttons_2', array( &$this, 'add_tinymce_quote_toolbar_button' ) );		
	}	

	/**
	* Adds the plugin to the TinyMCE / Visual Editor instance
	*	
	* @param array $plugin_array Array of registered TinyMCE Plugins
	* @return array Modified array of registered TinyMCE Plugins
	*/
	function add_tinymce_quote( $plugin_array ) {
		$plugin_array['tinymce_quote_class'] = plugin_dir_url( __FILE__ ) . 'admin/js/tinymce-quote-class.js';
		return $plugin_array;
	}

	/**
	* Plugin's internationalization 
	*	
	* First load translation files
	* Then add translation strings to a javascript variable
	*/
	function load_languages_tinymce_quote() {
	    load_plugin_textdomain( 'quotes-button-for-tinymce', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' ); 
	}
	// Adding i18n tinymce strings
	function translate_tinymce_quote() {
		$translations = json_encode(
			array( 
				'quote_add_button' 				=> __('Quote', 'quotes-button-for-tinymce'),
				'quote_insert_button' 			=> __('Insert quote', 'quotes-button-for-tinymce'),
				'quote_delete_button' 			=> __('Delete quote', 'quotes-button-for-tinymce'),
				'quote_title_label' 			=> __('Quotes Plugin', 'quotes-button-for-tinymce'),
				'quote_content_label' 			=> __('Content for tooltip', 'quotes-button-for-tinymce'),
				'quote_background_color_label'	=> __('Select color background for tooltip', 'quotes-button-for-tinymce'),
				'quote_alert' 					=> __('Please select some text first', 'quotes-button-for-tinymce')
			)
		);
		echo '<script>var quoteTranslations = ' . $translations . ';</script>';
	}

	/**
	* Adds a button to the TinyMCE / Visual Editor which the user can click
	* to insert the quote node tag.
	*
	* @param array $buttons Array of registered TinyMCE Buttons
	* @return array Modified array of registered TinyMCE Buttons
	*/
	function add_tinymce_quote_toolbar_button( $buttons ) {
		array_push( $buttons, 'tinymce_quote_class' );
		return $buttons;
	}
}
$TinyMCE_Quotes = new TinyMCE_Quotes;