import { BASE_URL } from '../constants';

async function API(path, options) {
  path = `${BASE_URL}/${path}`;

  const response = await fetch(path, options);
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data;
}

API.options = (method, data) => {
  method = method.toUpperCase();
  let options = { method };
  if (data && method.localeCompare('DELETE') !== 0)
    options = {
      method,
      body: JSON.stringify(data),
      header: {
        'Content-Type': 'application/json',
      },
    };

  return options;
};

export default API;
