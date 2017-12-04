(function(RPG){
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

    RPG.Character = Character;
})(RPG)