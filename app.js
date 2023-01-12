// API kay
// https://fnd22-shared.azurewebsites.net/swagger/index.html

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';
// const CASSEID_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases{id}';
// const COMMENTS_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';
// const STATUSES_URL = 'https://fnd22-shared.azurewebsites.net/api/Statuses';

// GET

// function handleData(data){
//   console.log(data);
// }

// Wrappa in GET i function
// function showResult() {
// }  

fetch('https://fnd22-shared.azurewebsites.net/api/Cases')
  .then((res) => {

      /* IF statement checks server response: .catch() does not do this! */

    if (res.ok) {
      console.log('HTTP request successful');
    } else {
      console.log('HTTP request unsuccessful');
       }
    return res;
    })
    .then((res) => res.json())
    .then((data) => console.log(data)) // the data
    .catch((error) => console.log(error)); // error handling

  /* .catch handles a failure with fetch (e.g. syntax error, no internet connection) */


// POST


fetch('https://reqres.in/api/users', {
  method: 'POST', // // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({ 
    email: '',
    subject: '',
    message: '',
 }),
})
  .then((res) => {
    if (res.ok) {
      console.log('HTTP request successful');
    } else {
      console.log('HTTP request unsuccessful');
    }
    return res;
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// PUT

  fetch('https://reqres.in/api/users/2', {
    method: 'PUT', // // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: '',
      subject: '',
      message: ''
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log('HTTP request successful');
      } else {
        console.log('HTTP request unsuccessful');
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));



// DELETE
