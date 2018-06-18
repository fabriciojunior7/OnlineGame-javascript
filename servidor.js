//Requisitos
var express = require("express");
var app = express();
var servidor = app.listen(3000);
app.use(express.static("public"));
var socket = require("socket.io");
var io = socket(servidor);

//Rodando
console.log("\n\n\n==========");
console.log("Servidor Rodando...");
console.log("==========\n\n\n");

//Logando
io.sockets.on("connection", novaConexao);

//ATUALIZAR SERVIDOR
setInterval(atualizarServidor, 35);
function atualizarServidor(){
    io.sockets.emit("atualizarServidor", players);
}

//Variaveis
var players = [];

//METODOS
function novaConexao(socket){
    console.log("Nova Conexao: "+socket.id);

    //RECEBIDOS
    socket.on("novoJogador", novoJogador);
    function novoJogador(j){
        players.push(new Player(socket.id, j.x, j.y));
        console.log("Jogadores Online: "+players.length+"\n");
    }

    socket.on("atualizarPosicao", atualizarPosicao);
    function atualizarPosicao(j){
        for(var i=0; i<players.length; i++){
            if(players[i].id == socket.id){
                players[i].x = j.x;
                players[i].y = j.y;
            }
        }
    }

    //DESCONECTAR
    socket.on("disconnect", function(){
        //console.log("Desconexao: " + socket.id)
        for(var i=0; i<players.length; i++){
            if(players[i].id == socket.id){
                players.splice(i, 1);
            }
        }
        console.log("Jogadores Online: "+players.length+"\n");
    });
}

//CLASSES
function Player(id, x, y){
    //Atributos
    this.id = id;
    this.x = x;
    this.y = y;
    //Metodos
    this.atualizar = function(x, y){
        this.x = x ;
        this.y = y;
    }
}