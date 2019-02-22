$(function(){
/* Tabs */
	$("#tabs").organicTabs();
	$(window.location.hash + "-tab").click();
	$(window).bind('hashchange', function() {
			$(window.location.hash + "-tab").click();
	});
/* Scroll-top */
	$('.tab').click(function() {
		var top = $("#tabs").offset().top + $(".page-wrapper").scrollTop();
		$('.page-wrapper').animate({scrollTop: top}, 1000);
	});
});