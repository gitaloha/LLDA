var AGG = new Aggregate();
/**
 *dataPolymerize 弹出选择框，供用户选择数据聚合项
 * @param {Object} title
 * @param {Object} options
 */
function dataPolymerize(optionId, title, options, name) {
    var select = "<div class='optionalBox'>";
    select += "<h2 id='optionTitle'>Options</h2>";
    var len = options.length;
    for (var i = 0; i < len; i++) {
        select += "<span class='optionalItem' onclick='optionItemclk(this)'" + " value='" + options[i].value + "'>" + options[i].name + "</span>";
    };
    select += "<div style='clear:both;'></div></div>";

    //打开对话框
    dialog(title, select, function() {
        //点击ok按钮之后调用此函数
        //添加到左侧选择栏
        var div = document.createElement("div");
        var $div = $(div);
        var head = "<div class='aggItemHead'>" + title + "</div>";
        var optionList = "<div class='aggOptional'>";
        var selecteds = [];
        $(".selectedItem").each(function(index) {
            optionList += "<span class='aggItem' value='" + $(this).attr('value') + "'>" + $(this).text() + "</span>";
            selecteds.push({
                name : $(this).text(),
                value : $(this).attr('value')
            });
        });
        optionList += "</div>";

        optionId = "agg" + optionId;
        $div.attr('id', optionId);
        $div.attr('class', 'aggContainer');
        $div.append(head);
        $div.append(optionList);
        if ($("#" + optionId).length != 0) {
            $("#" + optionId).remove();
        };
        $('.aggContainer').remove();
        $("#aggDiv").prepend($div).show();
        $("#polymerizeSelected").next('.selectShade').addClass('selectShadeShow');
        //发送数据请求
        showStatus();
        AGG.addSelected(name, selecteds);
        AGG.sendRequest();
        if($("#showData").attr('attr') == 'show'){
            /*清除表格数据*/
            $('.dataTableView').remove();
            AGG.sendRequest(true);
        }
    });
}



/**
 *数据聚合对话框的可选项目点击事件函数
 */
function optionItemclk(obj) {
    var $obj = $(obj);
    var classes = $obj.attr('class').split(' ');
    if (classes.length > 1) {
        $obj.removeClass('selectedItem');
    } else {
        $(obj).addClass('selectedItem');
    }
};

/**
 *数据聚合对象，当弹出聚合对话框的时候选择ok时会添加数据，并且发送请求
 */
function Aggregate() {
    //保存已经选择的选项
    var selected = {};
    var isSending = false;
    var recvDatas = [];
    var dataValueLen = 0;
    var respectRecvs = 0;
    var hasRecvs = 0;
    var colorIndex = 1;
    var hasData = false;

    function clearData() {
        selected = {};
        isSending = false;
        recvDatas = [];
        respectRecvs = 0;
        dataValueLen = 0;
        hasRecvs = 0;
        colorIndex = 1;
        hasData = false;
    };
    this.clear = clearData;

    this.hasData = function() {
        return hasData;
    }

    this.addSelected = function(name, options) {
        clearData();
        hasData = true;
        selected.name = name;
        selected.options = options;
    };

    /**
     *isData 为true时请求数据
     */
    this.sendRequest = function(isData) {
        var url = curChart.conf.url;
        var api = $("#selectForm").serialize();
        var options = selected.options;
        if (isSending && false == isData) {
            return;
        } else {
            isSending = true;
        }
        recvDatas = [];
        respectRecvs = options.length;
        var r = new RegExp("(" + selected.name + "=).*?(&|$)");
        var newApi;
        api += "&Cmd=" + curChart.conf.cmd.Cmd;
        clearTable();
        for (var i = 0; i < respectRecvs; i++) {
            newApi = api.replace(r, "$1" + options[i].value + "$2");
            
            if(typeof isData != "undefined" && true == isData){
                newApi += "&CurrentPage=1&PageMaxCount=" + COUNT_PER_PAGE;
                jQuery.get(url, newApi, new ajaxRawData(newApi, true));
            }else{
                jQuery.get(url, newApi, new ajaxResponseCb("chartWindow", drawCb, SUB_PAGE_WIDTH, SUB_PAGE_HEIGHT, options[i].name,AJAX_HANDLE));
            }
        }
    };

    function drawCb(setting, charName) {
        var ret = true;
        switch(charName) {
            case CHARTNAME.singleLine :
                var data = setting.data[0];
                data.name = setting.myName;
                recvDatas.push(setting.data[0]);
                break;

            case CHARTNAME.singlePie :
            case CHARTNAME.singleBar :
                var data = {
                    name : setting.myName,
                    color : getColor(colorIndex++)
                };
                var value = [];
                var dataLen = setting.data.length;
                for (var i = 0; i < dataLen; i++) {
                    value.push(setting.data[i].value);
                }
                data.value = value;
                recvDatas.push(setting.data[0]);
                break;

            default:
                ret = false;
        }
        hasRecvs++;
        if (hasRecvs == respectRecvs) {
            isSending = false;
            hasRecvs = 0;
            var chartSetting = {};
            extend(chartSetting, setting);
            chartSetting.data = recvDatas;
            curChart.setSetting(chartSetting);
            drawLineBasic(chartSetting);
            hideStatus();
        }
    }
   
}
