export const getService = () => {
  return fetch('http://10.35.3.44:8083/api/fact/familiesProveidor',{
    method: 'GET'
  }).then(response => response.json());
};

export const deleteService = () => {
  return fetch('http://10.35.3.44:8083/api/fact/familiesProveidor/eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOiJQUlVFIn0=',{
    method: 'DELETE'
  }).then(response => response.json());
};

export const createService = ({body}) => {
  return fetch('http://10.35.3.44:8083/api/fact/familiesProveidor',{
    method: 'POST',
    body: body
  }).then(response => response.json());
};

export const updateService = ({body}) => {
  return fetch('http://10.35.3.44:8083/api/fact/familiesProveidor/eyJpZGVudGlmaWNhZG9yQ29kaSI6IkxJTSIsImNvZGkiOiJQUlVFIn0=',{
    method: 'PUT',
    body: body
  }).then(response => response.json());
};

