export function getLastItem(ruta) {

  // Utilizar una expresión regular para encontrar la última palabra
  const match = ruta.match(/\/(\w+)\/?$/);

  // Verificar si se encontró coincidencia
  if (match && match[1]) {
    return match[1];
  } else {
    // Devolver el mismo string si no se encuentra ninguna coincidencia
    return ruta;
  }
  
}

export default getLastItem;
