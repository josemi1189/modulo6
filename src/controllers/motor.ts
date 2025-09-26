import { variable } from "../models/model";
// import: , urlImages, baraja, palos, Imagen


/**
 * Genera un número aleatorio desde 0 hasta el límite recibido por parámetro.
 * @param limite Indica el límite de rango disponible para obtener un número aleatorio.
 * @returns Devuelve número entero entre 0 y número recibido por parámetro -1.
 */
export const generaNumAleatorio = (limite:number):number => {
   return Math.floor(Math.random() * limite);
}


export const obtenerPuntosCarta = (carta:number):number => {
   if (carta >= 10 && carta <= 12){
      return 0.5;
    }else{
      return carta;
    }
}

export const sumarPuntuacion = (puntosCarta:number):number => {
   return variable.puntuacion + puntosCarta;
}


/** Recibe array de cartas del palo elegido y posición del palo.
 *  Obtiene posición de la carta de forma aleatoria y lo elimina de su array.
 *  Guarda índice del palo y número de carta sobre los arrays:
 *    paloCartasMesa:number[]: Guarda la posición de la carta que corresponda al palo 
 *       - 0: copas
 *       - 1: oros
 *       - 2: bastos
 *       - 3: espadas
 *    cartasMesa:number[]: Guarda el valor de la carta obtenida y el palo coincide en misma posición de paloCartasMesa.
 * 
 * @param cartas Array del objeto 'baraja' que corresponde al palo seleccionado aleatoriamente.
 * @param paloElegido Posición del array "0-3" obtenida aleatoriamente para guardar en 'paloCartasMesa'
 * @return Devuelve el número de carta obtenido.
 **/
export const gestionCartasObtenidas = (cartas:number[], posicionCartaElegida:number, paloElegido:number):number => {
   /*
   let posicionCarta:number = generaNumAleatorio(cartas.length);
   let cartaObtenida:number = cartas[posicionCarta];
*/
   const numeroCartaObtenida:number = cartas[posicionCartaElegida];
   variable.cartasMesa.push(numeroCartaObtenida);        // Guarda la carta obtenida
   variable.paloCartasMesa.push(paloElegido);            // Guarda el palo obtenido
   cartas.splice(posicionCartaElegida,1);                // Elimina la carta ya obtenida del array inicial

   return numeroCartaObtenida;
}