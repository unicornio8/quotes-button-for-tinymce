(function($) {
    $(document).ready(function(){
        $('.u8-quote-plugin').each(function(){
            var backgroundColor = $(this).attr('data-colorBackground') || '#000';
            var description = $(this).attr('data-body');

            new jQuery.Zebra_Tooltips(jQuery(this), {
                'background_color': backgroundColor,
                'opacity':          .95, 
                'position':         'center',
                'content':          description
            });
        });
    });
})(jQuery);