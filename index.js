
var canvas = document.getElementById('content');
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext('2d');
console.log(ctx);
var Element = function(o,width,height,background){
    this.o = o;
    this.width = width;
    this.height = height;
    this.background = background;
    this.border = "#fff";
    this.borderWidth = 10;
    this.selected = false;
};

Element.prototype.draw = function(){
    ctx.fillStyle = this.background;
    ctx.fillRect(this.o.x, this.o.y, this.width, this.height);
    if(this.selected){
        ctx.strokeStyle = this.border;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.o.x, this.o.y, this.width, this.height); 
    }
};

Element.prototype.contains = function(x,y){
    if((this.o.x <= x && x <= this.o.x+this.width) && (this.o.y <= y && y <= this.o.y+this.height)){
        return true;
    }
    return false;
};


var container = [];

container.push(new Element({x:10, y:10},100,100,'#000'));
container.push(new Element({x:150, y:150},100,100,'red'));

for(var i=0; i<container.length; i++){
    container[i].draw();
}

canvas.addEventListener('click',function(e){
    ctx.clearRect(0, 0, 500, 500);
    for(var i=0; i<container.length; i++){
        container[i].selected = false;
        if(container[i].contains(e.x,e.y)){
            container[i].selected = true;
        }
        container[i].draw();
    }
});