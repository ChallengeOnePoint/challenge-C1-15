var get = require('get-json-plz');

export function getContact() {
  return get('http://localhost:8080/api/contacts', (err, data) => {
    return data
  })
}

/*
export function getContact() {
  const headers = {
    'Content-Type': 'application/json'
  };
  const props = {
    method: 'GET',
    headers: headers,
    mode: 'cors'
  };
 fetch('http://localhost:8080/api/contacts', props)
    .then(res => res.json())
    .then(json => dispatch({
      type: GET_CONTACT,
      payload: json
    }));
}
*/
