import { variable, urlImages, baraja, palos, Imagen } from "../models/model";
import {generaNumAleatorio, gestionCartasObtenidas, obtenerPuntosCarta, sumarPuntuacion } from "../controllers/motor";

//Inicialización de variables de elemento
const btnReparteCarta= document.getElementById("dameCarta");
const btnPlantarse = document.getElementById("plantarse");
const btnReset = document.getElementById("reset");
const btnPregunta = document.getElementById("pregunta");

const divAvisos = document.getElementById("avisos");
const divMarcador = document.getElementById("marcador");
const divZonaCartas = document.getElementById("zona-cartas");

const imgMazo = document.getElementById("img-mazo");


export const botones = ():void => {
   (btnReparteCarta instanceof HTMLButtonElement) && 
      btnReparteCarta.addEventListener("click", () => { dameCarta(0); });

   (btnPlantarse instanceof HTMLButtonElement) && 
      btnPlantarse.addEventListener("click",handlePlantarse);

   (btnReset instanceof HTMLButtonElement) && 
      btnReset.addEventListener("click", nuevaPartida);

   (btnPregunta instanceof HTMLButtonElement) &&
      btnPregunta.addEventListener("click", () => { dameCarta(1); });
}

/**
 * Inicializa la partida al finalizar carga del DOM y resetea partida existente.
 */
export const nuevaPartida = ():void => {
   
   variable.puntuacion = 0;
   variable.paloCartasMesa = [];
   variable.cartasMesa = [];
   baraja.copas = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
   baraja.oros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
   baraja.bastos = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
   baraja.espadas = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
   
   if (divMarcador instanceof HTMLDivElement 
      && divAvisos instanceof HTMLDivElement
      && divZonaCartas instanceof HTMLDivElement){
         removeClass(divAvisos, ["win","bajo","gameOver"]);
         removeClass(divMarcador, ["win","bajo","gameOver"]);
         cambiaContenidoDiv(divAvisos, "");
         cambiaContenidoDiv(divMarcador, variable.puntuacion.toString());
         cambiaContenidoDiv(divZonaCartas, "");
   }
   
   if (imgMazo instanceof HTMLImageElement){
      removeClass(imgMazo, ["rotarCarta"]);
      cambiaPropiedadesImagen(imgMazo, {src: "back.jpg", alt:"Baraja completa"});
      
   }
   if (btnReparteCarta instanceof HTMLButtonElement 
         && btnPlantarse instanceof HTMLButtonElement
         && btnPregunta instanceof HTMLButtonElement){
            handleDisabledButton(btnReparteCarta, false);
            handleDisabledButton(btnPlantarse, true);
            handleDisabledButton(btnPregunta, true);
   }  
}


/**
 * Se obtiene el palo de la carta a elegir de forma aleatoria.
 * gestionCartasObtenidas le pasa el array de cartas del palo elegido y el número de posición
 * del palo según const palos:string[] 
 * @param: opcion: 0-> Nueva carta / 1-> ¿Qué hubiera pasado?
 */
export const dameCarta = (opcion:number):void => {

   let posicionPaloElegido = generaNumAleatorio(4);   // Posición del palo elegido según array
   let posicionCartaElegida:number = -1;              // Posición de la carta elegida según array del palo
   let cartasPaloElegido:number[] = [];               // Array de cartas del palo elegido según posición aleatoria obtenida.
   let numeroCartaObtenida:number = -1;               // Número de carta obtenida según posición en array
 
   switch (posicionPaloElegido){
      case 0:
         posicionCartaElegida = generaNumAleatorio(baraja.copas.length);
         cartasPaloElegido = baraja.copas;         
         break;
      case 1:
         posicionCartaElegida = generaNumAleatorio(baraja.oros.length);
         cartasPaloElegido = baraja.oros;
         break;
      case 2:
         posicionCartaElegida = generaNumAleatorio(baraja.bastos.length);
         cartasPaloElegido = baraja.bastos;
         break;
      case 3:
         posicionCartaElegida = generaNumAleatorio(baraja.espadas.length);
         cartasPaloElegido = baraja.espadas;
         break;
   }
   
   numeroCartaObtenida = gestionCartasObtenidas(cartasPaloElegido, posicionCartaElegida, posicionPaloElegido);
   
   if (opcion === 0){
         generaCarta(palos[posicionPaloElegido], numeroCartaObtenida);
         let puntos = obtenerPuntosCarta(numeroCartaObtenida);
         variable.puntuacion = sumarPuntuacion(puntos);
         (divMarcador instanceof HTMLDivElement) && cambiaContenidoDiv(divMarcador, variable.puntuacion.toString());    // Actualiza puntuación en marcador
         (variable.puntuacion > 7.5) && handlePlantarse();   // Deshabilita botones y muestra mensaje de aviso
      }else{
         pregunta(palos[posicionPaloElegido], numeroCartaObtenida);
      }
   
}


/**
 * Habilita / Deshabilita el botón pasado por parámetro.
 * 
 * @param boton Objeto del botón recibido
 * @param habilitado Parámetro true | false para disabled
 */
export const handleDisabledButton = (boton:object, habilitado:boolean):void => { 
   if (boton instanceof HTMLButtonElement){
      boton.disabled = habilitado;
   }
};

/**
 * Añade clase/s CSS a un elemento HTML
 * @param elemento Objeto del elemento
 * @param clases Array de clase o clases a añadir
 */
export const addClass = (elemento:object, clases:string[]) => {
   if (elemento instanceof HTMLDivElement){
      elemento.classList.add(...clases);
   }
   if (elemento instanceof HTMLImageElement){
      elemento.classList.add(...clases);
   }
}

/**
 * Elimina clase/s CSS a un elemento HTML
 * @param elemento Objeto del elemento
 * @param clases Array de clase o clases a eliminar
 */
export const removeClass = (elemento:object, clases:string[]) => {
   if (elemento instanceof HTMLDivElement){
      elemento.classList.remove(...clases);
   }
   if (elemento instanceof HTMLImageElement){
      elemento.classList.remove(...clases);
   }
}

export const cambiaContenidoDiv = (elemento:object, contenido:string) => {
   (elemento instanceof HTMLDivElement) && (elemento.innerHTML = contenido);
}


/**
 * Una vez elegido de forma aleatoria el palo y número de carta, carga elemento
 * DIV con la imagen de la carta elegida.
 */
export const generaCarta = (palo:string, cartaRepartida:number):void => {
   const divCarta = document.createElement('div');
   const nuevaImagen = document.createElement("img");
      
   (btnPlantarse instanceof HTMLButtonElement) && handleDisabledButton(btnPlantarse, false);    // Habilita botón de plantarse una vez generada al menos una carta

   if (divZonaCartas instanceof HTMLDivElement && divCarta instanceof HTMLDivElement && nuevaImagen instanceof HTMLImageElement){
      addClass(divCarta, ["carta"]);
      cambiaPropiedadesImagen(nuevaImagen, {
               src: `${palo}/${cartaRepartida}.jpg`,
               alt: `Carta obtenida. ${cartaRepartida} de ${palo}` });
      
      divZonaCartas.appendChild(divCarta);
      divCarta.appendChild(nuevaImagen);          
   }
}

/**
 * Añade src y alt al elemento imagen recibido
 * @param imagen :objeto imagen
 * @param propiedades src? y alt? 
 */
export const cambiaPropiedadesImagen = (imagen:object, propiedades:Imagen) => {
   
   if (imagen instanceof HTMLImageElement){
      if (propiedades.src){
         imagen.src = `${urlImages}/${propiedades.src}`;
      }
      if (propiedades.alt){
         imagen.alt = propiedades.alt;
      }
   }
}

/**
 * Muestra aviso con el texto recibido y cambia la clase CSS (win / gameOver) de elementos para mostrar
 * colores según corresponda.
 * @param texto Texto a mostrar como aviso
 * @param resultadoOK
 *    1 (Naranja): Puntuación >= 1 y < 5
 *    2 (Verde): Puntuación >= 6 y <= 7.5
 *    3 (Rojo): Puntuación > 7.5 (Game Over)
 */
export const muestraAvisos = (texto:string, resultadoOK:number):void => {
      
   if (divAvisos instanceof HTMLDivElement){
      cambiaContenidoDiv(divAvisos, texto);

      (resultadoOK === 1) && addClass(divAvisos, ["bajo"]);
      (resultadoOK === 2) && addClass(divAvisos, ["win"]);
      (resultadoOK === 3) && addClass(divAvisos, ["gameOver"]);         
   }   
}

/**
 * Se ejecuta al pulsar botón Plantarse. Comprueba puntuación actual y solicita que se muestre el aviso que corresponda y aplique estilos.
 */
export const handlePlantarse = ():void => {
   
   (btnPregunta instanceof HTMLButtonElement) && handleDisabledButton(btnPregunta, false);

   if (divMarcador instanceof HTMLDivElement){
      if (variable.puntuacion < 5){
         muestraAvisos("Has sido muy conservador",1);
         addClass(divMarcador, ["bajo"]);
      }else if (variable.puntuacion >= 5 && variable.puntuacion < 6){
         muestraAvisos("¿Te ha entrado el canguelo eh?",1);
         addClass(divMarcador, ["bajo"]);
      }else if (variable.puntuacion >= 6 && variable.puntuacion <= 7){
         muestraAvisos("Casi casi...",2);
         addClass(divMarcador, ["win"]);
      }else if (variable.puntuacion === 7.5){
         muestraAvisos("¡Lo has clavado! ¡Enhorabuena!",2);
         addClass(divMarcador, ["win"]);
         (btnPregunta instanceof HTMLButtonElement) && handleDisabledButton(btnPregunta, true);
      }else if (variable.puntuacion > 7.5){
         muestraAvisos("¡GAME OVER!", 3);
         addClass(divMarcador, ["gameOver"]);
         (btnPregunta instanceof HTMLButtonElement) && handleDisabledButton(btnPregunta, true);
      }
      
   }   
   (btnPlantarse instanceof HTMLButtonElement) && handleDisabledButton(btnPlantarse, true);
   (btnReparteCarta instanceof HTMLButtonElement) && handleDisabledButton(btnReparteCarta, true);
      
}

/**
 * Una vez detenida la partida, se ejecuta al pulsar botón de ¿Qué hubiera pasado?
 * Ejecuta función dameCarta() para obtener palo y carta pero evita que se muestren
 *    y se guarda en cartaPerdida:object {palo, carta}
 */
export const pregunta = (palo:string, cartaPerdida:number):void => {
   
   if (imgMazo instanceof HTMLImageElement){
      addClass(imgMazo, ["rotarCarta"]);
      setTimeout(() => {
         cambiaPropiedadesImagen(imgMazo, {
            src: `${palo}/${cartaPerdida}.jpg`,
            alt: "Siguiente carta que hubiera salido sin plantarse"
               }
         );
      },500);
      setTimeout(() => {
         removeClass(imgMazo, ["rotarCarta"]);
      },500);
      
      (btnPregunta instanceof HTMLButtonElement) && handleDisabledButton(btnPregunta, true);
   }
}