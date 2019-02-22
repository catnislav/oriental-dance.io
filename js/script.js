$(window).on('load', function(){
/* Href */
	var href = window.location.href,
			hrefSplit = href.split('/'),
			hrefName = hrefSplit[hrefSplit.length - 1],
			hrefSplitName = hrefName.split('#'),
			hrefNow = hrefSplitName[0];
	// $('.ru').attr('href', '../' + hrefNow);
	$('.ru').attr('href', '../ru/' + hrefNow);
	$('.en').attr('href', '../en/' + hrefNow);
	var hrefArr = [0, 'index.html', 'action.html', 'study.html', 'gallery.html'],
			numbArr = $.inArray(hrefNow, hrefArr);
	if(numbArr === -1) {
		$('nav li:nth-child(1) a').addClass('active');
	} else {
		$('nav li:nth-child('+numbArr+') a').addClass('active');
	};

/* Hash */
	var hash = window.location.hash,
			hashNumb = hash.substr(hash.length - 1);
	if(window.location.hash == '#window-' + hashNumb){
		$('#window-' + hashNumb).fadeIn(300);
		$(document).find('.overlay').attr('tabindex',1).focus();
		$(document).find('.overlay .close').attr('tabindex',2);
	} else {
		$(document).find('.page-wrapper').attr('tabindex',0).focus();
	};
});

$(function(){
	$('.active').click(function(e){
		e.preventDefault();
	});
/* Apng-canvas */
	APNG.ifNeeded().then(function(){
		$('#head-back').find('img').each(function(){
			APNG.animateImage(this);
		});
	});
/* Modal */
	$('.open').click(function(){
		var modal = $(this).attr('href').substring(1);
		$('#' + modal).fadeIn(300);
		$(document).find('.overlay').attr('tabindex',1).focus();
		$(document).find('.overlay .close').attr('tabindex',2);
	});
	$('.close, .overlay').click(function(e) {
		e.preventDefault();
		$('.overlay').fadeOut(300);
		$(document).find('.page-wrapper').focus();
	});
	$('.modal').click(function(e) {
		e.stopImmediatePropagation();
	});
	$(document).keydown(function(e){
		if(e.keyCode === 27){
			if($('.ug-lightbox').is(':visible')){
			} else{
				$('.overlay').fadeOut(300);
				$(document).find('.page-wrapper').focus();
			};
		};
	});
/* Form-ajax */
	$('form').submit(function(e){
		e.preventDefault();
		var form = $(this);
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize(),
			beforeSend: function(){
				$('#result').html('<img src="../images/gallery/unitegallery/preloader.gif" id="preloader">');
			},
			success: function(data){
				$('#result').fadeOut(300, function(){
					$(this).html(data);
					$('#result').fadeIn(300, function(){
						var result = $('#result').html().toLowerCase();
						if(~(result.indexOf('отправлено')) || ~(result.indexOf('sent')) || ~(result.indexOf('odeslána'))){
							$('form')[0].reset();
						}
					});
					setTimeout(function(){
						$('#result').fadeOut(300,function(){
							$(this).empty();
							$(this).css({'display':'block'});
						});
					}, 3000);
				});
			}
		});
	});
});