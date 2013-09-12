/**
 *
 * @param  {String} msg 需要显示的信息
 * @param {function} okFunc 点击OK时的回调函数
 */
var DIALOG_WIDTH = 300;
var DIALOG_MIN_HEIGHT = 200;
function dialog(title, msg, okFunc) {
    var wheight = document.documentElement.clientHeight;
    var wwidth = document.documentElement.clientWidth;
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var iLeft = parseInt((wwidth / 2) - (DIALOG_WIDTH / 2));
    var iTop = parseInt((wheight / 2) - (DIALOG_MIN_HEIGHT / 2));
    
    var dialogDiv = document.createElement("div");
    var $dialog = $(dialogDiv);
    var headDiv = "<div class='dialogHead'>" + title + "</div>";
    var bodyDiv = "<div class='dialogBody'>" + msg + "</div>";
    var footDiv = "<div class='dialogFoot'>" + "<div class='dialogBtn dialogCancel'>Cancel</div>" + "<div class='dialogBtn dialogOk'>Ok</div>" + "<div style='clear:both'></div>" + "</div>";
    $dialog.attr("id", "dialogDiv");
    $dialog.css("left", iLeft+"px").css("top", iTop + "px");
    $dialog.append(headDiv);
    $dialog.append(bodyDiv);
    $dialog.append(footDiv);
    
    $(".dialogCancel").trigger('click');
    $("body").append($dialog);

    $(".dialogCancel").click(function() {
        $dialog.hide(400);
        $("#shade").hide();
        $dialog.remove();
    });

    $(".dialogOk").click(function() {
        $dialog.hide(400);
        $("#shade").hide();
        okFunc();
        $dialog.remove();
    });

    $dialog.show(400);
    $("#shade").show();
}
