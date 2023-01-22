

const CASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases';
const email = document.querySelector('#email_input');
const subject = document.querySelector('#subject_input');
const message = document.querySelector('#message_input');
const form = document.querySelector('#task_form');
const container = document.querySelector('.case_container');

const cases = [];
let newPost = {};


form.addEventListener('submit', (e) => {
  e.preventDefault();
  // remove links from message input
  message.value = message.value.replace(/(https?:\/\/[^\s]+)/g, '');
  // remove code snippet from message input
  message.value = message.value.replace(/(```[^```]+```)/g, '');
  newPost = {
    email: email.value,
    subject: subject.value,
    message: message.value,
  };
  if (
    email.value.trim() === '' ||
    !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9.-]{2,}$/.test(email.value)
  ) {
    email.setCustomValidity(
      'Email is required and must be in the correct format.'
    );
  } else if (
    subject.value.trim() === '' ||
    !/^[a-zA-Z]*$/.test(subject.value)
  ) {
    subject.setCustomValidity(
      'Subject is required and must be in letters format.'
    );
  } else {
    email.setCustomValidity('');
    subject.setCustomValidity('');
    postCase();
  }
});

const postCase = () => {
  return fetch(CASE_URL, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      cases.unshift({ ...newPost, id: data });
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
      data.forEach((element) => {
        cases.push(element);
      });
      cases.sort(function (a, b) {
        if (a.created < b.created) return -1;
        if (a.created > b.created) return 1;
        return 0;
      });
      cases.forEach((element) => {
        caseList(
          element.subject,
          element.email,
          element.message,
          element.created,
          element.id,
          element.status.id
        );
      });
      return cases;
    });
};

const caseList = (subject, email, message, time, id, statusId) => {
  const newDiv = `
    <div class="user user_dark">
      <div class="inline">
        <div class="statusInfo">
          <span class="${statusId === 3 ? 'green' : 'inherit'}">Avslutad</span>
          <span class="${statusId === 2 ? 'orange' : 'inherit'}">Pågående</span>
          <span class="${statusId === 1 ? 'red' : 'inherit'}">Ej påbörjad</span>
        </div>
        <span class="time_add">${time.replace('T', ' ').substring(0, 16)}</span>
      </div>
      <p class="user_subject">${subject}</p>
      <p class="user_email">${email}</p>
      <p class="user_message">${message}</p>

      <input class="show_modal" type="submit" value="Add comment" onclick="location.href='details.html?id=${id}'">

      </div>`;
      container.insertAdjacentHTML('afterbegin', newDiv);
    };
    getCase();