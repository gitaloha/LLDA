/* 支持画图的种类 , 从XML解析得到*/
var CHARTYPE = {
    singleLine : 1,
    multiLines : 2,
    singlePie : 3,
    multiPies : 4,
    singleBar : 5,
    multiBars : 6,
};

function XmlParser(xmlDoc, theme) {
    /* xml的DOM对象转换为JQuery的对象 */
    this.xml = $(xmlDoc);
    /* theme:颜色主题*/
    this.theme = theme;

    /* colorIndex:保存一个随机的颜色索引*/
    this.colorIndex = Math.round(Math.random() * 10);

    
    this.valid = ('0' == this.xml.find('errorCode').text() );

    /*error：获取错误信息描述*/
    this.errors = function() {
        /* valid:判断对象是否可用 */
        if ('0' == this.xml.find('errorCode').text()) {
            return "success";
        } else {
            var err = "";
            err += "errorMessage : <b>" + this.xml.find("errorMessage").text() + "</b><br>";
            err += "errorPrompt : <b>" + this.xml.find("errorPrompt").text() + "</b><br>";
            err += "errorExtend : <b>" + this.xml.find("errorExtend").text() + "</b><br>";
            return err;
        }
    };

    /*获取图表类型   */
    this.coordType = function() {
        if (!this.valid)
            return null;
        return this.xml.find("coordType").text();
    }
    /*返回图表类型名:lineChart, signelPie, multiPies, signelBar*/
    this.chartType = function() {
        if (!this.valid)
            return null;
        var ch = this.xml.find("coordType").text();
        var type = "";

        if (ch == 1) {
            /* 如果是折线图 */
            var num = this.xml.find("coordLineCount").text();
            if (num == 1) {
                type = CHARTYPE.singleLine;
            } else {
                type = CHARTYPE.multiLines;
            }
        } else if (ch == 2) {
            /* 如果是饼图则区分单一饼图和多饼图 */
            var num = this.xml.find("pieCount").text();
            if (num == 1) {
                type = CHARTYPE.singlePie;
            } else {
                type = CHARTYPE.multiPies;

            }
        } else {
            var num = this.xml.find("coordLineCount").text();
            if (num == 1) {
                /* 如果是柱状图,区分单一柱状图和多簇柱状图 */
                type = CHARTYPE.singleBar;
            } else {
                type = CHARTYPE.multiBars;
            }

        }
        return type;
    }
    /*获取坐标系信息*/
    this.coordInfo = function() {
        if (!this.valid)
            return null;
        if (this.coordType() == 2) {
            info = {
                coordtype : this.xml.find("coordType").text(),
                coordname : this.xml.find("coordName").text(),
                piecount : this.xml.find("pieCount").text(),
                coordDesc : this.xml.find("coordDesc").text(),
            };
        } else {
            info = {
                lineCount : this.xml.find("coordLineCount").text(),
                coordtype : this.xml.find("coordType").text(),
                coordname : this.xml.find("coordName").text(),
                coordSubName : this.xml.find("coordSubName").text(),
                coordDesc : this.xml.find("coordDesc").text(),
                XUnit : this.xml.find("coordXUnit").text(),
                YUnit : this.xml.find("coordYUnit").text(),
                xInterval : this.xml.find("coordXInterVal").text(),
                yInterval : this.xml.find("coordYInterVal").text(),
                xMax : this.xml.find("coordXMax").text(),
                yMax : this.xml.find("coordYMax").text(),
                xMin : this.xml.find("coordXMin").text(),
                yMin : this.xml.find("coordYMin").text(),
            };
        }
        return info;
    };

    /*获取标签-饼图*/
    this.labels = function(name) {
        if (!this.valid)
            return null;
        if ( typeof name == "undefined")
            name = "pie";
        var labels = new Array();
        this.xml.find(name).each(function(index) {
            elem = {
                pieName : $(this).find("pieName").text(),
                sectorCount : $(this).find("sectorCount").text(),
            };
            labels.push(elem);
        });
        return labels;
    };

    /*获取标签-折线图*/
    this.lineLabels = function(name) {
        if (!this.valid)
            return null;
        if ( typeof name == "undefined") {
            name = "x";
        }
        var label = new Array();
        var Point = new Array();
        $(this.xml.find("lineData")[0]).find("Point").each(function(index) {
            label.push($(this).find("x").text());
        });
        return label;
    };

    /**
     *返回饼图的数据
     */
    this.data = function(label) {
        if (!this.valid)
            return null;
        if ( typeof label == "undefined") {
            label = "sectorValue";
        }
        var d = new Array();
        var i = Math.round(Math.random() * 10);
        var j = 0;
        indexOfColor = this.colorIndex;
        $(this.xml.find("pie")[0]).find("sector").each(function(index) {
            elem = {
                name : $(this).find("sectorTag").text(),
                value : parseInt($(this).find("sectorValue").text()),
                color : getColor(i + index),
            };
            d.push(elem);
        });
        return d;

    };
    this.barData = function() {
        if (!this.valid)
            return null;
        var d = new Array();
        var i = Math.round(Math.random());
        indexOfColor = this.colorIndex;
        $(this.xml.find("lineData")).find("Point").each(function(index) {
            elem = {
                name : $(this).find("x").text(),
                value : parseInt($(this).find("y").text()),
                color : getColor(i + index),
            };
            d.push(elem);
        });
        return d;
    };
    /*获取数据-折线图*/
    this.lineData = function(label) {
        if (!this.valid)
            return null;
        if ( typeof label == "undefined") {
            label = "y";
        };
        var d = new Array();
        var i = Math.round(Math.random() * 10);

        indexOfColor = this.colorIndex;
        var i = Math.round(Math.random() * 10);
        var j = 0;
        this.xml.find("lineData").each(function(index) {
            var y = new Array();
            $(this).find("Point").each(function(index) {
                y.push($(this).find("y").text());
            });
            elem = {
                name : $(this).find("lineTag").text(),
                value : y,
                color : getColor(i + index),
                line_width : 1

            };
            d.push(elem);
        });
        return d;
    }
};

function RawXmlParser(xmlDoc) {
    var xml = $(xmlDoc);

    /* valid返回xml是否可用 */
    var isData = false;
    try{
        var temp = xml.find('tableDesc').toArray();
        if(1 == temp.length){
            isData = true;
            
        }
    }catch(err){
        isData = false;
    }
    this.valid = ('0' == xml.find('errorCode').text() && isData);

    /*error：获取错误信息描述*/
    this.errors = function() {
        /* valid:判断对象是否可用 */
        if ('0' == xml.find('errorCode').text() && isData) {
            return "success";
        } else {
            var err = "";
            if(false == isData){
                err += "errMessage:<b>no table datas</b>";
            }else{
                err += "errorMessage : <b>" + xml.find("errorMessage").text() + "</b><br>";
                err += "errorPrompt : <b>" + xml.find("errorPrompt").text() + "</b><br>";
                err += "errorExtend : <b>" + xml.find("errorExtend").text() + "</b><br>";
            }
            return err;
        }
    };

    this.getDesc = function() {
        try {
            var desc = {};
            var $tblDesc = xml.find("tableDesc").first();
            desc.tableName = $tblDesc.find('tableName').text();
            desc.pages = $tblDesc.find('pages').text();
            desc.currentPage = $tblDesc.find('currentPage').text();
            desc.pageMaxCount = $tblDesc.find('pageMaxCount').text();
            desc.columnCount = $tblDesc.find('columnCount').text();
            desc.rowCount = $tblDesc.find('rowCount').text();
            return desc;
        } catch(err) {
            //xml 格式错误或者函数错误
            alert('error format xml file');
        }
    }
    
    this.getHead = function(){
        try{
            var $column = xml.find('columns').first();
            var head = [];
            $column.find('columnTag').each(function(index) {
                head.push($(this).text())
            });
            return head;
        }catch(err){
            alert('error format xml file');
        }
    }
    
    this.getData = function(){
        try{
            var $rows = xml.find('rows').first();
            var rowDatas = [];
            var elem = [];
            $rows.find('row').each(function(index) {
                elem = [];
                $(this).find('rowData').each(function(index) {
                    elem.push($(this).text());
                });
                rowDatas.push(elem);
            });
            return rowDatas;
        }catch(err){
            alert('error format xml file');
        }
    }
}
