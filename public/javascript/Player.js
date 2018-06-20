function Player(x, y){

    //ATRIBUTOS
    this.x = x;
    this.y = y;
    this.velocidade = 4;
    this.wasd = [false, false, false, false];
    this.id = "";

    //METODOS
    this.desenhar = function(){
        this.mover();
        noStroke();
        fill(255);
        text(""+this.id, this.x-60, this.y-10);
        ellipse(this.x, this.y, 10, 10);
    }

    this.mover = function(){
        //EIXO Y
        if(this.wasd[0]){
            this.y -= this.velocidade;
        }
        else if(this.wasd[2]){
            this.y += this.velocidade;
        }
        
        //EIXO X
        if(this.wasd[1]){
            this.x -= this.velocidade;
        }
        else if(this.wasd[3]){
            this.x += this.velocidade;
        }

        socket.emit("atualizarPosicao", this);
    }

    this.botaoPressionado = function(key){
        //EIXO Y
        if(key == 38 || key == 87){
            this.wasd[0] = true;
        }
        else if(key == 40 || key == 83){
            this.wasd[2] = true;
        }

        //EIXO X
        if(key == 37 || key == 65){
            this.wasd[1] = true;
        }
        else if(key == 39 || key == 68){
            this.wasd[3] = true;
        }
    }

    this.botaoSolto = function(key){
        //EIXO Y
        if(key == 38 || key == 87){
            this.wasd[0] = false;
        }
        else if(key == 40 || key == 83){
            this.wasd[2] = false;
        }

        //EIXO X
        if(key == 37 || key == 65){
            this.wasd[1] = false;
        }
        else if(key == 39 || key == 68){
            this.wasd[3] = false;
        }
    }

}