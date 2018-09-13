localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6Im11Z3VuYW1hcnRpbjM0MEBnbWFpbC5jb20iLCJpYXQiOjE1MzY4Mzg4NTcsIm5iZiI6MTUzNjgzODg1NywiZXhwIjoxNTM2ODQyNDU3fQ.PsnCKx_scxX_xQppv9s28IpT3mfVyzel48dx_ohL3AM')
token = localStorage.getItem('token')
let head = new Headers({
  "Content-Type":"application/json",
  "Authorization": "JWT " + token
});

let baseURL = 'http://localhost:8000/api/v1/'

const postQuestion = async () => {
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
  if (response.status == 201){
    alert("question posted");
  }else{
    console.log(response)
    alert('something went wrong')
  }

}

const getQuestions = async () => {
  let url = baseURL+"questions";
  const response = await fetch(url, {
    method: 'GET',
    headers: head
  });
  if(response.status == 200){
    json = await response.json()
    let data = await json.QUESTIONS
    for(question in data){
      content = data[question].content;
      id = data[question].question_id;
      user = data[question].username
      div = `
        <p>
          ${content}
          <br>
        </p>
        <p>
          Posted by ${user}<br>
          On {date}
        </p>
        <button class="show_more" onclick="getAnswers(${id});">Answers {number}</button>
        <hr>
      `
      node = document.createElement('div')
      node.className = "display_que"
      node.id = 'this'
      node.innerHTML = div;
      document.getElementById('mmm').appendChild(node);
    }
  }
  else{
    window.location.replace('http://127.0.0.1:5000/auth')
    console.log('wrong')
  }
}

const getAnswers = async (id) => {
  let url = baseURL+`questions/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: head
  });
  json = await response.json()
  let data = await json.answers
  node = document.createElement('div')
  node.id = id
  node.className = "my_answer"
  node.style['display'] = 'none'
  for(answer in data){
      let content = data[answer].answer_content
      let downvotes = data[answer].downvotes
      let upvotes = data[answer].upvotes
      let accepted = data[answer].accepted
      let user = data[answer].username
      let answer_id = data[answer].answer_id
      textareaid = 'textarea'+id.toString()
      div = `
          <p>
              ${content}
            <br>
          </p>
          <ul>
              <li><button onclick="downvote(${answer_id});"><i class="fa fa-minus"></i> Downvote ${downvotes}</button></a></li>
              <li><button onclick="upvote(${answer_id});"><i class="fa fa-plus"></i> Upvote ${upvotes}</button></a></li>
          </ul>
          <p>
            Answer by ${user}<br>
            On {date}
          </p>
          <hr>
      `
      node.innerHTML += div
  }
  answer_question = `
      <textarea rows="5" id=${textareaid} style="display: block;" placeholder="My answer" name='my_answer' required data-validation-required-message="Please enter an answer first"></textarea>
      <button class="button" onclick="answerQuestion(${id}, ${textareaid});">Answer</button>
  <hr>
  `
  node.innerHTML += answer_question
  document.getElementById('this').appendChild(node);
  show_hidden(id);
}

const logOut = () => {
  localStorage.removeItem('token')
  window.location.replace('http://127.0.0.1:5000/auth')
}

const answerQuestion = async (id, textareaid) =>{
    answerContent = textareaid.value;
    let url = baseURL+`questions/${id}/answers`;
    const response = await fetch(url, {
      method: 'POST',
      headers: head,
      body: JSON.stringify({
        "answer_content": answerContent
      })
    });
    json = await response.json()
}

const downvote = async (id) => {
  let url = baseURL+`downvote/${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
  });
  json = await response.json()
  console.log(json);
}

const upvote = async (id) => {
  let url = baseURL+`upvote/${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
  });
  json = await response.json()
  console.log(json);
}
