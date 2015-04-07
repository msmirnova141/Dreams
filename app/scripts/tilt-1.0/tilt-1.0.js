(function($) {
	$.fn.tilt = function(params) {
		items = this;
		
		params = $.extend( {sensitivity: 1}, params);
		
		ax = ay = 0;
		
		window.addEventListener('devicemotion', function (e) {
			ax = e.accelerationIncludingGravity.x * params.sensitivity;
			ay = -e.accelerationIncludingGravity.y * params.sensitivity;
			
			if(ax > 0) {
				ax -= params.sensitivity;
				if(ax < 0) ax = 0;
			} else if(ax < 0) {
				ax += params.sensitivity;
				if(ax > 0) ax = 0;
			}
			
		}, false);
		
		mainLoop = setInterval("moveMe()");
		
		moveMe = function() {
			$(items).each(function() {
				scrollPos = $(this).scrollLeft() + ax;
				$(this).scrollLeft(scrollPos);
			});
		}
	}
})(jQuery);