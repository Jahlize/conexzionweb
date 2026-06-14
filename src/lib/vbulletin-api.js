/**
 * vBulletin 6 - obtiene temas recientes desde el PHP proxy del servidor
 * El PHP corre server-side así que no tiene problema de CORS con la API de vBulletin
 */

const PHP_ENDPOINT = 'https://conexzion.cl/obtener_foro.php';

/**
 * Obtiene los últimos temas del foro vía PHP proxy (RSS)
 */
export async function getLatestTopics(count = 10) {
  const res = await fetch(PHP_ENDPOINT);
  const data = await res.json();
  return (data?.temas || []).slice(0, count).map(t => ({
    titulo: t.titulo,
    autor: t.autor,
    url: t.url,
    imagen: t.imagen || null,
  }));
}