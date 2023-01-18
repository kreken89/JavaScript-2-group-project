const id = new URLSearchParams(window.location.search).get('id');
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments/';
const wrapper = document.querySelector('.container_details');
const form = document.querySelector('.userInput')
const inline = document.querySelector('.inline')


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
        /*  */
        /* const inline = document.createElement('div')
        inline.className = 'inline'
        wrapper.appendChild(inline) */

        // const statusInfo = document.createElement('div')
        // statusInfo.className = 'statusInfo'
        // inline.appendChild(statusInfo)
        
        /* const radio1 = document.createElement('radio')
        const radio2 = document.createElement('radio')
        const radio3 = document.createElement('radio')
        radio1.className = 'red'
        radio2.className = 'orange'
        radio3.className = 'green'
        radio1.id = '1'
        radio2.id = '2'
        radio3.id = '3'
        radio1.innerText = 'Ej påbörjad'
        radio2.innerText = 'Pågående'
        radio3.innerText = 'Avslutad'
        statusInfo.appendChild(radio1)
        statusInfo.appendChild(radio2)
        statusInfo.appendChild(radio3) */
        const time_add = document.createElement('span')
        time_add.className = 'time_add'
        time_add.innerText = data.created.replace('T', ' ').substring(0, 16)
        wrapper.appendChild(time_add)
        const card = document.createElement('div')
        card.className = 'card'
        wrapper.appendChild(card)
        const subject = document.createElement('h2')
        const _email = document.createElement('p')
        const message = document.createElement('p')
        subject.innerText = data.subject
        _email.className = 'p_details'
        message.className = 'p_details'
        _email.innerText = data.email
        message.innerText = data.message
        card.appendChild(subject)
        card.appendChild(_email)
        card.appendChild(message)
        const commentsHeadline = document.createElement('h2')
        commentsHeadline.innerText = 'Comments:'
        wrapper.appendChild(commentsHeadline)
        /* wrapper.innerHTML =
        `
            <div class="inline">
                <div class="statusInfo">
                 <button class="green status active">Avslutad</button>
                 <button class="orange status active">Pågående</button>
                 <button class="red status active">Ej påbörjad</button>
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
            
            ` + wrapper.innerHTML */

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


  