
interface Variables {
   puntuacion:number,
   paloCartasMesa:number[],
   cartasMesa:number[],
};

interface CartasBaraja {
   copas: number[];
   oros: number[];
   bastos: number[];
   espadas: number[];
}

export type Imagen = {
   src?: string,
   alt?: string,
};


export const variable:Variables = {

   puntuacion: 0,
   paloCartasMesa: [],   // Guarda el palo de cada carta repartida
   cartasMesa: [],       //Guarda el número de cada carta repartida

}

export const baraja:CartasBaraja = {
      copas: [],
      oros: [],
      bastos: [],
      espadas: [],
   }

export const palos:string[]= ['copas', 'oros', 'bastos', 'espadas'];

// Propiedades del objeto utilizado en cambiaPropiedadesImagen()
export const urlImages:string= "./src/images";