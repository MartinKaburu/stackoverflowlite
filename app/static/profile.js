const getMyQuestions = async () => {
  let url = baseURL+"questions/user";
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
        <button class="show_more" onclick="getAnswers(${id});">Answers {number}</button> &nbsp; <button class="show_more" onclick="deleteQuestion(${id});">Delete</button>
        <hr>
      `
      node = document.createElement('div')
      node.className = "display_que"
      node.id = id.toString()+'this'
      node.innerHTML = div;
      document.getElementById('mmm').appendChild(node);
    }
  }
  else{
    window.location.replace('http://127.0.0.1:5000/auth')
  }
}

const getAnswers = async (id) => {
    let url = baseURL+`questions/${id}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: head
    });
    if(response.status == 200){
        json = await response.json()
        let data = await json.answers
        let node = document.createElement('div')
        node.id = id
        node.className = "my_answer"
        node.style['display'] = 'none'
        for(answer in data){
            let content = data[answer].answer_content
            let downvotes = data[answer].downvotes
            let upvotes = data[answer].upvotes
            let accepted = data[answer].accepted
            let user = data[answer].username
            let answerId = data[answer].answer_id
            let questionId = data[answer].question_id
            div = `
                <p>
                    ${content}
                  <br>
                </p>
                <ul>
                    <li><button onclick="downvote(${answerId});"><i class="fa fa-minus"></i> Downvote ${downvotes}</button></a></li>
                    <li><button onclick="upvote(${answerId});"><i class="fa fa-plus"></i> Upvote ${upvotes}</button></a></li>
                    <li><button onclick="accept(${questionId}, ${answerId});"><i class="fa fa-check"></i> Accept</button></a></li>
                </ul>
                <p>
                  Answer by ${user}<br>
                  On {date}
                </p>
                <hr>
            `
            node.innerHTML += div
        }
        let textareaid = 'textarea'+id.toString()
        let answerTextarea = `
            <textarea rows="5" id=${textareaid} style="display: block;" placeholder="My answer" name='my_answer' required data-validation-required-message="Please enter an answer first"></textarea>
            <button class="button" onclick="answerQuestion(${id}, ${textareaid});">Answer</button>
        <hr>
        `
        node.innerHTML += answerTextarea
        document.getElementById(id.toString()+'this').appendChild(node);
        showHidden(id);
    }else{
        let json = await response.json();
        notification(json["message"]);
    }
}

const accept = async (questionId, answerId) => {
  let url = baseURL+`questions/${questionId}/answers/${answerId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
  });
  let json = await response.json()
  notification(json["message"]);
}


const deleteQuestion = async (id) => {
  let url = baseURL+`questions/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: head,
  });
  let json = await response.json()
  notification(json["message"]);
}
