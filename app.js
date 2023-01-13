// API key
// https://fnd22-shared.azurewebsites.net/swagger/index.html

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';
const CASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases"
const email = document.querySelector('#email_input')
const subject = document.querySelector('#subject_input')
const message = document.querySelector('#message_input')
const form = document.querySelector('#task_form')
//const btn = document.querySelector(".btn")

const cases = []
let newPost = {}
form.addEventListener('submit', (e) =>{
    e.preventDefault()

    newPost = {email: email.value, subject: subject.value, message: message.value}
    
    console.log(JSON.stringify(newPost))

    postCase()
})


const postCase = () => {
    return fetch(CASE_URL, {
        method: 'POST',
        body: JSON.stringify(newPost), 
        headers: {
            "Content-Type": "application/json-patch+json"
        }
        })
        .then(res => res.json())
        .then( data => {
            cases.push({...newPost, id: data})
            console.log(cases)
        })
        .catch(err =>  console.log(err))
}
        

     




/* const getCase = () => {
    
     return fetch(CASE_URL)
        
        .then(res => res.json())
        .then(data => {
            
            data.forEach(element => {
                cases.push(element)
            });
            console.log(cases)
            return cases
        })
    
} */
