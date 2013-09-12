var ANIMATION_INTERVAL = 100;

var STAGE_CHANGE_INTERVAL = 200;
var STAGE_ALPHA = 1;
var STAGE_ALPHA_TIMES = 5;
var STAGE_ALPHA_D = STAGE_CHANGE_INTERVAL / 2 / STAGE_ALPHA_TIMES;
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var HOME_X = 100;
var HOME_Y = 20;
var HOME_WIDTH = 180;
var HOME_HEIGHT = 180;
var CAR_WIDTH = 24;
var CAR_HEIGHT = 19;
var SHOP_X = 510;
var SHOP_Y = 30;
var SHOP_WIDTH = 203;
var SHOP_HEIGHT = 178;
var COMPUTER_WIDTH = 203;
var COMPUTER_HEIGHT = 143;
var COMPUTER_X = 200;
var COMPUTER_Y = 300;
var DORAEMON_WIDTH = 300;
var DORAEMON_HRIGHT = 300;
var DORAEMON_X = 400;
var DORAEMON_Y = 300;
var WEB_X = 222;
var WEB_Y = 306;
var WEB_WIDTH = 153;
var WEB_HEIGHT = 100;
var PROMPT_WIDTH = 200;

var LOGIN_PROMP_TIMEOUT = 1000;
var SHOPPING_PROMP_TIMEOUT  = 3000;

var INSTALL_HOUSE_X = 590;
var INSTALL_HOUSE_Y = 320;
var INSTALL_HOUSE_WIDTH = 300;
var INSTALL_HOUSE_HEIGHT = 500;
var context;
var parent;
/* 图片对象 */
var child;
var stage;
var home;
var shop;
var car;
var computer;
var web_login;
var web_shop;
var web_move;

var nextFunc;

/**
 *页面刷新时执行
 */
$(function() {
    loadSrc();
    addFirstAction();
    animationPlay();
});

/**
 *加载资源
 */
function loadSrc() {
    context = document.getElementById("animationCanvas").getContext('2d');
    context.fillStyle = "#ccc";

    parent = new People(context, 10, 278);
    stage = new Image();
    stage.src = "images/animation/cao.jpg";
    home = new Image();
    home.src = "images/animation/home.png";
    shop = new Image();
    shop.src = "images/animation/shop.png";
    car = new Image();
    car.src = "images/animation/car_right.png";
    computer = new Image();
    computer.src ="images/animation/computer.png";
    doraemon = new Image();
    doraemon.src = "images/animation/Doraemon.png";
    step_two = new Image();
    step_two.src = "images/animation/step_two.png";
    step_three = new Image();
    step_three.src = "images/animation/step_three.png";
    web_login = new Image();
    web_login.src = "images/animation/web_login.png";
    web_shop = new Image();
    web_shop.src = "images/animation/web_shop.png";
    web_move = new Image();
    web_move.src = "images/animation/web_move.png";
    install_house = new Image();
    install_house.src = "images/animation/install_house.png";
}


/**
 *添加第一个场景的任务动作
 */
function addFirstAction() {
    parent.move(DIR_RIGHT, 2);
    parent.move(DIR_UP, 2);
    parent.move(DIR_RIGHT,8);
    
    addPauseCb(showComputer);
    addPauseCb(showChat);
    var webPage = addSrcToStage(function(){
        context.drawImage(web_login, WEB_X, WEB_Y, WEB_WIDTH, WEB_HEIGHT);
    });
    
    parent.move(DIR_UP,8);
    parent.move(DIR_RIGHT);
    parent.move(DIR_UP);
    //addPauseCb(registerPrompt);
    //addPauseCb(loginPrompt);
    removeSrcFromStage(webPage);
    
    webPage = addSrcToStage(function(){
        context.drawImage(web_move, WEB_X, WEB_Y, WEB_WIDTH, WEB_HEIGHT);
    });
    addPauseCb(chat_three);
    //addPauseCb(movePrompt);
    parent.addPlugin(3, 25, CAR_WIDTH, CAR_HEIGHT, car, DIR_RIGHT);
    parent.move(DIR_RIGHT);
    parent.move(DIR_DOWN, 4);
    parent.move(DIR_RIGHT, 36);
    parent.move(DIR_UP, 3);
    parent.removePlugin(car);
    parent.move(DIR_UP);
    removeSrcFromStage(webPage);
    webPage = addSrcToStage(function(){
        context.drawImage(web_shop, WEB_X, WEB_Y, WEB_WIDTH, WEB_HEIGHT);
       
    });
    //addPauseCb(showChat);
    //addPauseCb(shoppingPrompt);
    removeSrcFromStage(webPage);
}
/**
 *播放动画 
 */
function animationPlay() {
    animationTimer = setInterval(animationDraw, ANIMATION_INTERVAL);
}

function animationStop() {
    clearInterval(animationTimer);
}

function animationRestart() {
    animationStop();
    actionIndex = 0;
    animationPlay();
}
/**
 *间隔 ANIMATION_INTERVAL就要调用的一次的画图函数
 */
function animationDraw() {
    context = document.getElementById("animationCanvas").getContext('2d');

    /* 清除屏幕 */
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    /* 加载资源，绘制图像 */
    /* 绘制背景 */
    loadStage();
    /* 绘制人物 */
    var count = 0;
    var actions;
    for (var i = 0; i < peopleList.length; i++) {
        actions = peopleList[i]["actions"];
        if ( typeof actions == "object" && actionIndex < actions.length) {
            actions[actionIndex]();
        } else if ( typeof actions == "object" && actions.length > 0) {
            actions[actions.length-1]();
            count++;
        }else{
            count ++;
        }

    };

    /* 判断是否有暂停函数  */
    for (var i = 0; i < pauseList.length; i++) {
        aIndex = actionIndex;
        if(count > peopleList.length){
            var aIndex = actionIndex-1;
        }
        if (pauseList[i].index == aIndex) {
            animationStop();
            pauseList[i].pauseFunc();
            pauseList[i].index = -1;
            return;
        };
    }

    /* 场景结束 */
    if (count == peopleList.length) {
        animationStop();
    };
    actionIndex++;
}

var newSrcList = new Array();
/**
 *添加资源到场景，具体的资源由f函数自己定义，返回添加到场景的资源对象，可用于removeSrcFromStage移除该资源 
 */
function addSrcToStage(f){
    var temp = {valid:true, loadFunc:f};
    addPauseCb(function(){
        newSrcList.push(temp);
        animationPlay();
    });
    return temp;
}

/**
 *从场景中移除资源，obj是addSrcToStage函数的返回对象 
 */
function removeSrcFromStage(obj){
    addPauseCb(function(){
        for(var i=0; i<newSrcList.length; i++){
            if (obj == newSrcList[i]) {
                newSrcList[i].valid = false;
            };
        }
        animationPlay();
    });
}

/**
 *加载背景资源, stage为场景选择器
 */
function loadStage() {
    /*  */
    context.drawImage(stage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(home, 0, 0, HOME_WIDTH, HOME_HEIGHT, HOME_X, HOME_Y, HOME_WIDTH, HOME_HEIGHT);
    context.drawImage(shop, SHOP_X, SHOP_Y, SHOP_WIDTH, SHOP_HEIGHT);
    context.drawImage(install_house,INSTALL_HOUSE_X,INSTALL_HOUSE_Y,INSTALL_HOUSE_WIDTH,INSTALL_HOUSE_HEIGHT);
    for (var i=0; i < newSrcList.length; i++) {
        if (newSrcList[i].valid) {
            newSrcList[i].loadFunc();
        };
    };
}

/**
 * 
 */
function showComputer(){
    var temp = {valid:true, 
        loadFunc:function(){
            context.drawImage(computer, COMPUTER_X, COMPUTER_Y, COMPUTER_WIDTH, COMPUTER_HEIGHT);
          
        }
    };
    newSrcList.push(temp);
    animationPlay();
}
function showChat(){
	var temp = {valid:true, 
        loadFunc:function(){
            context.drawImage(doraemon, DORAEMON_X, DORAEMON_Y, DORAEMON_WIDTH, DORAEMON_HRIGHT);
          
        }
        
    };
    newSrcList.push(temp);
    animationPlay();
}
function chat_two(){
	var temp = {valid:true, 
        loadFunc:function(){
            context.drawImage(step_two, DORAEMON_X, DORAEMON_Y, DORAEMON_WIDTH, DORAEMON_HRIGHT);
          
        }
    };
    newSrcList.push(temp);
    animationPlay();
}
function chat_three(){
	var temp = {valid:true, 
        loadFunc:function(){
            context.drawImage(step_three, DORAEMON_X, DORAEMON_Y, DORAEMON_WIDTH, DORAEMON_HRIGHT);
          
        }
    };
    newSrcList.push(temp);
    animationPlay();
}
/**
 *显示登录的提示信息
 */
function loginPrompt() {
    var x = 400;
    var y = 400;
    var width = PROMPT_WIDTH;
    var height = 100;
    
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#C4D8FF";
    context.strokeRect(x, y, width, height);
    context.fillRect(x, y, width, height);
    context.fillStyle = "#249DC9";
    context.font = "normal bold 15px Cursive";
    x += 5;
    y += 15;
    context.fillText("Second Step:", x, y);
    y += 15;
    context.font = "normal bold 13px Cursive";
    context.fillText("In the same website,inputing your  ", x, y);
    y += 13;
    context.fillText("username and password to login the ", x, y);
    y += 13;
    context.fillText("website.", x, y);
    
    
    //otherDrawList.push(temp);
    setTimeout(animationPlay, LOGIN_PROMP_TIMEOUT);
}

function registerPrompt(){
    var x = 400;
    var y = 400;
    
    var width = PROMPT_WIDTH;
    var height = 100;
    
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#C4D8FF";
    context.strokeRect(x, y, width, height);
    context.fillRect(x, y, width, height);
    context.fillStyle = "#249DC9";
    context.font = "normal bold 15px Cursive";
    x += 5;
    y += 15;
    context.fillText("First Step:", x, y);
    y += 15;
    context.font = "normal bold 13px Cursive";
    
    context.fillText("Enter our website:", x, y);
    y += 13;
    context.fillText("      http://www.vtechuk.com/.", x, y);
    y += 13;
    context.fillText("Register a new user acount.", x, y);
    //otherDrawList.push(temp);
    setTimeout(animationPlay, LOGIN_PROMP_TIMEOUT);
    return addSrcToStage(function(){
        context.drawImage(web_login, WEB_X, WEB_Y, WEB_WIDTH, WEB_HEIGHT);
    });
    
}

/**
 *购物时显示 提示信息
 */
function shoppingPrompt() {
    var x = 400;
    var y = 400;
    
    var width = PROMPT_WIDTH;
    var height = 130;
    
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#C4D8FF";
    context.strokeRect(x, y, width, height);
    context.fillRect(x, y, width, height);
    context.fillStyle = "#249DC9";
    context.font = "normal bold 15px Cursive";
    x += 5;
    y += 15;
    context.fillText("Third Step:", x, y);
    y += 15;
    context.font = "normal bold 13px Cursive";
    context.fillText("In the same website,inputing your  ", x, y);
    context.fillText("Now you can shopping in our website", x, y);
    y += 13;
    context.fillText("with the flowing steps:             ", x, y);
    y += 13;
    context.fillText("  1.select the product or search a ", x, y);
    y += 13;
    context.fillText("    product.", x, y);
    y += 13;
    context.fillText("  2.add the your product to the ", x, y);
    y += 13;
    context.fillText("    shopping cart", x, y);
    y += 13;
    context.fillText("  3.submit your order form and pay for", x, y);
    y += 13;
    context.fillText("    it", x, y);
    //otherDrawList.push(temp);
    setTimeout(animationPlay, LOGIN_PROMP_TIMEOUT);
}

function movePrompt(){
    var x = 400;
    var y = 400;
    
    var width = PROMPT_WIDTH;
    var height = 100;
    
    var temp = {valid:true, loadFunc:function(){
        var cx = x;
        var cy = y;
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#C4D8FF";
        context.strokeRect(cx, cy, width, height);
        context.fillRect(cx, cy, width, height);
        context.fillStyle = "#249DC9";
        cx += 5;
        cy += 15;
        context.font = "normal bold 13px Cursive";
        context.fillText("Ok now, you can go to our online shop...", cx, cy);
    }};
    
    newSrcList.push(temp);
    //otherDrawList.push(temp);
    animationPlay();
}
