var url = "images/animation/a.png";
var IMAGE_INTERVAL_X = 25;
var IMAGE_INTERVAL_Y = 38;

var DIR_DOWN = 0;
var DIR_LEFT = 1;
var DIR_RIGHT = 2;
var DIR_UP = 3;
var STEPS_PER_MOVE = 4;//每次移动步数
var STEP_PX = 3;        //每步所占的像素
var INIT_WIDTH = 30;
var INIT_HEIGHT = 45;

/* peopleList是一个数组，数组保存了所有的人物对象和人物的动作数组{obj:people, actions:actionArray} */
peopleList = new Array();
/* actionIndex是动作数组的索引  */
actionIndex = 0;
/* 暂停函数，数组元素为{index:index, pauseFunc:func} */
pauseList = new Array();

/**
 *暂停人物动作，执行函数f,如果需要继续人物动作，请在f中调用animationPlay继续动画 
 */
function addPauseCb(f){
    var max = 0;
    var actions;
    for(var i=0; i<peopleList.length; i++){
        actions = peopleList[i].actions;
        if (typeof actions == "object" && max < actions.length) {
            max = actions.length;
        };
    }
    var temp  = {pauseFunc:f, index:max};
    pauseList.push(temp);
}

function People(context, x, y) {
    var cx = x;
    var cy = y;
    var width = INIT_WIDTH;
    var height = INIT_HEIGHT;

    var actions = new Array();
    var node = {
        obj : this,
        actions : actions
    }
    peopleList.push(node);

    var image = new Image();
    image.src = url;
    var imageIntervalX = IMAGE_INTERVAL_X;
    var imageIntervalY = IMAGE_INTERVAL_Y;
    
    /* 重设人物位置 */
    this.setPosition = function(x, y){
        cx = x;
        cy = y;
        load(0, DIR_DOWN, cx, cy);
    }

    this.setScale = function(x, y) {
        if (x < 0 || y < 0) {
            return false;
        };
        this.width = this.width * x;
        this.width = this.height * y;
    }

    /**
     *向direction(上下左右)移动count次数
     */
    this.move = function(direction, count) {
        if (typeof(count) == "undefined") {
            count = 1;
        };
        for (var j = 0; j < count; j++) {
            for (var i = STEPS_PER_MOVE - 1; i >= 0; i--) {
                /* 添加动作到动作数组 */
                actions.push(new load(i, direction, cx, cy));
                switch(direction) {
                    case DIR_LEFT:
                        cx -= STEP_PX;
                        break;
                    case DIR_RIGHT:
                        cx += STEP_PX;
                        break;
                    case DIR_UP:
                        cy -= STEP_PX;
                        break;
                    case DIR_DOWN:
                        cy += STEP_PX;
                        break;
                }
            };
        };
    }
    
    plugins = new Array();
    function load(i, direction, x, y) {
        return function() {
            context.drawImage(image, i * imageIntervalX, direction * imageIntervalY, imageIntervalX, imageIntervalY, x, y, INIT_WIDTH, INIT_HEIGHT);
            for(var k =0; k<plugins.length; k++){
                var p = plugins[k];
                context.drawImage(p.image, p.x+x, p.y+y, p.width, p.height);
            }
        }
    }
    
    /**
     *在任务附近添加资源 
     */
    this.addPlugin = function(x, y, width, height,image, direction){
        switch(direction){
            case DIR_UP: 
                x += cx;
                break;
            case DIR_DOWN:
                y +=  height;
                break;
            case DIR_LEFT:
                break;
            case DIR_RIGHT:
                x += width;
                break;
            default:
                return null;
        }
        var plugin = {x:x, y:y, width:width, height:height, image:image};
        addPauseCb(function(){
            plugins.push(plugin);
            animationPlay();
        });
        
    }
    
    /**
     *移除已经添加在人物附近的资源 
     */
    this.removePlugin =  function(image){
        addPauseCb(function(){
            for (var i=0; i < plugins.length; i++) {
                if (plugins[i].image == image) {
                    plugins[i].x = CANVAS_WIDTH;
                };
            };
            animationPlay();
        });
    }
    this.show = new load(0, DIR_DOWN, cx, cy);
}
