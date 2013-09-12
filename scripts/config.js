/**
 * @author se0716
 */

/* 保存客户端发回来的数据 ,属性名字是需要画图的div,属性值是XmlParse类型*/
var gXmls = {};

/**
 * promo_conf 配置推荐窗口的数据来源和画图表函数
 * url:数据源位置
 * cmd:请求参数
 * drawCb:画图函数，参数为json类型，可以配置项有:data
 */
function getCurDay() {
    var date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

function getLastMonth() {
    var date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}
var shopUrl = "http://10.126.72.29/ll_da/Estore.php";
var setupUrl = "http://10.126.72.29/ll_da/getData.php";
var userUrl = "http://10.126.72.29/ll_da/getData.php";
var searchUrl = 'http://10.126.72.29/ll_da/Search.php';

var promo_conf = {
    promoChartOne : {
        url : shopUrl,
        cmd : {
            Cmd : "GetAllOrdersCount",
            CategoryType:"Normal",
            BeginDate : getLastMonth(),
            EndDate : getCurDay(),
            DateType : "Day",
            Country : "",
            ProductID : "",
        },
        name:"showOrder",
        drawCb : promoDraw
    },
    promoChartTwo : {
        url : userUrl,
        cmd : {
            Cmd : "GetRegisterUserCount",
            CategoryType:"Normal",
            BeginDate : getLastMonth(),
            EndDate : getCurDay(),
            DateType : "Day",
            Country : "",
            ProductID : "",
        },
        name:"showRegister",
        drawCb : promoDraw
    },
    promoChartThree : {
        url : searchUrl,
        cmd : {
            Cmd : "GetSearchCount",
            CategoryType:"Normal",
            BeginDate : getLastMonth(),
            EndDate : getCurDay(),
            DateType : "Day",
            Country : "",
            ProductID : "",
        },
        name:"showSearchTotal",
        drawCb : promoDraw
    },
};


/**
 * sub_install_conf 子页面的配置项，具体的配置项目参见subPage.js文件的SubConfig
 * 
 */
var sub_install_conf = {
    /* 安装登录的配置项 */
    showInstall : {
        url : setupUrl,
        cmd : {
            Cmd : "GetInstallCount",
            BeginDate:"2013-7-7",
        },
        option : {
            timeRange : true,
            product : true,
            timeType : true,
            Catory : true
        },
        
    },
    showInstallPro : {
        url : "http://10.126.72.29/ll_da/Search.php",
        cmd : {
            Cmd : "GetGotodetailCountOfDay",
            BeginDate : "2013-07-08",
            EndDate : "2013-08-05",
        },
        
        option : {
            timeRange : true
        },
        drawCb : subChartDraw,
    },

    showInstallFailed : {//柱状图簇状
        url : "XMLDataDesc/mytest.php",
        cmd : {
            cmd : 5
        },
        drawCb : subChartDraw,
    },
    showInstallFailedPro : {//单饼图
        url : "XMLDataDesc/mytest.php",
        cmd : {
            cmd : 6
        },
        drawCb : subChartDraw,
    },
    showUnload : {//单柱状图
        url : setupUrl,
        cmd : {
            Cmd : "GetUninstallCount",
        },
        option : {
            timeRange : true,
            product : true,
            timeType : true,
            Catory : true
        },
    },
    showUnloadPro : {
        url : "XMLDataDesc/mytest.php",
        cmd : {
            cmd : 4
        },
        drawCb : subChartDraw,
    },
    showUnloadFailed : {
        url : "XMLDataDesc/mytest.php",
        cmd : {
            cmd : 7
        },
        drawCb : subChartDraw,
    },
    showUnloadFailedPro : {
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true
        },
    },

    /* 用户账户配置项 */
    showRegister : {
        url : userUrl,
        cmd : {
            Cmd : "GetRegisterUserCount",
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showChild : {
        url : userUrl,
        cmd : {
            Cmd : "GetChildCount",
        },
        option : {
            timeRange : true,
            timeType : true,
            ChildAge : true
        },
    },
    showConsoleRegister : {
        url : userUrl,
        cmd : {
            Cmd : "GetAccCount"
        },
        option : {
            timeRange : true,
            timeType : true
        }
    },
    showLogin : {
        url : userUrl,
        cmd : {
            Cmd : "GetLoginCount"
        },
        option : {
            timeRange : true,
            timeType : true
        }
    },

    /* 搜索配置项 */
    showSearchTotal : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetSearchCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showSearchUser : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetSearchUsersCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showSearchKey : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetSearchWordCount',
            BeginDate:'2013-6-9',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showDetail : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetGotodetailCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showAddcart : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetAddtocartCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showSearchLinkrate : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetSearchLinkRateCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showSearchUserLinkrate : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetSearchUsersLinkRateCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showSearchKeyLinkrate : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetSearchWordLinkRateCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showDetailLinkrate : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetGotodetailLinkRateCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },
    showAddcartLinkrate : {
        url : searchUrl,
        cmd : {
            Cmd : 'GetAddtocartLinkRateCount',
        },
        option : {
            timeRange : true,
            product : true,
            country : true,
            timeType : true,
        },
    },

    /* 商店配置项 */
    showShoppingCart : {
        url : shopUrl,
        cmd : {
            Cmd : "GetUserAddToCartUserCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showFreedownload : {
        url : shopUrl,
        cmd : {
            Cmd : "GetFreeDownloadCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showSuccessPay : {
        url : shopUrl,
        cmd : {
            Cmd : "GetOrderSucCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showGiftCard : {
        url : shopUrl,
        cmd : {
            Cmd : "GetUseGiftCardAccCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showCancle : {
        url : shopUrl,
        cmd : {
            Cmd : "GetCancelPayAccCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    Failed : {
        url : shopUrl,
        cmd : {
            Cmd : "GetFailedPayAccCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showDownload : {
        url : shopUrl,
        cmd : {
            Cmd : "GetDeliverySucceedCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    },
    showOrder : {
        url : shopUrl,
        cmd : {
            Cmd : "GetAllOrdersCount"
        },
        option : {
            timeRange : true,
            country : true,
            timeType : true
        },
    }
};

