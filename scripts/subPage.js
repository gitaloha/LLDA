/**
 * 图表的选项配置 
 * 注意：一定要保证其最先执行
 */
var SUB_POLYMERIZE = {};//保存能聚合的选项数据
$(function(){
    /* 产品ID选择 */
    function addToSelect(select, options){
        var len = options.length;
        var option;
        for(var i=0; i<len; i++){
            option = "<option value="+options[i].value + ">" + options[i].name+ "</option>";
            select.append(option);
        }
    }
    var productIds = [{name:'126836AU', value:'126836AU'},{name:'126802CAeng', value:'126802CAeng'},
                     {name:'126804DE', value:'126804DE'},{name:'126803GB', value:'126803GB'},
                     {name:'126823NL', value:'126823NL'},{name:'126800US', value:'126800US'},
                     {name:'126805FR', value:'126805FR'},{name:'126816CAfre', value:'126816CAfre'},
                     {name:'115802CAeng', value:'115802CAeng'},{name:'115816CAfre', value:'115816CAfre'},
                     {name:'115804DE', value:'115804DE'},{name:'115822ES', value:'115822ES'},
                     {name:'115805FR', value:'115805FR'},{name:'115803GB', value:'115803GB'},
                     {name:'115823NL', value:'115823NL'},{name:'115800US', value:'115800US'},
                     {name:'148304DE', value:'148304DE'},{name:'148322ES', value:'148322ES'},
                     {name:'148305FR', value:'148305FR'},{name:'148303GB', value:'148303GB'},
                     {name:'148323NL', value:'148323NL'},{name:'115616CAfre', value:'115616CAfre'},
                     {name:'115604DE', value:'115604DE'},{name:'115622ES', value:'115622ES'},
                     {name:'115605FR', value:'115605FR'},{name:'115603GB', value:'115603GB'},
                     {name:'115623NL', value:'115623NL'},{name:'115602CAeng', value:'115602CAeng'},
                     {name:'115600US', value:'115600US'},{name:'0000013636', value:'0000013636'},
                     {name:'0000010200', value:'0000010200'},{name:'0000010205', value:'0000010205'},
                     {name:'0000010404', value:'0000010404'},{name:'0000013232', value:'0000013232'},
                     {name:'0000010707', value:'0000010707'},{name:'0000010505', value:'0000010505'},
                     {name:'0000010300', value:'0000010300'},{name:'0000012323', value:'0000012323'},
                     {name:'0000010000', value:'0000010000'}];
    var select = $("#productOption");
    addToSelect(select, productIds);
    SUB_POLYMERIZE.productIds = productIds;
    
    /* 国家选择 */
    var countries = [{name:'AUeng', value:'AUeng'},{name:'CAeng', value:'CAeng'},{name:'CAfre', value:'CAfre'},
                     {name:'DEger', value:'DEger'},{name:'DKdan', value:'DKdan'},{name:'ESspa', value:'ESspa'},
                     {name:'FRfre', value:'FRfre'},{name:'GBeng', value:'GBeng'},{name:'NLdut', value:'NLdut'},
                     {name:'USeng', value:'USeng'},];
    select = $("#countryOption");
    addToSelect(select, countries);
    SUB_POLYMERIZE.countries = countries;
    
    
    /* 时间间隔选择 */
    var dateTypes = [{name:'Day', value:'Day'}, {name:'Week', value:'Week'}, {name:'Month', value:'Month'}];
    select = $("#timeTypeOption");
    addToSelect(select, dateTypes);
    
    /* CategoryType选择项目*/
    var categories = [{name:'Normal', value:'Normal'}, {name:'Error', value:'Error'}];
    select = $("#CatoryOption");
    addToSelect(select, categories);
    SUB_POLYMERIZE.categories = categories;
    
    /* 年龄的选择 */
    select = $("#childAgeOption");
    var childMaxAge = 8;
    var ages = []
    for(var i=1; i<=childMaxAge; i++){
        ages.push({name:i, value:i});
    }
    addToSelect(select, ages);
    SUB_POLYMERIZE.ages = ages;
});

/* 子页面的小图高度和宽度  */
var SUB_PAGE_HEIGHT = 500;
var SUB_PAGE_WIDTH = 800;
/* 子页面显示大图的高度和宽度  */
var SUB_BIG_HEIGHT = 675;
var SUB_BIG_WIDTH = 900;

/**
 *实现数据页面左侧定位栏动态效果
 */
$(function() {
    var current = null;
    $(".click-header").click(function() {
        $(this).next(".widget-first").prevAll(".widget-first").hide(500);
        $(this).next(".widget-first").nextAll(".widget-first").hide(500);

        $(this).parent().find(".first-header-active").each(function() {
            $(this).removeClass("first-header-active");
            $(this).removeClass("first-focus");
            $(this).addClass("first-header");

            $(this).find(".ui-icon").removeClass("ui-icon-active");
            $(this).find(".ui-icon").addClass("ui-icon-static");

        })
        $(this).next(".widget-first").slideToggle("slow");

        if (current != $(this)[0]) {
            $(".first-focus").each(function() {
                $(this).removeClass("first-focus");
                $(this).addClass("first-header");

            })
            $(this).find(".ui-icon").removeClass("ui-icon-static");
            $(this).find(".ui-icon").addClass("ui-icon-active");
            $(this).removeClass("first-header");
            $(this).removeClass("first-hover");

            $(this).addClass("first-header-active");
            current = $(this)[0];
        } else {
            /**
             *点击first标题时，下级内容都回收
             */
            $(this).next(".first-content").find(".second-header-active").each(function() {
                $(this).find(".ui-icon-sec").removeClass("ui-icon-active-sec");
                $(this).find(".ui-icon-sec").addClass("ui-icon-static-sec");
                $(this).removeClass("second-header-active");
                $(this).addClass("second-header");
                $(this).next(".second-content").hide(500);
            });

            $(this).find(".ui-icon").removeClass("ui-icon-active");
            $(this).find(".ui-icon").addClass("ui-icon-static");
            $(this).removeClass("first-header-active");
            $(this).removeClass("first-hover");
            $(this).removeClass("first-header");
            $(this).addClass("first-focus");
            current = null;
        }
    });
    /* 导航栏一级标题的hover效果  */
    $(".click-header").hover(function() {
        if ($(this).find(".ui-icon").css("background-position") != "-128px -192px") {
            $(this).removeClass("first-header");
            $(this).addClass("first-hover");
        }

    }, function() {
        if ($(this).find(".ui-icon").css("background-position") != "-128px -192px") {
            $(this).removeClass("first-hover");
            if (!($(this).hasClass("first-focus"))) {
                $(this).addClass("first-header");
            }
        } else {
            $(this).removeClass("first-hover");
        }

    });
    $(".click-header-sec").click(function() {
        $(this).next(".widget-second").slideToggle("slow");
        if ($(this).find(".ui-icon-sec").css("background-position") != "-64px 0px") {
            $(this).find(".ui-icon-sec").removeClass("ui-icon-static-sec");
            $(this).find(".ui-icon-sec").addClass("ui-icon-active-sec");
            $(this).removeClass("second-header");
            $(this).addClass("second-header-active");
        } else {
            $(this).find(".ui-icon-sec").removeClass("ui-icon-active-sec");
            $(this).find(".ui-icon-sec").addClass("ui-icon-static-sec");
            $(this).removeClass("second-header-active");
            $(this).addClass("second-header");
        }
    });

    /**
     * 信息显示
     */
    $(".showData").hover(function() {
        $(this).css("color", "#2F99FF");
    }, function() {
        $(this).css("color", "#0B2946");
    });

    /**
     * 图片放大效果
     */
    $("#chartWindow").click(function() {
        var wheight = document.documentElement.clientHeight;
        var wwidth = document.documentElement.clientWidth;
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        var iLeft = parseInt((wwidth / 2) - (SUB_BIG_WIDTH / 2));
        var iTop = parseInt((wheight / 2) - (SUB_BIG_HEIGHT / 2));

        /* 利用全局变量curChart,重新画图  */
        var setting = {
            render : "bigChart",
            width : SUB_BIG_WIDTH,
            height : SUB_BIG_HEIGHT
        };
        curChart.draw(setting);

        /* 设置大图属性并且显示大图 */
        $("#bigChart").css("position", "fixed").css("top", iTop + "px");
        $("#bigChart").css("left", iLeft + "px");
        $("#bigChart").css("opacity", 1);
        $("#bigChart").show(500);

        /* 周围阴影效果 */
        $("#shade").show();
        
        $(".Image_close").css("top",iTop-18+"px");
        var image_left = iLeft+SUB_BIG_WIDTH-13;
        $(".Image_close").css("left",image_left+"px");
        $(".Image_close").show(600);
    });
    
    

    /* 显示大图时，点击关闭部分隐藏大图 */
   $(".Image_close").click(function(){
        $(this).hide();     
        $("#shade").hide();
        $(".new-image").hide();
        
    });

    /**
     *点击左侧菜单，发送数据请求
     */
    $(".list_item").click(function() {
        var name = $(this).attr("name");
        var conf = {};
        conf.cmd = {};
        //复制全局变量
        extend(conf, sub_install_conf[name]);
        if ( typeof conf == "undefined") {
            return;
        };
        //扩充默认配置
        extend(conf, new SubConfig());
        conf.addOption(conf.option, conf.cmd);
        conf.name = name;
        /*清除表格数据和错误信息*/
        $('.dataTableView').remove();
        $('#dataError').html('');
        
        $('#aggCancel').trigger('click');
        getNewData(conf);
        
        /* 改变样式  */
        $("#window_title").text($("[name=" + name + "]").text());
        $(".list_focus").addClass("list_now");
        $(".list_focus").removeClass("list_focus");
        $(this).removeClass("list_now");
        $(this).addClass("list_focus");
        /*
        var r = /(name=)\w+?(#|&|$)/;
        window.location.href = window.location.href.replace(r, '$1'+name+'$2');
        */
        
    });

    /**
     *单位选择事件
     */
    $("#select-year").click(function() {
        var checkText = $("#select-year").find("option:selected").text();
    });
    
    /**
     *点击数据聚合图表时弹出图标框供用户选择聚合项 
     */
    $(".polymerizeBtn").click(function(){
        try{
            var options = [];
            var title = $(this).parent().find('span').text();
            var $select = $(this).prev('select');
            $select.find('option').each(function(index) {
                if($(this).val()){
                    options.push({name:$(this).text(), value:$(this).val()});
                }
            });
            $("#aggCancel").trigger('click');
            $('#polymerizeSelected').attr('id', '');
            var id = $select.attr('id');
            var name = $select.attr('name');
            $(this).attr('id', 'polymerizeSelected');//设置id，标记为当前选项
            dataPolymerize(id, title, options,name);
        }catch(err){
            alert("not options!");
        }
        
    });
    
    /**
     *点击重选，模拟点击已经标记的选项 
     */
    $("#aggReelect").click(function(){
        try{
            $('#polymerizeSelected').trigger('click');
        }catch(err){
            alert('error');
        }
        
    });
    /**
     *点击取消，隐藏数据 
     */
    $('#aggCancel').click(function(){
        //getNewData(curChart.conf);
        AGG.clear();
        $(".aggOptional").remove();
        $('#polymerizeSelected').next('.selectShade').removeClass('selectShadeShow');
        $("#aggDiv").hide();
        getNewData(curChart.conf); 
    });
    
    /**
     * 点击不同的图形展示不同的图形
     */
     $(".chartTypeItem").click(function(){
         switch($(this).text()){
             case 'Pie':
                curChart.drawPie();
                break;
             case 'Line':
                curChart.drawLineBasic();
                break;
             case 'Column':
                curChart.drawColumn();
                break;
             default:
                alert('check html!');
         }
     });
     
     $("#showData").click(function() {
        //todo:向服务器获取数据
        var attr = $(this).attr('attr');
        if('hide' == attr){
            //显示
            $(this).text('Hide data');
            $("#dataDiv").show(200);
            $(this).attr('attr', 'show');
            if(0 == $('.dataTableView').toArray().length ){
                getRawData(curChart.conf, 1);
            }
        }else{
            $(this).text('Show data');
            $("#dataDiv").hide(200);
            $(this).attr('attr', 'hide');
        }
     });
     
    //动态设置数据聚合选项的位置
    adjustOptionsDiv();
});
/**
 *解析url，默认展示一些数据
 */
$(function() {
    var a = getQueryString("name");
    if (a == null) {
        return ;
        alert("1error");
    }
    if (!($("[name=" + a + "]").parent().parent().prev().hasClass("first-header-active"))) {
        $("[name=" + a + "]").parent().parent().prev().trigger("click");
    }
    $("[name=" + a + "]").parent().prev().trigger("click");
    $("[name=" + a + "]").trigger("click");
});

/**
 *添加详细信息
 */
function setDescription(text){
    if(typeof text == 'undefined' || text == null || text== ''){
        text = "No desciption";
    }
    $("#Info-detail").text(text);
}

/**
 *动态调整数据聚合选项的 显示
 */
function adjustOptionsDiv(){
    var wwidth = document.documentElement.clientWidth;
    var left = wwidth - (wwidth - $("#container").width())/2.0;
    $("#aggDiv").css("left", left + "px");
    $("#aggDiv").css('top', 200);
}
/**
 *向服务器获取最新图表数据
 */
function getNewData(conf) {
    //判断是否是数据聚合
    if(AGG.hasData()){
        AGG.sendRequest();
        if($("#showData").attr('attr') == 'show'){
            AGG.sendRequest(true);
        }
        return;
    }
    if ( typeof conf == "undefined") {
        return;
    };
    var api = $("#selectForm").serialize();
    api += "&Cmd="+conf.cmd.Cmd;
    curChart.conf = conf;
    
    AJAX_HANDLE++;
    jQuery.get(conf.url, api, new ajaxResponseCb("chartWindow", conf.drawCb, SUB_PAGE_WIDTH, SUB_PAGE_HEIGHT,conf.name, AJAX_HANDLE));
    //显示数据时请求数据
    if($("#showData").attr('attr') == 'show'){
            getRawData(conf, 1);
    }
    /* 隐藏状态提示框  */
    showStatus();
}




function showBuffer(w,h, id){
    var buffer = document.createElement("div");
    var image =  document.createElement("IMG");
    document.body.appendChild(buffer);
    buffer.style.position = "absolute";
    buffer.style.top = h+"px";
    buffer.style.left = w+"px";
    buffer.style.width = "85px";
    buffer.style.height = "80px";
    buffer.style.backgroundImage = "url(images/003.gif)";
    buffer.innerHTML = "Waiting...";
    buffer.style.filter = "alpha(opacity = 50)";
    buffer.id = "showbuffer";
    
    $("#"+id).append(buffer);  
}

/**
 * 从url中解析http get方法的参数
 *  name参数的key
 */
function getQueryString(name) {
    var href = window.location.href;
    var temp = href.split("?");
    var argvs = [];
    if (temp.length > 1) {
        argvs = temp[1].split("&");
    };
    for (var i = 0; i < argvs.length; i++) {
        var argv = argvs[i].split("=")
        if (argv.length > 1 && name == $.trim(argv[0])) {
            /* 去除最后的# */
            var ret = argv[1].split("#");
            return ret[0];
        };
    }
    return null;
}


/**
 * 显示图表选择项，option主要有以下属性:timeRange,timeType, product,country,
 */
function showOption(option, cmd){
    try{
        $(".optionDiv").hide();
        if (option.timeRange) {
            var BeginDate,endDate;
            BeginDate = typeof cmd.BeginDate == "undefined" ? null : cmd.BeginDate;
            endDate = typeof cmd.EndDate == "undefined" ? null : cmd.EndDate;
            timeRangeOption(BeginDate, endDate);
        };
        if (option.timeType) {
            var timeType;
            timeType = typeof cmd.DateType == "undefined" ? null : cmd.DateType;
            timeTypeOption(timeType);
        };
        if (option.product) {
            var productId = typeof cmd.ProductID == "undefined" ? null : cmd.ProductID;
            productOption(productId);
        };
        if (option.country) {
            var country = typeof cmd.country == "undefined" ? null : cmd.country;
            countryOption(country);
        };
        if (option.Catory) {
            var Catory = typeof cmd.CategoryType == "undefined" ? null : cmd.CategoryType;
            CatoryOption(Catory);
        };
        if (option.ChildAge) {
            var ChildAge = typeof cmd.ChildAge == "undefined" ? null : cmd.ChildAge;
            childAgeOption(ChildAge);
        };
    }catch(err){
        document.writeln("Exception caught, executing the catch block");
        document.writeln("Error name: " + err.name);
        document.writeln("Error message: " + err.message);
    }
    
}


/**
 * 添加时间段的选择项
 */
function timeRangeOption(beginTime, endTime){
    if (beginTime) {$("#beginTimeOption").val(beginTime)};
    if (endTime) {$("#endTimeOption").val(endTime)};
    $("#start_end").show();
    
    var beginTime = beginTime;
    var endTime = endTime;
    $("#beginTimeOption").blur(function(){
        if (beginTime != $(this).val()) {
             beginTime = $(this).val();
            getNewData(curChart.conf);
        };
    });
    $("#endTimeOption").blur(function(){
        if (endTime != $(this).val()) {
             endTime = $(this).val();
             getNewData(curChart.conf);
        };
    });
}

/**
 * 添加时间类型的选择项
 */
function timeTypeOption(timeType){
    if (timeType) {$("#timeTypeOption").val(timeType)};
    $("#select_timeType").show();
    
    var timeType = timeType;
    $("#timeTypeOption").blur(function(){
        if (timeType != $(this).val()) {
            timeType = $(this).val();
            getNewData(curChart.conf);
        };
    });
}

/**
 * 添加产品的选择项
 */
function productOption(productId){
    if (productId) {$("#productOption").val(productId)};
    $("#select_product").show();
    var product = productId;
    $("#productOption").blur(function(){
        if(typeof product != "undefined" && product != $(this).val()){
            product = $(this).val();
            getNewData(curChart.conf);
        }
    });
}

/**
 * 添加国家的选择项
 */
function countryOption(country){
    if(country){$("#countryOption").val(country)};
    $("#select_country").show();
    var country = country;
    $("#countryOption").blur(function(){
        if (country != $(this).val()) {
            country = $(this).val();
            getNewData(curChart.conf);
        };
    });
}

/**
 * 添加Catory的选择项
 */
function CatoryOption(Catory){
    if(Catory){$("#CatoryOption").val(Catory)};
    $("#select_cateory").show();
    var Catory = Catory;
    $("#CatoryOption").blur(function(){
        if (Catory != $(this).val()) {
            Catory = $(this).val();
            getNewData(curChart.conf);
        };
    });
}

/**
 * 添加选择孩子年龄的选择项
 */
function childAgeOption(age){
    if (age) {$("#childAgeOption").val(age)};
    $("#select_childAge").show();
    $("#childAgeOption").blur(function(){
        if (age != $(this).val()) {
            age = $(this).val();
            getNewData(curChart.conf);
        };
    });
}

/*
function addCharType(){
    var html = "<div id='chartTypeDiv'>"+
                        "<span class='chartTypeItem' onclick='changeToPie()'>pie</span>" +
                        "<span class='chartTypeItem'onclick='changeToLine()'>line</span>" +
                        "<span class='chartTypeItem' onclick='changeToColumn()'>column</span>" +
                "</div>";
    $('#')
}*/

/**
 * 子页面的默认配置
 */
function SubConfig(){
    function getFormatDay(date){
        return date.getFullYear() + "-" + date.getMonth() + "-" +date.getDate();
    }

    /* 默认url */
    this.url = "http://10.126.72.29/ll_da/Search.php";
    
    /* 默认参数 */
    var beginDate = new Date();
    var endDate = new Date();
    endDate.setMonth(endDate.getMonth()+1);
    this.cmd = {Cmd:"GetGotodetailCountOfDay", 
                BeginDate: getFormatDay(beginDate),
                EndDate: getFormatDay(endDate),
                DateType:"Day",
                Country:"",
                ProductID:"",
                CategoryType:"Normal",
                ChildAge:3,
                random : Math.random(),
            };
    /* 默认不显示所有的选择标签  */
    this.option = {timeRange:false, product:false, country:false, timeType:false, Catory:false, ChildAge:false};
    this.drawCb = subChartDraw;
    this.addOption = showOption;        
}
