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

//Prueba del event listener

Object.values(colores).forEach((value, i) => {
    value.addEventListener('click', function() {
        secuenciaJugador.push(Object.keys(colores)[i]);
        encenderLuz(value);
        setTimeout(() => {apagarLuz(value)}, 300);
    });
});
    

function mostrarSecuenciaMaquina(secuencia) {
    const demora = 1000;
    let tiempo = demora;

    for(let i = 0; i < secuencia.length; i++){
        setTimeout(() => {
            encenderLuz(colores[secuencia[i]]);
                setTimeout(() => {
                    apagarLuz(colores[secuencia[i]]);
                }, demora);
        }, tiempo);
        tiempo += demora * 2;
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