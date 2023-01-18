const id = new URLSearchParams(window.location.search).get('id');
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';
const wrapper = document.querySelector('.container_details');
const form = document.querySelector('.userInput')
const inline = document.querySelector('.inline')
const time_add = document.querySelector('.time_add')

const comments = []
let newComment = {}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    newComment = {
      caseId: id,
      email: document.querySelector('.emailInput').value,
      message: document.querySelector('.messageInput').value,
    };
  
    console.log(JSON.stringify(newComment));
    postComment()
    
  });




const getCase = () => {
    return fetch(CASE_URL + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        email = data.email
        
        time_add.innerText = data.created.replace('T', ' ').substring(0, 16)
        
        const card = document.querySelector('div')

        const subject = card.querySelector('h2')
        const _email = document.querySelector('.detailsEmail')
        const message = document.querySelector('.detailsMessage')
        subject.innerText = data.subject
        _email.innerText = data.email
        message.innerText = data.message
        
            data.comments.forEach(element => {
                comments.push(element);
            });
            comments.sort(function (a, b) {
                if (a.created > b.created) return -1;
                if (a.created < b.created) return 1;
                return 0;
              });
            console.log(comments)
            
            const commentList = document.querySelector('#commentList')
            
            
            console.log(data.comments.length)
            commentList.innerHTML = ''
            for(let i = 0; i<data.comments.length; i++){
                const time = document.createElement('li')
                time.className = 'comment'
                time.innerText = comments[i].created.replace('T', ' ').substring(0, 16)
                commentList.appendChild(time)

                const email = document.createElement('p')
                email.innerText = comments[i].email
                time.appendChild(email)

                const comment = document.createElement('p')
                comment.innerText = comments[i].message
                time.appendChild(comment)
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
      .then((res) => {
        console.log(res)
        getCase()
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


  