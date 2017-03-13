(function($, window) {
	tinymce.PluginManager.add( 'tinymce_quote_class', function( editor, url ) {
		// Add Button to Visual Editor Toolbar
		editor.addButton('tinymce_quote_class', {
			title: abbrTranslations['quote_add_button'],
			image: url + '/images/quote-icon.png',
			id: 'mce-wp-quote',
			cmd: 'tinymce_quote_modal',
			stateSelector: 'quote'
		});		

		// Get current editor selection and toggle class and aria-pressed attributes on abbr tinymce button
		editor.on('NodeChange', function(e){
			var node = editor.selection.getNode();

			if (node.nodeName == 'SPAN' && $(node).hasClass('u8-quote-plugin')) {
				$('#mce-wp-quote').addClass('mce-active');
				$('#mce-wp-quote').attr('aria-pressed', 'true');
			} else {
				$('#mce-wp-quote').removeClass('mce-active');
				$('#mce-wp-quote').attr('aria-pressed', 'false');
			}
		});

		// Called when we click the quote button
		editor.addCommand( 'tinymce_quote_modal', function() {
			// Check we have selected some text that we want to link
			var text = editor.selection.getContent({
				'format': 'html'
			});
			if ( text.length === 0 ) {
				alert( quoteTranslations['quote_alert'] );
				return;
			}
			// Check current editor selection and fire the good behavior based on the node selected
			var node = editor.selection.getNode();
			if ($(node).hasClass('u8-quote-plugin')) {
				// If class is already present then remove it
				$(node).removeClass('u8-quote-plugin');
				$(node).removeAttr('data-body');
				$(node).removeAttr('data-colorBackground');
			} else {
				var colorpickerType = 'colorpicker';
				if ( typeof $.fn.wpColorPicker === 'function' ) {
					colorpickerType = 'textbox';
				}
				var widthWindow = 500;
				var heightWindow = 350;

				if ($(window).height() < heightWindow) {
					heightWindow = $(window).height() - 40;
				}

				if ($(window).width() < widthWindow) {
					widthWindow = $(window).width() - 10;
				}
				// else, in means this node is not an quote, then call quotes modal dialog
				var windowQuotes = editor.windowManager.open({
					// Modal settings
					title: quoteTranslations['quote_add_button'],
					id: 'tinymce-quote-insert-dialog',
					width : widthWindow,
					height : heightWindow,
					body: [
						{
							type: 'container',
							label  : false,
							layout: 'stack',
							items: [
								{
									type: 'label',
									text: quoteTranslations['quote_background_color_label']
								},
								{
									type   : colorpickerType,
									id: 'tinymce-quote-color-background',
									name   : 'quoteBackgroundColor'
								},
								{
									type: 'label',
									text: quoteTranslations['quote_content_label']
								},
								{
									type   : 'textbox',
									multiline: true,
									id: 'tinymce-quote-content',
									name   : 'quoteLink',
									label  : false,
									//minHeight: 470,
									//style: 'height: 380px',
									//margin: '50 0 50 0',
									onPostRender : function() {
										tinymce.init({
											"theme": "modern",
											"skin": "lightgray",
											"language": "es",
											"formats": {
												"alignleft": [{
													"selector": "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
													"styles": {
														"textAlign": "left"
													},
													"deep": false,
													"remove": "none"
												}, {
													"selector": "img,table,dl.wp-caption",
													"classes": ["alignleft"],
													"deep": false,
													"remove": "none"
												}],
												"aligncenter": [{
													"selector": "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
													"styles": {
														"textAlign": "center"
													},
													"deep": false,
													"remove": "none"
												}, {
													"selector": "img,table,dl.wp-caption",
													"classes": ["aligncenter"],
													"deep": false,
													"remove": "none"
												}],
												"alignright": [{
													"selector": "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
													"styles": {
														"textAlign": "right"
													},
													"deep": false,
													"remove": "none"
												}, {
													"selector": "img,table,dl.wp-caption",
													"classes": ["alignright"],
													"deep": false,
													"remove": "none"
												}],
												"strikethrough": {
													"inline": "del",
													"deep": true,
													"split": true
												}
											},
											"relative_urls": false,
											"remove_script_host": false,
											"convert_urls": false,
											"browser_spellcheck": true,
											"fix_list_elements": true,
											"entities": "38,amp,60,lt,62,gt",
											"entity_encoding": "raw",
											"keep_styles": false,
											"preview_styles": "font-family font-size font-weight font-style text-decoration text-transform",
											"end_container_on_empty_block": true,
											"wpeditimage_disable_captions": false,
											"wpeditimage_html5_captions": true,
											"plugins": "charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview,wpembed",
											"wp_lang_attr": "es-ES",
											"wp_shortcut_labels": {
												"Heading 1": "access1",
												"Heading 2": "access2",
												"Heading 3": "access3",
												"Heading 4": "access4",
												"Heading 5": "access5",
												"Heading 6": "access6",
												"Paragraph": "access7",
												"Blockquote": "accessQ",
												"Underline": "metaU",
												"Strikethrough": "accessD",
												"Bold": "metaB",
												"Italic": "metaI",
												"Code": "accessX",
												"Align center": "accessC",
												"Align right": "accessR",
												"Align left": "accessL",
												"Justify": "accessJ",
												"Cut": "metaX",
												"Copy": "metaC",
												"Paste": "metaV",
												"Select all": "metaA",
												"Undo": "metaZ",
												"Redo": "metaY",
												"Bullet list": "accessU",
												"Numbered list": "accessO",
												"Insert/edit image": "accessM",
												"Insert/edit link": "metaK",
												"Remove link": "accessS",
												"Toolbar Toggle": "accessZ",
												"Insert Read More tag": "accessT",
												"Insert Page Break tag": "accessP",
												"Distraction-free writing mode": "accessW",
												"Keyboard Shortcuts": "accessH"
											},
											"external_plugins": {},
											"content_css": "http://u8.ethos.org.mx/wp-includes/css/dashicons.min.css?ver=4.7.2,http://u8.ethos.org.mx/wp-includes/js/tinymce/skins/wordpress/wp-content.css?ver=4.7.2,http://u8.ethos.org.mx/wp-content/themes/Ethos/editor-style.css, http://u8.ethos.org.mx/wp-content/plugins/aesop-story-engine/admin/assets/css/tinymce/custom-editor-style.css",
											"selector": "#tinymce-quote-content",
											"resize": false,
											"menubar": false,
											"wpautop": true,
											"indent": false,
											"toolbar1": "formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,dfw,wp_adv",
											"toolbar2": "styleselect,strikethrough,hr,forecolor,pastetext,backcolor,removeformat,charmap,outdent,indent,undo,redo,wp_help",
											"toolbar3": "",
											"toolbar4": "",
											"body_class": "content post-type-publications post-status-publish post-format-standard page-template-default locale-es-es",
											"wp_autoresize_on": false,
											"add_unload_trigger": false,
											"extended_valid_elements": 'span[*]',
											"style_formats": {
												"td_tinymce_item_1": {
													"title": "Text padding",
													"type": "td_api_tinymce_formats",
													"items": [{
														"parent_id": "td_tinymce_item_1",
														"title": "text ⇠",
														"block": "div",
														"classes": ["td-paragraph-padding-0"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom0",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_tinymce_item_1",
														"title": "⇢ text",
														"block": "div",
														"classes": ["td-paragraph-padding-4"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom1",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_tinymce_item_1",
														"title": "⇢ text ⇠",
														"block": "div",
														"classes": ["td-paragraph-padding-1"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom2",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_tinymce_item_1",
														"title": "⇢ text ⇠⇠",
														"block": "div",
														"classes": ["td-paragraph-padding-3"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom3",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_tinymce_item_1",
														"title": "⇢⇢ text ⇠",
														"block": "div",
														"classes": ["td-paragraph-padding-6"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom4",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_tinymce_item_1",
														"title": "⇢⇢ text ⇠⇠",
														"block": "div",
														"classes": ["td-paragraph-padding-2"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom5",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_tinymce_item_1",
														"title": "⇢⇢⇢ text ⇠⇠⇠",
														"block": "div",
														"classes": ["td-paragraph-padding-5"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom6",
														"deep": true,
														"split": true
													}]
												},
												"td_tinymce_item_3": {
													"title": "Arrow list",
													"selector": "ul",
													"classes": ["td-arrow-list"],
													"type": "td_api_tinymce_formats",
													"name": "custom7",
													"deep": false,
													"remove": "none"
												},
												"td_blockquote": {
													"title": "Quotes",
													"type": "td_api_tinymce_formats",
													"items": [{
														"parent_id": "td_blockquote",
														"title": "Quote left",
														"block": "blockquote",
														"classes": ["td_quote", "td_quote_left"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom8",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Quote right",
														"block": "blockquote",
														"classes": ["td_quote", "td_quote_right"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom9",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Quote box center",
														"block": "blockquote",
														"classes": ["td_quote_box", "td_box_center"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom10",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Quote box left",
														"block": "blockquote",
														"classes": ["td_quote_box", "td_box_left"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom11",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Quote box right",
														"block": "blockquote",
														"classes": ["td_quote_box", "td_box_right"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom12",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Pull quote center",
														"block": "blockquote",
														"classes": ["td_pull_quote", "td_pull_center"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom13",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Pull quote left",
														"block": "blockquote",
														"classes": ["td_pull_quote", "td_pull_left"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom14",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_blockquote",
														"title": "Pull quote right",
														"block": "blockquote",
														"classes": ["td_pull_quote", "td_pull_right"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom15",
														"deep": true,
														"split": true
													}]
												},
												"td_text_columns": {
													"title": "Text columns",
													"type": "td_api_tinymce_formats",
													"items": [{
														"parent_id": "td_text_columns",
														"title": "two columns",
														"block": "div",
														"classes": ["td_text_columns_two_cols"],
														"wrapper": true,
														"type": "td_api_tinymce_formats",
														"name": "custom16",
														"deep": true,
														"split": true
													}]
												},
												"td_dropcap": {
													"title": "Dropcaps",
													"type": "td_api_tinymce_formats",
													"items": [{
														"parent_id": "td_dropcap",
														"title": "Box",
														"classes": ["dropcap"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom17",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_dropcap",
														"title": "Circle",
														"classes": ["dropcap", "dropcap1"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom18",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_dropcap",
														"title": "Regular",
														"classes": ["dropcap", "dropcap2"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom19",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_dropcap",
														"title": "Bold",
														"classes": ["dropcap", "dropcap3"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom20",
														"deep": true,
														"split": true
													}]
												},
												"td_text_highlight": {
													"title": "Text highlighting",
													"type": "td_api_tinymce_formats",
													"items": [{
														"parent_id": "td_text_highlight",
														"title": "Black censured",
														"classes": ["td_text_highlight_0"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom21",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_text_highlight",
														"title": "Red marker",
														"classes": ["td_text_highlight_marker_red", "td_text_highlight_marker"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom22",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_text_highlight",
														"title": "Blue marker",
														"classes": ["td_text_highlight_marker_blue", "td_text_highlight_marker"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom23",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_text_highlight",
														"title": "Green marker",
														"classes": ["td_text_highlight_marker_green", "td_text_highlight_marker"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom24",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_text_highlight",
														"title": "Yellow marker",
														"classes": ["td_text_highlight_marker_yellow", "td_text_highlight_marker"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom25",
														"deep": true,
														"split": true
													}, {
														"parent_id": "td_text_highlight",
														"title": "Pink marker",
														"classes": ["td_text_highlight_marker_pink", "td_text_highlight_marker"],
														"inline": "span",
														"type": "td_api_tinymce_formats",
														"name": "custom26",
														"deep": true,
														"split": true
													}]
												},
												"td_clear_elements": {
													"title": "Clear element",
													"selector": "a,p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,code,blockquote",
													"styles": {
														"clear": "both"
													},
													"type": "td_api_tinymce_formats",
													"name": "custom27",
													"deep": false,
													"remove": "none"
												}
											}
										});
									}
								}
							]
						}
			   		],
			   		onsubmit: function(e) {
						var text = editor.selection.getContent({
							'format': 'html'
						});

						var tmpHMTL = tinyMCE.get('tinymce-quote-content').getContent();

						if (tmpHMTL && tmpHMTL.length > 0) {
							tmpHMTL = tmpHMTL.toString().replace(/"/g, "'");
						}

						//var htmlNode = $('<span class="u8-quote-plugin">' + text + '</span>');
						var htmlNode = $(text);
						htmlNode.addClass('u8-quote-plugin');
						htmlNode.attr('data-body', tmpHMTL);
						htmlNode.attr('data-colorBackground', e.data.quoteBackgroundColor);

						editor.execCommand('mceReplaceContent', false, htmlNode[0].outerHTML);
						editor.windowManager.close();
						editor.windowManager.close();
					}
				});

				windowQuotes.on('open', function(e){
					if ( typeof $.fn.wpColorPicker === 'function' ) {
						$('#tinymce-quote-color-background').wpColorPicker();
					}
				});

				windowQuotes.on('close', function(e){
					tinymce.remove('#tinymce-quote-content');
				});
			}
		});
	});
})(jQuery, window);