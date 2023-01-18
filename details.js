const id = new URLSearchParams(window.location.search).get('id');
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';
const wrapper = document.querySelector('.container_details');
const form = document.querySelector('.userInput')
const inline = document.querySelector('.inline')
const statusInfo = document.querySelector('.statusInfo')

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
        
        const time_add = document.createElement('span')
        time_add.className = 'time_add'
        time_add.innerText = data.created.replace('T', ' ').substring(0, 16)
        inline.appendChild(time_add)
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
       


            data.comments.forEach(element => {
                comments.push(element);
            });
            comments.sort(function (a, b) {
                if (a.created > b.created) return -1;
                if (a.created < b.created) return 1;
                return 0;
              });
            console.log(comments)
            
            const commentList = document.createElement('ul')
            commentList.className = 'commentList'
            wrapper.appendChild(commentList)
            console.log(data.comments.length)
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
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      /* .catch((err) => console.log(err)); */
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


  