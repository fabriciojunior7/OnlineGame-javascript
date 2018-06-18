var socket;
var tela;
var players = [];
var eu;

function setup(){
    socket = io.connect("localhost:3000");
    //Recebidos
    //socket.on("listaJogadores", listaJogadores);
    socket.on("atualizarServidor", atualizarServidor);
    //Outros
    tela = createCanvas(640, 480);
    frameRate(30);
    eu = new Player(round(random(5, 635)), round(random(5, 475)));
    //Enviador
    novoJogador(eu);
}

function draw(){

}

function mousePressed(){
    eu.x = mouseX;
    eu.y = mouseY;
    socket.emit("atualizarPosicao", eu);
}

//CONEXOES
function novoJogador(j){
    socket.emit("novoJogador", j);
}

function listaJogadores(lista){
    players = lista;
}

function atualizarServidor(dados){
    background(0);
    for(var i=0; i< dados.length; i++){
        noStroke();
        fill(255, 0, 0);
        ellipse(dados[i].x, dados[i].y, 10, 10);
        text(""+dados[i].id, dados[i].x-60, dados[i].y-10);
    }
    eu.desenhar();
}