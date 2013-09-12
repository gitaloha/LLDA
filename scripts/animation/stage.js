STAGE_IMAGE_WIDTH = 1024;
STAGE_IMAGE_HEIGHT = 768;

function Stage(context, url){
    var image =  new Image();
    image.url = url;
    this.draw = function(){
        context.drawImage(image, 0, 0, STAGE_IMAGE_WIDTH, STAGE_IMAGE_HEIGHT, 0, 0, 800, 600);
    };
    image.onload = this.draw();
}

function setBackgroud(context, url){
    var image =  new Image();
    image.src = url;
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
