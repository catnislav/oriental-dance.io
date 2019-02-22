$(function(){
/* Video */
	var owl = $('.owl-carousel');
			owl.owlCarousel({
				items: 2,
				lazyLoad: true
			});
	owl.on("mousewheel", ".owl-stage", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("prev.owl.carousel", [600]);
		} else {
			owl.trigger("next.owl.carousel", [600]);
		}
		e.preventDefault();
	});
	$('.next-btn').click(function() {
		owl.trigger('next.owl.carousel', [600]);
	});
	$('.prev-btn').click(function() {
		owl.trigger('prev.owl.carousel', [600]);
	});
	$('.play').click(function(){
		var id = $(this).data('id');
		var video = '<iframe src="'+ $("#yt-" + id).attr("data-video") +'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
		$(this).fadeOut(300);
		setTimeout(function(){
			$("#video-wrapper-" + id).fadeIn(300, function(){
				$(this).html(video);
			});
		}, 300);
	});
/* Audio */
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = /android/.test(ua);
	var isAndroidDefault = isAndroid && !(/chrome/i).test(ua);
	$(".audio").mb_miniPlayer({
		width: 440,
		showTime: false,
		showRew: false,
		skin: "purple",
		swfPath: "../js/jquery.jplayer.swf",
		downloadable: true
	});
/* Photo */
	var settings = {
		gallery_theme: "tiles",
		tiles_type: "justified",
		tiles_justified_row_height: 230,
		tiles_justified_space_between: 5,
		tile_overlay_opacity: 0.5,
		lightbox_numbers_size: 20,
		lightbox_show_textpanel: false
	};
	$(function(){
		$('.open').one('click', function(){
			var id = $(this).data('id');
			$('#gallery-' + id).load("../includes/images.html #gallery-"+id+" > *", function(){
				$(this).unitegallery(settings);
			});
		});
		var hash = window.location.hash,
				hashNumb = hash.substr(hash.length - 1);
		if(window.location.hash == '#window-' + hashNumb){
			$('#gallery-' + hashNumb).load("../includes/images.html #gallery-"+hashNumb+" > *", function(){
				$(this).unitegallery(settings);
			});
		};
	});
});