const BASE_URL = '//localhost:8000/';

export async function get(ruta) {
  const resp = await fetch(`${BASE_URL}${ruta}`, {
    method: 'GET',
    mode: 'cors',
  });
  return resp.json();
}

export default get;
