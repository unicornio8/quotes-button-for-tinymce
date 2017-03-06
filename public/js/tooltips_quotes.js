(function($) {
    $(document).ready(function(){
        $('.u8-quote-plugin').each(function(){
            var backgroundColor = $(this).attr('data-colorBackground') || '#000';
            var fontColor = $(this).attr('data-colorFont') || '#FFF';
            var description = $(this).attr('data-description');
            var descriptionLink = $.trim($(this).attr('data-link'));
            if (descriptionLink && descriptionLink.length > 0) {
                description = '<a href="' + descriptionLink + '" target="_blank">' + description + '</a>';
            } 

            new jQuery.Zebra_Tooltips(jQuery(this), {
                'background_color': backgroundColor,
                'color':            fontColor,
                'opacity':          .95, 
                'position':         'center',
                'content':          description
            });
        });
    });
})(jQuery);