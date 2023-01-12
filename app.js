// API kay
// https://fnd22-shared.azurewebsites.net/swagger/index.html

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';

const email = document.querySelector('#email_input')
const subject = document.querySelector('#subject_input')
const message = document.querySelector('#message_input')
const form = document.querySelector('#task_form')
//const btn = document.querySelector(".btn")

const cases = []
let JSONString = ''

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const tempObj = {email: email.value, subject: subject.value, message: message.value}
    JSONString = JSON.stringify(Object.assign(tempObj))
    
    
})


/* const postCase = () => {
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases", {
        method: 'POST',
        body: JSONString
        })
        .then(res => res.json())
        .then( data => console.log(data))
        .catch(err =>  console.log(err))
} */
        

     




const getCase = () => {
    
    fetch("https://fnd22-shared.azurewebsites.net/api/Cases")
        
        .then(res => res.json())
        .then(data => {
            
            data.forEach(element => {
                cases.push(element)
            });
            console.log(cases)
        })
    
}

getCase()