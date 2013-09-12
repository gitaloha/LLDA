
/**
 *百度分享的全局的配置变量 
 */
var bds_config = {};
/**
 *下载计数 
 */
var downloadIndex = 0;
$(function() {
    /* 导出图片 */
    $("#exportBtn").click(function() {
        try {
            var url = getPicUrl();
            url = url.replace(/png|jpeg|bmp|gif/, 'octet-stream');
            var dl = $('#downloadImage')[0];
            dl.href = url;
            var date = new Date();
            dl.download = "LLDA_chart_" + date.getTime() + ".png";
            dl.click();
        } catch(err) {
            alert('error');
        }
    });

    var windowParameters = 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no';

    /**
     * 
     */
    if(null != document.getElementById('bdshell_js')){
        document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + 
                                                Math.ceil(new Date() / 3600000);
    }
    
     
});



/**
 *分享配置 ,采用百度的一键分享http://share.baidu.com/
 */
function Share(){
    this.setText = function(text){
        bds_config['bdText'] = "#LLDA#"+text;
    }
    
    /**
     *todo:定义分享图片，因为图片在前端生成，所以，目前还无法拿到图片的url。所以这个接口还没有使用 
     */
    this.setPic = function(url){
        bds_config['bdPic'] = url;
    }
}
/**
 *分享的全局变量 
 */
var share = new Share();

function getDesc() {
    return $.trim($("#Info-detail").text());
}

function getPicUrl() {
    try {
        var canvas = $('#chartWindow').find('canvas')[0];
        var url = canvas.toDataURL('png');
        return $.trim(url);
    } catch(err) {
        return "error";
    }
}

function getUrl(){
    return $.trim(window.location.href);
}
