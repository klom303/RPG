var canvas = document.getElementById('content');
canvas.width = 700;
canvas.height = 700;
var ctx = canvas.getContext('2d');
console.log(ctx);


// ========================== MAP START ==========================

var Map = function(config){
    this.pixelSize = { x: 1000, y:1000 };
    this.block = { x: 50, y: 50 };
    this.maxX = Math.ceil(this.pixelSize.x / this.block.x);
    this.maxY = Math.ceil(this.pixelSize.y / this.block.y);
    this.config = config;
    this.earth = document.getElementById('earth');
    this.grass = document.getElementById('grass');
    this.characters = [];
    this.self = null;
    this.o = { x: 0 ,y: 0 };
}

Map.prototype.coorToPixel = function(x , y){
    return {
        x: x* this.block.x,
        y: y* this.block.y
    };
}

Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.o.x, this.o.y);
    ctx.clearRect(-2000, -2000, 4000, 4000);
    ctx.drawImage(this.earth, 0, 0, 500, 500, 0, 0, this.pixelSize.x, this.pixelSize.y);
    for(var y = 0; y< this.maxY; y++){
        for(var x = 0; x< this.maxX; x++){
            if(this.config[y]!=undefined && this.config[y][x] == 1 ){
                var startPoint = this.coorToPixel(x,y);
                var size = this.coorToPixel(1,1);
                ctx.drawImage(this.grass, 0, 0, 50, 50, startPoint.x, startPoint.y, size.x, size.y);
            }
        }
    }
    for(var i=0; i<this.characters.length; i++){
        var character = this.characters[i];
        var startPoint = this.coorToPixel(character.position.x,character.position.y);
        var size = this.coorToPixel(character.block.x,character.block.y);
        ctx.drawImage(character.characterPic, 0, 0, 50, 62, startPoint.x, startPoint.y, size.x, size.y);
    }
    ctx.restore();
};

Map.prototype.hasObstacle = function(x, y){
    if(this.config[y]!=undefined && this.config[y][x]>0){
        return true;
    }
    return false;
};

Map.prototype.addCharacter = function(character, isSelf=false){
    this.characters.push(character);
    if(isSelf){
        this.self = character;
    }
};

Map.prototype.move = function(dx , dy){
    var desX = this.self.position.x + dx;
    var desY = this.self.position.y + dy;
    if(!this.hasObstacle(desX,desY)){
        this.self.position.x += dx;
        this.self.position.y += dy;

        this.o.x -= dx * this.block.x;
        this.o.y -= dy * this.block.y;
    }
    this.self.moveDirection(dx,dy);
    this.draw();
}

// ========================== MAP END ==========================

// ========================== CHARACTER START ==========================

var Character = function(){
    this.block = {x:1, y:1};
    this.characterPicDirection = {
        Front: document.getElementById('characterFront'),
        Back: document.getElementById('characterBack'),
        Left: document.getElementById('characterLeft'),
        Right: document.getElementById('characterRight')        
    };
    this.characterPic = this.characterPicDirection.Front;
    this.position = {x:7, y:7};
};

Character.prototype.moveDirection = function(dx,dy){
    if(dx>0){
        this.characterPic = this.characterPicDirection.Right;
    }else if (dx<0){
        this.characterPic = this.characterPicDirection.Left;
    }
    if(dy>0){
        this.characterPic = this.characterPicDirection.Front;
    }else if (dy<0){
        this.characterPic = this.characterPicDirection.Back;
    }
}

// ========================== CHARACTER END ==========================


// var config = [
//     [1,1,1,1,1,1,1,1,1,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,1,1,1,0,1],
//     [1,0,0,0,0,1,0,1,0,1],
//     [1,0,0,0,0,1,1,1,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,1,1,1,1,1,1,1,1,1]
// ];

var config = [];

for(var y = 0; y< 20; y++){
    for(var x = 0; x< 20; x++){
        if(y == 0 || y==19 || x == 0 || x==19){
            if(config[y]!=undefined){
                config[y][x] = 1;
            }else{
                config[y] = [];
                config[y][x] = 1;
            }
        }
    }
}


var map = new Map(config);
var c = new Character();
map.addCharacter(c, true);
map.draw();

document.onkeydown = function(e){
    if(e.keyCode == 38){
        // console.log('上');//y-1
        map.move(0, -1);
    }
    if(e.keyCode == 40){
        // console.log('下');//y+1
        map.move(0, 1);        
    }
    if(e.keyCode == 37){
        // console.log('左');//x-1
        map.move(-1, 0);        
    }
    if(e.keyCode == 39){
        // console.log('右');//x+1
        map.move(1, 0);                
    }
};