var PROMO_WIDTH = 1050;
var PROMO_HEIGHT = 450;
var PROMO_PAGING_TIME = 8 * 1000;
//5s
/* 向服务器发送推荐窗口的数据请求 */
$(function() {
    var conf;
    var cmd;
    var p;
    for (p in promo_conf) {
        conf = promo_conf[p];
        cmd = conf.cmd;
        //cmd.random = Math.random();
        AJAX_HANDLE++;
        jQuery.get(conf.url, cmd, new ajaxResponseCb(p, conf.drawCb, PROMO_WIDTH, PROMO_HEIGHT, conf.name));
    }
});

var curPromo;/* 全局变量：curPromo 当前显示的突变 的JQuery对象*/
/**
 *翻页效果，obj是图表的父元素的JQuery对象
 */
function promo_move(obj) {
    if (0 == obj.length) {
        return;
    }
    
    curPromo = obj;
    if ($(".promo-item").is(":animated")) {
        return;
        $(".promo-item").stop();
    }
    if (obj.css("width") == "0px") {
        $(".pages-item").css("background", "#CCC");
        var id = obj.find(".promo-chart").attr("id") + "-page";
        $("#" + id).css("background", "#EE0000");
        obj.animate({
            width : PROMO_WIDTH + "px",
        }, 600, function() {
            obj.find('.promo-tip').fadeIn(400);
        });
        obj.siblings(".promo-item").animate({
            width : "0px",
        }, 600);
    }
}

$(function() {
    /* 动态添加推荐窗口的页码 */
    $("#promo>div").find('.promo-item').find('.promo-chart').each(function(index) {
        var id = $.trim($(this).attr("id")) + "-page";
        var node = document.createElement("span");
        node.className = "pages-item";
        node.id = id;
        $("#chart-pages").children().last().before(node);
    });

    /*默认显示最后一个图表*/
    promo_move($("#promoChartThree").parent());

    $(".promo-item").mousemove(function(e) {
        var width = $(this).width();
        var left = width / 3;
        var right = width / 3 * 2;
        if (e.clientX < left) {
            $("#next-chart").fadeOut(100);
            $("#last-chart").fadeIn(300);
        } else if (e.clientX > right) {
            $("#last-chart").fadeOut(100);
            $("#next-chart").fadeIn(300);
        } else {
            $("#next-chart").fadeOut(200);
            $("#last-chart").fadeOut(200);
        }
    });
    $("#promo").mouseleave(function() {
        $("#next-chart").fadeOut(200);
        $("#last-chart").fadeOut(200);
    });

    $(".pages-item").mouseover(function() {
        var temp = $(this).attr("id").split('-');
        temp.pop(-1);
        id = temp.join('-');
        promo_move($("#" + id).parent());
    });
    $("#next-chart, #last-chart").mouseover(function() {
        $(this).css("opacity", "1");
    }).mouseout(function() {
        $(this).css("opacity", "0.5");
    });

    /* 绑定上下翻页的事件*/
    $("#last-chart").click(function() {
        var promo = curPromo.prev(".promo-item");
        if (promo.length == 0) {
            promo = curPromo.parent().find('.promo-item').last();
        };
        promo_move(promo);
    });
    $("#next-chart").click(function() {
        var promo = curPromo.next(".promo-item");
        if (promo.length == 0) {
            promo = curPromo.parent().find(".promo-item").first();
        };
        promo_move(promo);
    });

    //实现鼠标不在推荐框中，自动翻页。如果鼠标在推荐框中，不自动翻页
    var timer;
    timer = setInterval(function() {
        $("#next-chart").trigger('click');
    }, PROMO_PAGING_TIME);
    $("#promo").mouseenter(function() {
        clearInterval(timer);
    });
    $("#promo").mouseleave(function() {
        clearInterval(timer);
        timer = setInterval(function() {
        $("#next-chart").trigger('click');
    }, PROMO_PAGING_TIME);
    });
});

function promoSetInfo(id, title, desc, name){
    var $tip = $("#"+id).next('.promo-tip');
    $tip.find('h2').text(title);
    $tip.find('b').text(desc);
    $tip.find('a').attr('href', 'dataview.html?name='+name);
}
