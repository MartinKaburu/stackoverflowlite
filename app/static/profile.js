const profile = {
  getMyQuestions: async () => {
    let url = baseURL+"questions/user";
    const response = await fetch(url, {
      method: 'GET',
      headers: head
    });
    if(response.status == 200){
      json = await response.json()
      let data = await json.QUESTIONS
      let user = data[0].username;
      let question_number = 0
      for(question in data){
        content = data[question].content;
        questionId = data[question].question_id;
        user = data[question].username;
        date = data[question].posted_on;
        paragraphId = 'content'+ questionId.toString()
        question_number+=1;
        try{
          document.getElementById(questionId.toString()+'this').remove();
        }catch{}
        div = `
          <p id=${paragraphId}>
            ${content}
          </p>
          <p style="font-style: italic;font-family:courier;color:grey;font-weight:bold;font-size:0.8em;margin-left:60%;">
            Asked by ${user}<br> On ${date}
          </p>
          <button class="show_more" onclick="profile.getAnswers(${questionId});">Answers</button>&nbsp;<i class="fa fa-trash" title="Delete" onclick="message.confirmDeleteQuestion(${questionId})"></i>&nbsp;<i class="fa fa-edit" title="edit" onclick="message.editQuestion(${questionId});"></i>
          <hr>
        `
        node = document.createElement('div')
        node.className = "display_que"
        node.id = questionId.toString()+'this'
        node.innerHTML = div;
        document.getElementById('mmm').appendChild(node);
      }
      let user_info = `
        <img src="../static/img/avatar0.png" alt="avatart">
        <h3>${user}</h3>
        <ul>
          <li><button class="button">Questions ${question_number}</button></li>
          <li><button class="button">Answers 90</button></li>
        </ul>
      `
      node = document.createElement('div')
      node.className = 'user_info'
      node.innerHTML = user_info;
      document.getElementById('feed').appendChild(node)
    }else if(response.status == 404){
      let json = await response.json()
      message.notification(json["message"])
    }
    else{
      window.location.replace('https://stackoverflowlite-beta.herokuapp.com/auth')
    }
  },


    getAnswers: async (id) => {
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
                let date = data[answer].posted_on;
                divId = 'answer'+answerId.toString();
                paragraphId = 'p'+answerId.toString();
                if(accepted){
                  div = `
                    <div id=${divId}>
                    <img src="../static/img/tick.png" alt="">
                      <p id=${paragraphId} style="font-weight: bold;">
                          ${content}
                      </p>
                      <p style="font-style: italic;font-family:courier;color:grey;font-weight:bold;font-size:0.8em;margin-left:60%;">
                        Answer by ${user}<br> On ${date}
                      </p>
                      <ul>
                      <li><i class="fa fa-thumbs-down" title="downvote" onclick="vote.downvote(${answerId}, ${questionId});">${downvotes}</i></li>
                      <li><i class="fa fa-thumbs-up" title="upvote" onclick="vote.upvote(${answerId}, ${questionId});">${upvotes}</i></li>
                      <li><i class="fa fa-edit" title="edit" onclick="message.editAnswer(${questionId}, ${answerId});"></i></li>
                      <li><i class="fa fa-trash" title="delete" onclick="message.confirmDeleteAnswer(${answerId}, ${questionId})"></i></li>
                      </ul>
                      <hr>
                      </div>
                  `
                  node.innerHTML += div
                }else{
                  div = `
                      <div id=${divId}>
                      <p id=${paragraphId}>
                          ${content}
                      </p>
                      <p style="font-style: italic;font-family:courier;color:grey;font-weight:bold;font-size:0.8em;margin-left:60%;">
                        Answer by ${user}<br> On ${date}
                      </p>
                      <ul>
                          <li><i class="fa fa-thumbs-down" title="downvote" onclick="vote.downvote(${answerId}, ${questionId});">${downvotes}</i></li>
                          <li><i class="fa fa-thumbs-up" title="upote" onclick="vote.upvote(${answerId}, ${questionId});">${upvotes}</i></li>
                          <li><i class="fa fa-edit" title="edit" onclick="message.editAnswer(${questionId}, ${answerId});"></i></li>
                          <li><i class="fa fa-trash" title="delete" onclick="message.confirmDeleteAnswer(${answerId}, ${questionId})"></i></li>
                          <li><i class="fa fa-check" title="accept" onclick="profile.accept(${questionId}, ${answerId});"></i></li>
                      </ul>
                      <hr>
                      </div>
                  `
                  node.innerHTML += div
                }
            }
            let textareaid = 'textarea'+id.toString()
            let answerTextarea = `
                <textarea rows="5" id=${textareaid} style="display: block;" placeholder="My answer" name='my_answer' required data-validation-required-message="Please enter an answer first"></textarea>
                <button class="button" onclick="globals.answerQuestion(${id}, ${textareaid});">Answer</button>
            <hr>
            `
            node.innerHTML += answerTextarea
            document.getElementById(id.toString()+'this').appendChild(node);
            globals.showHidden(id);
        }else{
            let json = await response.json();
            message.notification(json["message"]);
        }
    },


    accept: async (questionId, answerId) => {
        let url = baseURL+`questions/${questionId}/answers/${answerId}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: head,
        });
        let json = await response.json();
        if(response.status == 200){
          profile.getMyQuestions();
          profile.getAnswers(questionId);
          profile.getAnswers(questionId);
        }
        message.notification(json["message"]);
    },


    deleteQuestion: async (questionId) => {
        document.getElementById('pop_up').remove();
        let url = baseURL+`questions/${questionId}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: head,
        });
        let json = await response.json()
        document.getElementById(questionId.toString()+'this').remove();
        message.notification(json["message"]);
    },


    editQuestion: async (questionId, content) => {
        let element = document.getElementById('txt'+questionId.toString())
        content = element.value.trim()
        document.getElementById('pop_up').remove();
        let url = baseURL+`questions/${questionId}`
        const response = await fetch(url, {
            method: "PUT",
            headers: head,
            body: JSON.stringify({
              "content":content
            })
        });
        let json = await response.json();
        if(response.status == 201){
          try{
            home.getQuestions();
          }catch{
            profile.getMyQuestions();
          };
        }
        message.notification(json["message"]);
    }
}
