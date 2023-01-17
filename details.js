const id = new URLSearchParams(window.location.search).get('id')
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const wrapper = document.querySelector('.container_details');

console.log(id)
console.log(CASE_URL + id)

const getCase = () => {
    return fetch(CASE_URL + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        wrapper.innerHTML = `
            <div class="inline">
                <div class="statusInfo">
                 <button class="green status">Avslutad</button>
                 <button class="orange status">Pågående</button>
                 <button class="red status">Ej påbörjad</button>
                </div>
                <span class="time_add">${data.created
                  .replace('T', ' ')
                  .substring(0, 16)}</span>
            </div>
            <div class="card bg-secondary p-2 text-white">
                <h2>${data.subject}</h2>
                <p>${data.email}</p>
                <p>${data.message}</p>
                <br>
                <h2>Comments:</h2>
                
            </div>
            <div class="userInput">
            <textarea name="message" id="message_input" placeholder="New comment..."></textarea>
            <input type="submit" value="Add Comment" class="btn">
            `;

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

      });
  };

  const postComment = () => {
    
  }

  getCase()

  