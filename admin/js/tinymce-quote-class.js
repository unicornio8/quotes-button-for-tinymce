(function($) {
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
			if (node.nodeName == 'SPAN' && $(node).hasClass('u8-quote-plugin')) {
				// If SPAN is already present then remove it
				editor.dom.remove(node, true);
			} else {
				// else, in means this node is not an quote, then call quotes modal dialog
				editor.windowManager.open({
					// Modal settings
					title: quoteTranslations['quote_add_button'],
					id: 'tinymce-quote-insert-dialog',
					body: [
						{
                   			type   : 'textbox',
				   			id: 'tinymce-quote-description',
				   			name   : 'quoteDescription',
				   			label  : quoteTranslations['quote_description_label']
               			},
			   			{
                   			type   : 'textbox',
				   			id: 'tinymce-quote-link',
				   			name   : 'quoteLink',
				   			label  : quoteTranslations['quote_link_label']
               			},
						{
							type   : 'colorpicker',
							id: 'tinymce-quote-color-background',
							name   : 'quoteBackgroundColor',
							label  : quoteTranslations['quote_background_color_label'],
                		},
						{
							type   : 'colorpicker',
							id: 'tinymce-quote-color-font',
							name   : 'quoteFontColor',
							label  : quoteTranslations['quote_font_color_label']
                		}
			   		],
			   		onsubmit: function(e) {
						var text = editor.selection.getContent({
							'format': 'html'
						});

						var htmlNode = $('<span class="u8-quote-plugin">' + text + '</span>');
						htmlNode.attr('data-description', e.data.quoteDescription);
						htmlNode.attr('data-link', e.data.quoteLink);
						htmlNode.attr('data-colorBackground', e.data.quoteBackgroundColor);
						htmlNode.attr('data-colorFont', e.data.quoteFontColor);

						editor.execCommand('mceReplaceContent', false, htmlNode[0].outerHTML);
						editor.windowManager.close();
						editor.windowManager.close();
					}
				});
			}
		});
	});
})(jQuery);