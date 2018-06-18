function Player(x, y){

    //ATRIBUTOS
    this.x = x;
    this.y = y;

    //METODOS
    this.desenhar = function(){
        noStroke();
        fill(255);
        ellipse(this.x, this.y, 10, 10);
    }

}