(function(RPG){
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
    
    RPG.Map = Map;

})(RPG);