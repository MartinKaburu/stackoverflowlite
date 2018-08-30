let token = localStorage.getItem('token')
let head = new Headers({
  "Content-Type":"application/json",
  "Authorization": "JWT "+token
});
let baseURL = 'http://localhost:8000/api/v1/'

const authenticate = () => {

}

async function postQuestion(){
  const form = document.forms['askQuestion'];
  const question = form.question.value;
  let url = baseURL+'questions'
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
    body: JSON.stringify({
      "content":question
    })
  });
  console.log(response)
  console.log(token)
  if (response.status == 201){
    alert("question posted");
  }else{
    console.log(response)
    alert('something went wrong')
  }

}

async function getQuestions(){
  let url = baseURL+"questions";
  const response = await fetch(url, {
    method: 'GET',
    headers: head
  });
  console.log(response);
  if(response.status == 200){
    json = await response.json()
    let data = JSON.stringify(json)
    question_content = json.QUESTIONS[0].content;
    console.log(question_content)
    question_id = json.QUESTIONS[0].question_id;
    div = `<div class="display_que" id= ${question_id}>`
    div+=`<p id="que">${question_content}</p>'
    Posted by {username}<br>
    {On date}</p>
    <button class="show_more" onclick="show_hidden('one');">Answers {number}</button>`
    parent = document.getElementById('que')
    parent.innerHTML = div;
  }
  else{
    alert("something went wrong");
  }
}
getQuestions()

async function getAnswers(id){
  let url = baseURL+`questions/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: head
  });
  json = await response.json();
  answers = json.answers
  for(answer in answers){
    console.log(answer.answer_content)
  }
}
