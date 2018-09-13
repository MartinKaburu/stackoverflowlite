//globals
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6Im11Z3VuYW1hcnRpbjM0MEBnbWFpbC5jb20iLCJpYXQiOjE1MzY4NzQ3MjIsIm5iZiI6MTUzNjg3NDcyMiwiZXhwIjoxNTM2ODc4MzIyfQ.WXPj7mVJBkWLeD0uw8Po4viUPoL21V6IxyjlywH0twI')
token = localStorage.getItem('token')

head = new Headers({
  "Content-Type":"application/json",
  "Authorization": "JWT " + token
});

baseURL = 'http://localhost:8000/api/v1/'


const showHidden = (id) => {
      div = document.getElementById(id);
      if(div.style.display == "block"){
          div.style.display = "none";
      }else{
        div.style.display = "block";
      };
}


const notification = (message) => {
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
    setTimeout(() =>{
      element = document.getElementById('notification')
      element.remove()
    }, 6000)

}


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
  let json = await response.json()
  notification(json["message"]);
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
