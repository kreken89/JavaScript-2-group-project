const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases';
const email = document.querySelector('#email_input');
const subject = document.querySelector('#subject_input');
const message = document.querySelector('#message_input');
const form = document.querySelector('#task_form');

// GET

// function handleData(data){
//   console.log(data);
// }

// Wrappa in GET i function
// function showResult() {
// } 



// fetch('https://fnd22-shared.azurewebsites.net/api/Cases')
//   .then((res) => {

//       /* IF statement checks server response: .catch() does not do this! */

//     if (res.ok) {
//       console.log('HTTP request successful');
//     } else {
//       console.log('HTTP request unsuccessful');
//        }
//     return res;
//     })
//     .then((res) => res.json())
//     .then((data) => console.log(data)) // the data
//     .catch((error) => console.log(error)); // error handling

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

  // fetch('https://reqres.in/api/users/2', {
  //   method: 'PUT', // // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email: '',
  //     subject: '',
  //     message: ''
  //   }),
  // })
  //   .then((res) => {
  //     if (res.ok) {
  //       console.log('HTTP request successful');
  //     } else {
  //       console.log('HTTP request unsuccessful');
  //     }
  //     return res;
  //   })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));



// DELETE

// fetch('https://httpbin.org/anything', {
//   method: 'DELETE',
//   headers: {
//     'Content-type': 'application/json',
//   },
// })
//   .then((res) => {
//     if (res.ok) {
//       console.log('DELETE request successful');
//       return res;
//     } else {
//       console.log('DELETE request unsuccessful');
//     }
//     return res;
//   })
//   .then((res) => res.json())
//   .then((data) =>
//     document.getElementById('output').append(JSON.stringify(data))
//   )
//   .catch((error) => console.log(error));
