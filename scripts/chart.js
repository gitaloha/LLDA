/**
 * 子对象继承父对象的方法和属性
 * @param {Object} child
 * @param {Object} parent
 * @param boolean override 为真表示父对象的属性覆盖子对象的属性
 */
function extend(child, parent, override) {
    var p;
    for (p in parent) {
        if (!child.hasOwnProperty(p) || override) {
            child[p] = parent[p];
        } else if ( typeof child[p] == "object" && typeof parent[p] == "object") {
            extend(child[p], parent[p]);
        }
        ;
    }
}

var color = {
    normal : ['#CC3333', '#003399', '#666666', '#CC9933', '#FF6600', '#006633', '#CC3366', '#663300', '#339999', '#6666CC', '#A8A400', '#103667', "#339966"],
    //['#666666','#339966','#CC0033','#003366','#CC9933','#663366','#339999','#0004FF','#FF6666','#333300','#C18C00','#103667'],
};
/**
 * 根据索引和主题获取一种颜色，没有对应主题则返回黑色
 * @param {Object} index
 * @param {Object} theme
 */
function getColor(index, theme) {

    if ( typeof (theme) == 'undefined') {
        theme = 'normal';
    }
    if ( typeof index == "undefined") {
        index = 0;
    }
    if (!color.hasOwnProperty(theme)) {
        return '#000000';
    }
    index = parseInt(index) % color[theme].length;
    return color[theme][index];

}

/**
 * 实际画图的名称，直接利用ichartjs画图的种类 
 */
var CHARTNAME = {
    singleLine : 1,
    singlePie : 3,
    multiPies : 4,
    singleBar : 5,
    multiBars : 6
}
/**
 *AJAX请求计数 
 */
var AJAX_HANDLE = 0;
/*
 * 数据请求的回调函数
 * id, 数据显示的div的id
 * drawFunc, 具体的画图函数
 * height, 图表高度，默认为SUB_PAGE_HEIGHT
 * width, 图表的宽度，默认为SUB_PAGE_WIDTH
 */
function ajaxResponseCb(id, drawFunc, width, height, name, ajax_handle) {
    return function(xml) {
        try {
            //不是正在请求的数据，丢弃
            if ( typeof ajax_handle != "undefined" && ajax_handle != AJAX_HANDLE) {
                return;
            }
            var doc = new XmlParser(xml);

            //数据解析失败
            if (!doc.valid) {
                $("#" + id).html("<h3>Failed to get data:</h3>" + doc.errors());
                hideStatus();
                return;
            };

            var charType = doc.chartType();
            var charName = "line";
            var setting = new Object();
            var info = doc.coordInfo();

            /* 把解析的xml对象插入到全局变量gXmls中保存 */
            // gXmls[id] = doc;
            setting.render = id;
            setting.title = info.coordname;
            setting.subtitle = info.coordSubName;
            setting.desc = info.coordDesc;
            share.setText(info.coordDesc);
            /* 配置图表数据 */
            switch(charType) {
                case CHARTYPE.singleLine:
                    setting.data = doc.lineData();
                    setting.labels = doc.lineLabels();
                    setting.XUnit = info.XUnit;
                    setting.YUnit = info.YUnit;
                    charName = CHARTNAME.singleLine;
                    break;
                case CHARTYPE.multiLines:
                    setting.data = doc.lineData();
                    setting.labels = doc.lineLabels();
                    setting.XUnit = info.XUnit;
                    setting.YUnit = info.YUnit;
                    charName = CHARTNAME.singleLine;
                    break;
                case CHARTYPE.singlePie:
                    setting.data = doc.data();
                    setting.labels = doc.labels();
                    charName = CHARTNAME.singlePie;
                    break;
                case CHARTYPE.multiPies:
                    setting.data = doc.data();
                    charName = CHARTNAME.multiPies;
                    break;
                case CHARTYPE.singleBar:
                    setting.data = doc.barData();
                    charName = CHARTNAME.singleBar;
                    break;
                case CHARTYPE.multiBars :
                    setting.data = doc.lineData();
                    charName = CHARTNAME.multiBars;
                    break;
                default:
                    alert(charType);
            }
            if ( typeof (height) == "undefined") {
                setting.height = SUB_PAGE_HEIGHT;
            } else {
                setting.height = height;
            }
            if ( typeof (width) == "undefined") {
                setting.width = SUB_PAGE_WIDTH;
            } else {
                setting.width = width;
            }
            setting.myName = name;
            drawFunc(setting, charName);
            
        } catch(err) {
            var err = "<h3>xml parse error!</h3>";
            err += "<p>Error name: " + err.name + "</p><br>";
            err += "<p>Error message: " + err.message + "</p>";
            $("#" + id).html(err);
            hideStatus();
        }
    }
}

/* 保存当前绘图的setting和画图函数，方便放大的时候重新绘图，或者调整大小 */
/**
 * 子页面的绘图函数
 *  setting是画图的配置项
 *  charName是绘制的图表类型
 */
function subChartDraw(setting, charName) {
    switch(charName) {
        case CHARTNAME.singleLine :
            drawLineBasic(setting);
            break;

        case CHARTNAME.singlePie :
            drawPie(setting);
            break;

        case CHARTNAME.multiPies :
            drawPie(setting);
            break;

        case CHARTNAME.singleBar :
            drawSingleBar(setting)
            break;

        case CHARTNAME.multiBars :
            drawMultiBar(setting);
            break;

        default:
            drawLineBasic(setting);
    };
    setDescription(setting.desc);
    hideStatus();
    curChart.setSetting(setting);
}

/**
 * 绘制推荐窗口图表
 */
function promoDraw(setting, charName) {
    promoSetInfo(setting.render, setting.title, setting.desc, setting.myName);
    switch(charName) {
        case CHARTNAME.singleLine :
            drawLineBasic(setting);
            break;

        case CHARTNAME.singlePie :
            drawPie(setting);
            break;

        case CHARTNAME.multiPies :
            drawPie(setting);
            break;

        case CHARTNAME.singleBar :
            drawSingleBar(setting)
            break;

        case CHARTNAME.multiBars :
            drawMultiBar(setting);
            break;

        default:
            drawLineBasic(setting);
    };
}

/**
 * 添加单位
 */
function addUnit(chart, XUnit, YUnit) {
    chart.plugin(new iChart.Custom({
        drawFn : function() {
            //计算位置
            var coo = chart.getCoordinate(), x = coo.get('originx'), y = coo.get('originy'), w = coo.width, h = coo.height;
            //在左上侧的位置，渲染一个单位的文字
            chart.target.textAlign('start').textBaseline('bottom').textFont('600 11px Verdana').fillText(YUnit, x - 40, y - 12, false, '#254d70').textBaseline('top').fillText(XUnit, x + w + 12, y + h - 10, false, '#9d987a');
        }
    }));
}

//显示最大坐标数目
var CHART_MAX_LABELS = 10;
//坐标旋转45度时，提示的最低长度
var CHART_LABEL_ROTATE45 = 10;
//竖直显示显示时，提示的最低长度
var CHART_LABEL_ROTATE90 = 20;

/**
 * 画折线图
 */
function drawLineBasic(charSetting) {
    var setting = {};
    extend(setting, charSetting);
    /* 配置标题 */
    setting.title = {
        text : setting.title,
        color : '#3e576f',
    };

    /* 多折线图配置 */
    if (setting.data.length > 1) {
        /* 配置图例 */
        adjustLegentSetting(setting);

    }

    //复制labels
    setting.myLabels = setting.labels.slice(0);
    setting.tip = {
        enable : true,
        style : "border:1px solid #ccc",
        listeners : {
            //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
            parseText : function(tip, name, value, text, i) {
                /*return "<span style='color:#005268;font-size:12px;'>" + name + "<br />" +
                 setting.myLabels[i] + "<br/>Count:" + "</span><span style='color:#005268;font-size:12px;'>" +
                 value + "</span>";*/
                if (name != setting.data[0].name) {
                    return "<div class='chartHiddenTip'>hidden</div>";
                }
                var ret = "<div class='chartShowTip'></div>";
                ret += "<h3>" + setting.myLabels[i] + "</h3>";
                var dataNum = setting.data.length;
                if (dataNum == 1) {
                    ret += "<p>" + setting.data[0].value[i] + "<p>";
                } else {
                    for (var j = 0; j < dataNum; j++) {
                        ret += "<p>" + setting.data[j].name + ":" + setting.data[j].value[i] + "</p>";
                    };
                }
                return ret;
            }
        }
    };
    setting.listeners = {
        mousemove : function() {
            $(".chartHiddenTip").parent().hide();
            $(".chartShowTip").parent().show();
        },
    }

    /* 调整坐标label */
    var ret = [];
    var maxLen = 0;
    var labels = setting.labels;

    var len = labels.length;
    var interval = Math.round(len / CHART_MAX_LABELS);
    for (var i = 0; i < len; i++) {
        if (maxLen < labels[i].length) {
            maxLen = labels[i].length;
        }
        if (0 != interval && 0 == i % interval) {
            ret.push(labels[i]);
        };
    };
    if (0 != interval) {
        setting.labels = ret;
    }

    /* 调整坐标角度 */
    setting.label = {
        fontsize : 10
    };
    if (maxLen > CHART_LABEL_ROTATE45 && maxLen < CHART_LABEL_ROTATE90) {
        //旋转45度
        setting.label.textAlign = "right";
        setting.label.textBaseline = "middle";
        setting.label.rotate = -30;
        setting.offsety = -1 * CHART_LABEL_ROTATE45;

    } else if (maxLen >= CHART_LABEL_ROTATE90) {
        //旋转90度
        setting.label.textAlign = "right";
        setting.label.textBaseline = "middle";
        setting.label.rotate = -60;
        setting.offsety = -1 * CHART_LABEL_ROTATE90;
    }

    /* 不显示折线上的数据 */
    var sub_option = {
        smooth : true,
        label : false,
        hollow : false,
        hollow_inside : false,
        point_size : 5,
    };
    if ( typeof setting.sub_option == "undefined") {
        setting.sub_option = sub_option;
    } else {
        extend(setting.sub_option, sub_option);
    }

    /* 配置十字提示线 */
    setting.crosshair = {
        enable : true,
        line_color : 'green',
    };

    var chart = new iChart.LineBasic2D(setting);
    curChart.saveDrawFunc(iChart.LineBasic2D);
    curChart.saveSetting(setting);
    addUnit(chart, setting.XUnit, setting.YUnit);
    chart.draw();
}

function drawPie(setting) {
    //绘制单个饼图
    if ( typeof setting.title == "string") {
        setting.title = {
            text : setting.title,
            color : '#3e576f',
        }
    }

    setting.showpercent = true;
    setting.sub_option = {
        label : {
            background_color : null,
            sign : false, //设置禁用label的小图标
            padding : '0 4',
            border : {
                enable : false,
                color : '#666666'
            },
            fontsize : 11,
            fontweight : 600,
            color : '#4572a7'
        },
        border : {
            width : 2,
            color : '#ffffff'
        }
    };

    new iChart.Pie2D(setting).draw();
    curChart.saveDrawFunc(iChart.Pie2D);
    curChart.saveSetting(setting);
}

function drawSingleBar(setting) {

    if (setting.data.length > CHART_MAX_LABELS) {
        setting.label = {
            fontsize : 10,
            textAlign : "right",
            textBaseline : "middle",
            rotate : -90,
        };
        setting.padding = '0 0 60 0';
    }

    var chart = new iChart.Column2D(setting);
    curChart.saveDrawFunc(iChart.Column2D);
    chart.draw();
    curChart.saveSetting(setting);
}

function drawMultiBar(setting) {
    adjustLegentSetting(setting);

    if (setting.labels.length > CHART_MAX_LABELS) {
        setting.label = {
            fontsize : 10,
            textAlign : "right",
            textBaseline : "middle",
            rotate : -90,
        };
        var padding = setting.padding;
        padding = padding.replace(/(\s*?\d+?\s+?\d+?\s+?)\d+?/, "$160");
        setting.padding = padding;
    }
    var chart = new iChart.ColumnMulti2D(setting);
    curChart.saveSetting(setting);
    curChart.saveDrawFunc(iChart.ColumnMulti2D);
    chart.draw();
}

/**
 *添加图例，根据图例调整图表大小
 */
function adjustLegentSetting(setting) {
    var max = 0;
    var charData = setting.data;
    for (var i = 0; i < charData.length; i++) {
        if (max < charData[i].name.length) {
            max = charData[i].name.length;
        }
    }
    var legentLen = max * 5 + 25;
    setting.offsetx = -1 * legentLen;
    //setting.offsetx = -1 * legentLen;
    setting.padding = "0 0 0 " + legentLen;
    //setting.padding = "0 0 0 " + legentLen;
    setting.legend = {
        enable : true,
        background_color : null,
        line_height : 25,
        fontsize : 11,
        align : "right",
        font : '微软雅黑 ',
        border : {
            enable : false
        }
    };

    if ( typeof setting.title == "object") {
        setting.offsetx = -1 * legentLen / 2;
    } else if ( typeof setting.title == "string") {
        setting.title = {
            text : setting.title,
            offsetx : -1 * legentLen / 2,
            color : '#3e576f',
        }
    }
}

var curChart = new Chart();
function Chart(charSetting) {
    var _setting = charSetting;
    var _drawFunc = function() {
    };
    var _saveSetting = {};

    this.setSetting = function(setting) {
        _setting = {};
        extend(_setting, setting);
    }

    this.extendSetting = function(setting, override) {
        extend(_setting, setting, override);
    }

    this.drawLineBasic = function() {
        var setting = {};
        extend(setting, _setting);
        //copy
        setting.data = toMultiData();
        drawLineBasic(setting);
    }

    this.drawColumn = function() {
        var setting = {};
        extend(setting, _setting);
        //copy
        var data = _setting.data;
        if (data.length > 1 && typeof data[0].value == 'object') {
            drawMultiBar(setting);
        } else {
            setting.data = toSingalData();
            drawSingleBar(setting);
        }
    }

    this.drawPie = function() {
        var setting = {};
        var data = _setting.data;
        if (data.length > 1 && typeof data[0].value == 'object') {
            extend(setting, _setting);
            //copy
            setting.data = toSingalData(_setting.data);
            drawPie(setting);
        }
        
    }

    this.saveSetting = function(setting) {
        _saveSetting = setting;
    }

    this.saveDrawFunc = function(f) {
        _drawFunc = f;
    }

    this.draw = function(setting) {
        extend(setting, _saveSetting);
        new _drawFunc(setting).draw();
    }
    /**
     * 把数据转换为单一数据源
     */
    function toSingalData() {
        try {
            var data = _setting.data;
            if ( typeof data[0].value != "object") {
                return data;
            } else {
                var ret = [];
                var elem;
                var i, j;
                var values, value;

                if (data.length == 1) {
                    values = data[0].value;
                    for ( i = 0; i < values.length; i++) {
                        elem = {
                            value : values[i],
                            color : getColor(i),
                            name : _setting.labels[i]
                        };
                        ret.push(elem);
                    }
                } else {
                    for ( i = 0; i < data.length; i++) {
                        elem = {
                            name : data[i].name,
                            color : data[i].color
                        };
                        values = data[i].value;
                        value = 0;
                        for ( j = 0; j < values.length; j++) {
                            value += values[j];
                        }
                        elem.value = value;
                        ret.push(elem);
                    }
                }
                return ret;
            }
        } catch(err) {
            return [];
        }
    }

    /**
     *
     * @param {Object} data
     */
    function toMultiData(data) {
        try {
            var data = _setting.data;
            if ( typeof data[0].value == "object") {
                return data;
            } else {
                var ret = [];
                var i;
                var values = [], value;
                for ( i = 0; i < data.length; i++) {
                    values.push(data.value);
                }
                ret.push({
                    color : getColor(1),
                    value : values
                });
                return ret;
            }
        } catch(err) {
            return [];
        }
    }

}

function showStatus(text){
    if(typeof text == "undefined"){
        text = "Waiting for data...";
    }
    $("#loading").text(text);
    $("#wait_div").show();
}
function hideStatus(){
    $("#wait_div").hide();
}
