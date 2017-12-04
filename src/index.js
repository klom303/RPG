var canvas = document.getElementById('content');
canvas.width = 700;
canvas.height = 700;
var ctx = canvas.getContext('2d');
console.log(ctx);

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


var map = new RPG.Map(config);
var c = new RPG.Character();
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