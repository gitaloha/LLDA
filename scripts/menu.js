$(document).ready(function() {
	$("#menu ul li").hover(function() {
	    $('.submenu').hide();
	    $(this).addClass("menuHover");
		$(this).find('.menuitem').css("color", "#369");
		$(this).find('.submenu').show(200);
	}, function() {
		$(this).find('.submenu').hide();
		$(this).find('.menuitem').css("color", "#FFFFFF");
        $(this).removeClass("menuHover");
	});

	/*回到顶部*/
	$("#gotop").click(function() {
		$("html, body").animate({
			scrollTop : 0
		}, 120);
	});
	$backToTopFun = function() {
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0) ? $("#gotop").fadeIn(200) : $("#gotop").fadeOut(200);
		//IE6下的定位
		if (!window.XMLHttpRequest) {
			$backToTopEle.css("top", st + winh - 166);
		}
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() {
		$backToTopFun();
	});
});
