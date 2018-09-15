//globals
token = localStorage.getItem('token')

head = new Headers({
  "Content-Type":"application/json",
  "Authorization": "JWT " + token
});

baseURL = 'https://kaburu-stackoverflowlite-cp3.herokuapp.com/api/v1/'


const showHidden = (id) => {
      div = document.getElementById(id);
      if(div.style.display == "block"){
          div.style.display = "none";
      }else{
        div.style.display = "block";
      };
}


const notification = (message) => {
    try{
        element = document.getElementById('notification')
        element.remove()
    }catch{
    }
    html = `
    <p>&times; ${message} &times;</p>
    `
    node = document.createElement('div')
    node.className = 'notification'
    node.id = 'notification'
    node.innerHTML = html
    document.getElementById('feed').appendChild(node)
    setTimeout(() => {
      element = document.getElementById('notification')
      element.style['-webkit-animation'] = 'fadeout 5s'
    }, 1000)
}

let elem = document.getElementById('askQue').addEventListener('click', async (event) => {
  event.preventDefault();
  const form = document.forms['askQuestion'];
  const question = form.question.value;
  let url = baseURL+'questions';
  let settings = {
    method: 'POST',
    headers: head,
    body: JSON.stringify({
      "content":question
    })
  }
  const response = await fetch(url, settings);
  let json = await response.json()
  notification(json["message"]);
});


const logOut = () => {
  localStorage.removeItem('token')
  window.location.replace('https://kaburu-stackoverflowlite-cp3.herokuapp.com/api/v1/auth')
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
    let json = await response.json()
    notification(json["message"]);
}


const downvote = async (id) => {
  let url = baseURL+`downvote/${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
  });
  let json = await response.json()
  notification(json["message"]);;
}


const upvote = async (id) => {
  let url = baseURL+`upvote/${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
  });
  let json = await response.json()
  notification(json["message"]);
}


const editAnswer = (questionId, answerId) => {
  let paragraphId = 'p'+answerId.toString()
  let element = document.getElementById(paragraphId)
  let content = element.innerHTML;
  content = content.trim()
  let textareaId = 'txt'+answerId.toString()
  let html = `
  <textarea id=${textareaId} rows="8" cols="80">${content}</textarea><br>
  <button type="button" onclick="submitEdit(${questionId}, ${answerId});">Edit</button><button type="button" onclick="document.getElementById('pop_up').remove()">Cancel</button>
  `
  let node = document.createElement("div");
  node.className = 'pop-up'
  node.id = 'pop_up'
  node.innerHTML = html
  document.getElementById('feed').appendChild(node)
}


const submitEdit = async (questionId, answerId) => {
  let element = document.getElementById('txt'+answerId.toString())
  let content = element.value;
  console.log(content);
  content = content.trim()
  let url = baseURL+`questions/${questionId}/answers/${answerId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: head,
    body:JSON.stringify({
      "content":content
    })
  });
  document.getElementById('pop_up').remove()
  let json = await response.json()
  notification(json["message"])
}
