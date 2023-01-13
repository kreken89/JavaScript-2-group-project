// API key
// https://fnd22-shared.azurewebsites.net/swagger/index.html

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/swagger/index.html';
const CASE_URL = "https://fnd22-shared.azurewebsites.net/api/Cases"
const email = document.querySelector('#email_input')
const subject = document.querySelector('#subject_input')
const message = document.querySelector('#message_input')
const form = document.querySelector('#task_form')
const containter = document.querySelector(".case_container")
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
            cases.unshift({...newPost, id: data})
            console.log(cases)
            caseList(newPost.subject, newPost.email, newPost.message, 'Just Now')
        })
        .catch(err =>  console.log(err))
}

const getCase = () => {
    
     return fetch(CASE_URL)
        
        .then(res => res.json())
        .then(data => {
            
            data.forEach(element => {
                cases.push(element)
                
            });
            cases.sort(function(a, b){
                if (a.created < b.created)
                    return -1
                if (a.created > b.created)
                    return 1
                return 0     
            } )
            console.log(cases)
            cases.forEach(element => {
                caseList(element.subject, element.email, element.message, element.created)
            });
            /* for(let i = 0; i<5; i++){
                caseList(data[i].subject, data[i].email, data[i].message)
            } */
            return cases
        })
    
}

const caseList = (subject, email, message, time) => {
    containter.innerHTML = 
    `<div class="user user_dark">
        <span>${time.replace('T', ' ').substring(0, 16)}</span>
        <p class="user_subject">${subject}</p>
        <p class="user_email">${email}</p>
        <p class="user_message">${message}</p>
    
        <button class="submit_btn">Add comment</button>
    </div>` + containter.innerHTML
}
getCase()
