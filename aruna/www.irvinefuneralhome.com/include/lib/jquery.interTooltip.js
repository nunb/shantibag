// JavaScript Document
// @author Scott Gibson
// Interactive Tooltip jQuery Plugin

(function($) {
	$.fn.interTooltip = function(user_options) {
		var CSSFileName = "jquery.interTooltip.css";
		
		var options = {
			show_on : "click",
			hide_on : "mouseleave",
			html: "I'm a tooltip!"
		}
		
		if(!$.isEmptyObject(user_options))
			$.extend(options,user_options);		
		
		// If style sheet is not already loaded, load it now.
		/*if($("link[href=" + CSSFileName + "]").size() === 0) {		
			var oStyle = document.createElement("link");
			oStyle.href = CSSFileName;
			oStyle.media = "screen";
			oStyle.rel = "stylesheet";
			$("head").append(oStyle);
		}*/
		
		// Hide tooltips when the document is clicked.
		$(document).click(function() {
			$(".interTooltip-tooltip").trigger(options['hide_on']);
		});
		
		$(this).each(function() {
			this.oTip = {};						
			
			$(this).addClass("interTooltip-trigger-element");						
												
			$(this).bind(options['show_on'],function(e) {
				e.stopImmediatePropagation();
				
				// Hide existing open tooltips.
				$(".interTooltip-tooltip").trigger(options['hide_on']);
				
				var offset = $(this).position();
				
				if(!$.isEmptyObject(this.oTip)) {
					$(this).after(this.oTip);
					$(this.oTip).fadeIn("fast");
				}
				else {
					this.oTip = document.createElement("div");
					
					// Prevent tooltip click event from bubbling up to the document.
					$(this.oTip).click(function(e) {
						e.stopImmediatePropagation();
					});
					
					$(this.oTip).addClass("interTooltip-tooltip");
					$(this.oTip).css({
						left: offset.left + 10 + "px",
						top: offset.top + 10 + "px"
					});
					
					this.oTip.id = "tooltip";
					this.oTip.innerHTML = options['html'];	
					
					$(this.oTip).hide();				
					$(this).after(this.oTip);
					$(this.oTip).fadeIn("fast");
					
					$(this.oTip).bind(options['hide_on'],function() {
						$(this).fadeOut("fast",function() {
							$(this).detach();
						});
					});
				}
			});						
		});
	}
})(jQuery);