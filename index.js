let contador = 1;
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

let $ronda = document.querySelector("#ronda");
const $mensaje = document.querySelector("#mensaje");

document.querySelector("#boton-jugar").onclick = manejarTurnos;

function manejarTurnos(){
    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;
    
    ocultarMensajeError();
    anularJugador();
    jugadaMaquina();
    actualizarContador();
    mostrarSecuenciaMaquina(secuenciaMaquina);
    
    setTimeout(() => {
        escucharJugador()
    }, RETRASO_TURNO_JUGADOR);

};


function escucharJugador() {
    Object.values(colores).forEach((value) => {
        value.addEventListener('click', switchJugador);
    });

    secuenciaJugador = [];
};


function anularJugador() {
    Object.values(colores).forEach((value) => {
        value.removeEventListener('click', switchJugador);
    });
};


function switchJugador() {
    const demoraEnApagar = 300;
    const color = Object.values(colores).indexOf(this); 

        secuenciaJugador.push(Number(Object.keys(colores)[color]));
        encenderLuz(this);
        setTimeout(() => {apagarLuz(this)}, demoraEnApagar);

        if(secuenciaMaquina.length === secuenciaJugador.length){
            setTimeout(() => {
                pasarDeRonda()
            }, 1000);
        };
        
};


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
};


function jugadaMaquina() {
    secuenciaMaquina.push(seleccionMaquina());
};

function seleccionMaquina() {
    return Math.floor(Math.random() * 4) + 1;
};

function compararJugadas(maquina, jugador) {
    return JSON.stringify(maquina) === JSON.stringify(jugador);
};

function pasarDeRonda() {
    if(compararJugadas(secuenciaMaquina, secuenciaJugador)) {
        contador++;
        manejarTurnos();
    } else {
        mostrarMensajeError();
        reiniciar();
    }
};

function reiniciar(){
    contador = 1;
    secuenciaMaquina = [];
    $ronda.innerText = "";
}

function actualizarContador(){
    $ronda.innerText = `Ronda: ${contador}`;    
}

function encenderLuz(color) {
    color.classList.remove("apagado");
    color.classList.add("encendido");
}

function apagarLuz(color) {
    color.classList.remove("encendido");
    color.classList.add("apagado");
}

function mostrarMensajeError() {
    $mensaje.className = "";
}

function ocultarMensajeError() {
    $mensaje.className = "oculto";
}