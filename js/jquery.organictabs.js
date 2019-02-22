(function($) {

    $.organicTabs = function(el, options) {
    
        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".tabs-navigation");
                
        base.init = function() {
        
            base.options = $.extend({},$.organicTabs.defaultOptions, options);
            
            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            }); 
            
            base.$nav.delegate("li > a", "click", function(e) {
                
                // Figure out current list via CSS class
                    var curList = base.$el.find("a.current");

                // List moving to
                    var $newList = $(this),
                    
                // Figure out ID of new list
                    listID = $newList.attr("href").substring(1),
                
                // Set outer wrapper height to (static) height of current inner list
                    $allListWrap = base.$el.find(".tabs-wrapper");

                    curListHeight = $allListWrap.height();
                    $allListWrap.height(curListHeight);

                    curList = (curList.attr("href") == undefined) ? listID : curList.attr("href").substring(1);

                                        
                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
                                            
                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                        
                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);
                        
                        // Adjust outer wrapper to fit new list snuggly
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });
                        
                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".tabs-navigation li a").removeClass("current");
                        $newList.addClass("current");
                            
                    });
                    
                }else if((listID == curList) && ( base.$el.find(":animated").length == 0)) {
                    if(base.$el.find("#"+curList).is(":visible")) {
                        
                        e.preventDefault();

                        base.$el.find("#"+curList).fadeOut(base.options.speed, function(){
                            $allListWrap.animate({
                                height: 0
                            });
                            base.$el.find(".tabs-navigation li a").removeClass("current");
                        });
                    }else {
                        base.$el.find("#"+curList).fadeIn(base.options.speed);
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });
                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".tabs-navigation li a").removeClass("current");
                        $newList.addClass("current");
                    }
                }
                
                // Don't behave like a regular link
                // Stop propagation and bubbling
                // return false;
            });
            
        };
        base.init();
    };
    
    $.organicTabs.defaultOptions = {
        "speed": 600
    };
    
    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };

})(jQuery);