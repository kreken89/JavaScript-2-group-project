const id = new URLSearchParams(window.location.search).get('id');
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments/';
const wrapper = document.querySelector('.container_details');
const form = document.querySelector('.userInput')
const caseStatus = document.querySelectorAll('button')
let statusID = ''

let newStatus = {}

// caseStatus.addEventListener('click', (e) =>{
//     e.preventDefault();

//     newStatus = {
//       id: id,
//       statusId: e.target.id
//     }
// })


let newComment = {}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    newComment = {
      id: id,
      email: document.querySelector('.emailInput').value,
      message: document.querySelector('.messageInput').value,
    };
  
    console.log(JSON.stringify(newComment));
  
    
  });



const getCase = () => {
    return fetch(CASE_URL + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        email = data.email
        statusID = data.status.id
        console.log(statusID);
        wrapper.innerHTML =
        `
            <div class="inline">
                <div class="statusInfo">
                 <button id="3" class="green status">Avslutad</button>
                 <button id="2" class="orange status">Pågående</button>
                 <button id="1" class="red status">Ej påbörjad</button>
                </div>
                <span class="time_add">${data.created
                  .replace('T', ' ')
                  .substring(0, 16)}</span>
            </div>
            <div class="card">
                <h2>${data.subject}</h2>
                <p class="p_details">${data.email}</p>
                <p class="p_details">${data.message}</p>
                <br>
                
                
            </div>
            <h2>Comments:</h2>
            
            ` + wrapper.innerHTML

            const commentList = document.createElement('ul')
            commentList.className = 'commentList'
            wrapper.appendChild(commentList)
            console.log(data.comments.length)
            for(let i = 0; i<data.comments.length; i++){
                const comment = document.createElement('li')
                comment.className = 'comment'
                comment.innerText = `${data.comments[i]}`
                commentList.appendChild(comment)
            }
            
            return data

      });
  };

  const postComment = () => {
    return fetch(COMMENT_URL, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      })
      .then((res) => res.json())
      .then((data) => {
        
      })
      .catch((err) => console.log(err));
  }

  const putStatus = () => {
    return fetch(CASE_URL + id, {
      method: 'PUT',
      body: JSON.stringify(newStatus),
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

      })
      .catch((err) => console.log(err));
  }

  getCase()


  