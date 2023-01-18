const id = new URLSearchParams(window.location.search).get('id')
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments/';
const wrapper = document.querySelector('.container_details');
const form = document.querySelector('.userInput')


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
        wrapper.innerHTML =
        `
            <div class="inline">
                <ul>
                    <li class="green status">Avslutad</li>
                    <li class="orange status">Pågående</li>
                    <li class="red status">Ej påbörjad</li>
                </ul>
                <span class="time_add">${data.created.replace('T', ' ').substring(0, 16)}</span>
            </div>
            <div class="card">
                <h2>${data.subject}</h2>
                <p>${data.email}</p>
                <p>${data.message}</p>
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

  getCase()


  