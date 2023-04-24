let contador = 0;
let secuenciaMaquina = [];
let secuenciaJugador = [];

const $amarillo = document.getElementById("amarillo");
const $azul = document.getElementById("azul");
const $verde = document.getElementById("verde");
const $rojo = document.getElementById("rojo");

const colores = {
    1 : $amarillo,
    2 : $azul,
    3 : $verde,
    4 : $rojo,
};

function mostrarSecuenciaMaquina(secuencia) {
    for(let i = 0; i < secuencia.length; i++){
        encenderLuz(colores[secuencia[i]]);
        apagarLuz(colores[secuencia[i]]);
    }
}

function jugadaMaquina() {
    secuenciaMaquina.push(seleccionMaquina());
}

function seleccionMaquina() {
    return Math.floor(Math.random() * 4) + 1;
};

function compararJugadas(maquina, jugador) {
    return JSON.stringify(maquina) === JSON.stringify(jugador);
};

function pasarDeRonda() {
    if (compararJugadas(secuenciaMaquina, secuenciaJugador)) {
        contador++;
    } /*else {
        Una función que de un mensaje de error(?)
    }*/
};

function encenderLuz(color) {
    color.classList.remove("apagado");
    color.classList.add("encendido");
}

function apagarLuz(color) {
    color.classList.remove("encendido");
    color.classList.add("apagado");
}