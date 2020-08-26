const baseUrl = process.env.REACT_APP_API_URL;

export const fetchNoToken = (endPoint, data, method = 'GET') => {
  const urlApi = `${baseUrl}/${endPoint}`;

  if (method === 'GET') {
    return fetch(urlApi);
  } else {
    return fetch(urlApi, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchToken = (endPoint, data, method = 'GET') => {
  const urlApi = `${baseUrl}/${endPoint}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET') {
    return fetch(urlApi, {
      headers: {
        'x-token': token,
      },
    });
  } else {
    return fetch(urlApi, {
      method,
      headers: {
        'x-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
