const id = new URLSearchParams(window.location.search).get('id')
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const wrapper = document.querySelector('.wrapper');

console.log(id)
console.log(CASE_URL + id)

const getCase = () => {
    return fetch(CASE_URL + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        wrapper.innerHTML =
        `<div id="output" class="container_details">
            <div class="card bg-secondary p-2 text-white">
            <h2>${data.subject}</h2>
            <p>${data.message}</p>
            
        </div>
        
        `

      });
  };
  getCase()

/* <div id="output" class="container_details">
    <div class="card bg-secondary p-2 text-white">
    <h2>Case details</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, similique....</p>
</div> */