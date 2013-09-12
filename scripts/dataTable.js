var RAW_AJAX_HANDLE = 0;
var COUNT_PER_PAGE = 25;
/**
 *向服务器获取原始数据,如果定义了table表示向服务器拿分页数据
 */
function getRawData(conf, page, table) {
    var isGetSubPage = typeof table=="undefined" ? false:true;
    if (!isGetSubPage && AGG.hasData()) {
        AGG.sendRequest(true);
        return ;
    }
    
    RAW_AJAX_HANDLE++;
    if(!isGetSubPage){
        var api = $("#selectForm").serialize();
        api += "&Cmd=" + conf.cmd.Cmd + "&CurrentPage=" + page + "&PageMaxCount=" + COUNT_PER_PAGE;
        jQuery.get(conf.url, api, new ajaxRawData(api, false));
    }else{
        table.api = table.api.replace(/(CurrentPage=).*?($|&)/, "$1"+page+"$2");
        jQuery.get(conf.url, table.api, new ajaxRawData(table.api, false, table));
    }
    
    /* 隐藏状态提示框  */
}

/**
 * 获取新的数据的回调函数的生成函数
 * @param {Object} isBatch 为true表示批量发送数据，false表示只请求一次数据
 * @param {Object} table 未定义表示请求新的数据，定义了表示翻页
 */
function ajaxRawData(api, isBatch, table) {
    return function(xml) {
        var doc = new RawXmlParser(xml);
        
        if (false == doc.valid) {
            if(typeof table != "undefined"){
                $('.dataTableView').remove();
                
            }
            $("#dataError").html(doc.errors());
            return;
        }
        var desc = doc.getDesc();
        if(typeof table == 'undefined'){
            if(false == isBatch){
                $('.dataTableView').remove();
            }
            table = new DataTable();
        }
        table.api = api;
        table.addPage(parseInt(desc.pages), parseInt(desc.currentPage));
        table.addTitle(desc.tableName);
        
        var head = doc.getHead();
        table.addTableHead(head);
        
        var datas = doc.getData();
        var len = datas.length;
        for (var i = 0; i < len; i++) {
            table.addTableLine(datas[i]);
        }
    }
}

function DataTable() {
    var self = this;
    tableIndex = 0;
    var maxPage = 0;
    var id = "dataTableDiv-" + tableIndex++;
    var $div = $(document.createElement("div"));
    var $title = $("<h2></h2>");
    var $error = $("<b></b>");
    var $table = $("<table></table>");
    var $pages = $("<div class='dataPage'></div>");
    this.api = '';

    $div.append($title);
    $div.append($error);
    $div.append($table);
    $div.append($pages);
    $div.attr('id', id);
    $div.addClass('dataTableView');
    $("#dataDiv").append($div);

    this.setError = function(error) {
        $error.text(error);
    }
    

    this.addTitle = function(title) {
        $title.text(title);
    };

    this.addTableHead = function(headArray) {
        try {
            var len = headArray.length;
            var head = "<tr>";
            for (var i = 0; i < len; i++) {
                head += "<th title='"+ headArray[i] +"'>" + headArray[i] + "</th>";
            }
            head += "</tr><br>";
            $table.prepend(head);
        } catch(err) {
            //参数错误
            return;
        }
    };

    this.addTableLine = function(lineArray) {
        try {
            var len = lineArray.length;
            var head = "<tr>";
            for (var i = 0; i < len; i++) {
                head += "<td title='"+ lineArray[i] +"'>" + lineArray[i] + "</td>";
            }
            head += "</tr><br>";
            $table.append(head);
        } catch(err) {
            //参数错误
            return;
        }
    }

    this.addPage = function(intPage, start) {
        try {
            maxPage = intPage;
            if ( typeof start == 'undefine') {
                start = 1;
            }
            $pages.children().remove();
            
            var pages = "<span class='dataPageItem' value='1'>First Page</span><span value='1' id='dataPrevPage'>prev</span>";
            pages += "<span class='dataPageItem dataPageSelected' value='"+start+"'>"+start + "</span>";
            
            if (intPage < 5) {
                
                for (var i = start+1; i <= intPage; i++) {
                    pages += "<span class='dataPageItem' value='" + i + "'>" + i + "</span>";
                };
            } else {
                if (intPage - start <= 4) {
                    var i = start+1;
                    while(i <= intPage){
                        pages += "<span class='dataPageItem' value='" + i + "'>" + i + "</span>";
                        i++;
                    }
                } else {
                    for (var i = start+1; i <= start+2; i++) {
                        pages += "<span class='dataPageItem' value='" + i + "'>" + i + "</span>";
                    };
                    pages += "<span value='#'>...</span>";
                    pages += "<span class='dataPageItem' value='" + intPage + "'>" + intPage + "</span>";
                }

            }
            pages += "<span id='dataNextPage' value='2'>next</span><span class='dataPageItem' value='" + intPage + "' >Last Page</span>";
            pages += "<div style='clear:both'></div>";
            $pages.append(pages);
            $(".dataPageItem").first().addClass('.dataPageItem');
            $pages.find(".dataPageItem").click(function() {
                getRawData(curChart.conf, $(this).attr('value'), self);
                $(this).parent().find(".dataPageSelected").removeClass('dataPageSelected');
                $(this).addClass('dataPageSelected');
                $(this).parent().prev('table').children().remove();
            });
            $pages.find("#dataNextPage").click(function(){
                var $select = $(this).parent().find(".dataPageSelected").first();
                var page = parseInt($select.attr('value'));
                if(page > maxPage){
                    return ;
                }
                getRawData(curChart.conf, page+1, self);
                $select.removeClass('dataPageSelected');
                $(this).parent().prev('table').children().remove();
            });
            $pages.find("#dataPrevPage").click(function(){
                var $select = $(this).parent().find(".dataPageSelected").first();
                var page = parseInt($select.attr('value'));
                if(page <= 1){
                    return ;
                }
                getRawData(curChart.conf, page-1, self);
                $select.removeClass('dataPageSelected');
                $(this).parent().prev('table').children().remove();
            });
        } catch(err) {
            return;
        }
    }

    this.show = function() {
        $("#" + id).show();
    }
}

function getPageData(obj) {

}

function clearTable(){
    $(".dataTableView").remove();
}

function dataTest() {
    t = new dataTable();
    t.addTitle("asldfga asldfba");
    t.addTableHead(['aaa', 'asdlfba', 'asldfvasdfb', 'asdblcalsdf']);
    t.addTableLine(['aaa', 'asdlfba', 'asldfvasdfb', 'asdblcalsdf']);
    t.addTableLine(['aaa', 'asdlfba', 'asldfvasdfb', 'asdblcalsdf']);
    t.addTableLine(['aaa', 'asdlfba', 'asldfvasdfb', 'asdblcalsdf']);
    t.addPage(10);
}
