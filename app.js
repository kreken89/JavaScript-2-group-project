// API key
// https://fnd22-shared.azurewebsites.net/swagger/index.html

//const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';
const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases';
const email = document.querySelector('#email_input');
const subject = document.querySelector('#subject_input');
const message = document.querySelector('#message_input');
const form = document.querySelector('#task_form');
const containter = document.querySelector('.case_container');

const cases = [];
let newPost = {};
form.addEventListener('submit', () => {
  newPost = {
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  console.log(JSON.stringify(newPost));

  postCase();
});

const postCase = () => {
  return fetch(CASE_URL, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      cases.unshift({ ...newPost, id: data });
      console.log(cases);
      caseList(
        newPost.subject,
        newPost.email,
        newPost.message,
        'Just Now',
        newPost.id
      );
    })
    .catch((err) => console.log(err));
};

const getCase = () => {
  return fetch(CASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        cases.push(element);
      });
      cases.sort(function (a, b) {
        if (a.created < b.created) return -1;
        if (a.created > b.created) return 1;
        return 0;
      });
      console.log(cases);
      cases.forEach((element) => {
        caseList(
          element.subject,
          element.email,
          element.message,
          element.created,
          element.id
        );
      });
      /* for(let i = 0; i<5; i++){
                caseList(data[i].subject, data[i].email, data[i].message)
            } */
      return cases;
    });
};

const caseList = (subject, email, message, time, id) => {
  /*  
  const card = document.createElement('div')
  card.className = 'user user_dark'

  const inline = document.createElement('div')
  inline.className = 'inline'

  const UList = document.createElement('ul')

    const list = document.createElement('li')
    list.className = 'green'
    list.innerText = ''

    list.innerText = ''
    list.innerText = ''
  
    const cardTime = document.createElement('span')
    cardTime.className = 'time_add'
    cardTime.innerText = time.replace('T', ' ').substring(0, 16)

    const cardSubject = document.createElement('p')
    cardSubject.className = 'user_subject'
    cardSubject.innerText = subject

    const cardEmail = document.createElement('p')
    cardEmail.className = 'user_email'
    cardEmail.innerText = email

    const cardMessage = document.createElement('p')
    cardMessage.className = 'user_message'
    cardMessage.innerText = message

    const cardBtn = document.createElement('a')
    cardBtn.className = 'show_modal'
    cardBtn.innerText = 'Add comment'

    containter.appendChild(card)
    card.appendChild(cardTime)
    card.appendChild(cardSubject)
    card.appendChild(cardEmail)
    card.appendChild(cardMessage)
    card.appendChild(cardBtn)
    */

  containter.innerHTML =
    `
    <div class="user user_dark">
     <div class="inline">
      <div class="statusInfo">
       <button id="3" class="green status">Avslutad</button>
       <button class="orange status">Pågående</button>
       <button class="red status">Ej påbörjad</button>
      </div>
      <span class="time_add">${time.replace('T', ' ').substring(0, 16)}</span>
     </div>
        
    <p class="user_subject">${subject}</p>
    <p class="user_email">${email}</p>
    <p class="user_message">${message}</p>

   
    <a href="details.html?id=${id}" class="show_modal">Add comment</a>
    </div>
    
    ` + containter.innerHTML;

  //  <form action="details.html?id=${id}" >
  //     <input type="submit" value="Add comment" />
  // </form>

  /*  // Comment Modal Add comment
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.close_modal');
  const btnOpenModal = document.querySelector('.show_modal');

  // Modal functions
  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnCloseModal.addEventListener('click', closeModal);
  btnOpenModal.addEventListener('click', openModal);
  overlay.addEventListener('click', closeModal); */
};
getCase();

// How to respond on keyboard events
// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });
