// API kay
// https://fnd22-shared.azurewebsites.net/swagger/index.html

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';

const email = document.querySelector('#email_input')
const subject = document.querySelector('#subject_input')
const message = document.querySelector('#message_input')
const form = document.querySelector('#task_form')
//const btn = document.querySelector(".btn")

const api_copy = []


form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const tempObj = {email: email.value, subject: subject.value, message: message.value}
    const jsonString = JSON.stringify(Object.assign(tempObj))
    console.log(jsonString)
})




