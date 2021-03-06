  //globals
token = localStorage.getItem('token')

head = new Headers({
  "Content-Type":"application/json",
  "Authorization": "JWT " + token
});

baseURL = 'https://kaburu-stackoverflowlite-cp3.herokuapp.com/api/v1/'


const message = {

   notification: (message) => {
      try{
          element = document.getElementById('notification')
          element.remove()
      }catch{}
      if (message == null){
          window.location.replace(baseURL+'auth');
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
  },


  editAnswer: (questionId, answerId) => {
      let paragraphId = 'p'+answerId.toString()
      let element = document.getElementById(paragraphId)
      let content = element.innerHTML;
      content = content.trim()
      let textareaId = 'txt'+answerId.toString()
      let html = `
      <textarea id=${textareaId} rows="8" cols="80">${content}</textarea><br>
      <button type="button" onclick="globals.submitEdit(${questionId}, ${answerId});">Edit</button><button type="button" onclick="document.getElementById('pop_up').remove()">Cancel</button>
      `
      let node = document.createElement("div");
      node.className = 'pop-up'
      node.id = 'pop_up'
      node.innerHTML = html
      document.getElementById('feed').appendChild(node)
  },


  editQuestion: (questionId) => {
      let element = document.getElementById('content'+questionId.toString())
      let content = element.innerHTML;
      content = content.trim()
      let textareaId = 'txt'+questionId.toString()
      let html = `
      <textarea id=${textareaId} rows="8" cols="80">${content}</textarea><br>
      <button type="button" onclick="profile.editQuestion(${questionId});">Edit</button><button type="button" onclick="document.getElementById('pop_up').remove()">Cancel</button>
      `
      let node = document.createElement("div");
      node.className = 'pop-up'
      node.id = 'pop_up'
      node.innerHTML = html
      document.getElementById('feed').appendChild(node)
  },

  confirmDeleteAnswer: (answerId, questionId) =>{
    let html = `
    <div style="background-color: white;color: #000;width: 20%;padding: 10px;border: none;margin: auto;margin-top: 20%;">
    <p>Are you sure you want to delete this answer?</p>
    <button id="deletebtn" type="button" onclick="globals.deleteAnswer(${answerId}, ${questionId});">Delete</button><button type="button" onclick="document.getElementById('pop_up').remove()">Cancel</button>
    </div>
    `
    let node = document.createElement("div");
    node.className = 'pop-up deletePopUp'
    node.id = 'pop_up'
    node.innerHTML = html
    document.getElementById('feed').appendChild(node)
  },


  confirmDeleteQuestion: (questionId) =>{
    let html = `
    <div style="background-color: white;color: #000;width: 20%;padding: 10px;border: none;margin: auto;margin-top: 20%;">
    <p>Are you sure you want to delete this Question?</p>
    <button id="deletebtn" type="button" onclick="profile.deleteQuestion(${questionId});">Delete</button><button type="button" onclick="document.getElementById('pop_up').remove()">Cancel</button>
    </div>
    `
    let node = document.createElement("div");
    node.className = 'pop-up deletePopUp'
    node.id = 'pop_up'
    node.innerHTML = html
    document.getElementById('feed').appendChild(node)
  }
}


const vote = {
    downvote: async (answerId, questionId) => {
      let url = baseURL+`downvote/${answerId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: head,
      });
      let json = await response.json();
      if(response.status == 200){
        try{
          home.getQuestions();
          home.getAnswers(questionId);
        }catch{
          profile.getMyQuestions();
          profile.getAnswers(questionId);
        }
      }
      message.notification(json["message"]);;
    },


    upvote: async (answerId, questionId) => {
      let url = baseURL+`upvote/${answerId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: head,
      });
      let json = await response.json();
      if(response.status == 200){
        try{
          home.getQuestions();
          home.getAnswers(questionId);
        }catch{
          profile.getMyQuestions();
          profile.getAnswers(questionId);
        }
      }
      message.notification(json["message"]);;
    },
}


const globals = {
    showMenu: async => {
        let menu = `
          <a href="#">Home</a>
          <a href="https://stackoverflowlite-beta.herokuapp.com/profile">Profile</a>
          <a href="#" onclick="globals.logOut();">Log out</a>
        `
        let smallMenu = document.getElementById('smallMenu');
        let ul = document.createElement('div');
        ul.className = 'menu-content';
        ul.id = 'menu-content';
        ul.innerHTML = menu;
        smallMenu.appendChild(ul);
    },


    submitEdit: async (questionId, answerId) => {
        let element = document.getElementById('txt'+answerId.toString())
        let content = element.value;
        content = content.trim()
        let url = baseURL+`questions/${questionId}/answers/${answerId}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: head,
          body:JSON.stringify({content})
        });
        document.getElementById('pop_up').remove()
        let json = await response.json();
        if(response.status == 201){
          try{
            home.getQuestions();
            home.getAnswers(questionId);
          }catch{
            profile.getMyQuestions();
            profile.getAnswers(questionId);
          }
        }
        message.notification(json["message"])
    },


    logOut: () => {
        localStorage.removeItem('token');
        window.location.replace('https://stackoverflowlite-beta.herokuapp.com/auth');
    },


    answerQuestion: async (questionId, textareaid) =>{
        answerContent = textareaid.value;
        let url = baseURL+`questions/${questionId}/answers`;
        const response = await fetch(url, {
          method: 'POST',
          headers: head,
          body: JSON.stringify({
            "answer_content": answerContent
          })
        });
        let json = await response.json()
        if(response.status == 201){
          try{
            home.getQuestions();
            home.getAnswers(questionId);
          }catch{
            profile.getMyQuestions();
            profile.getAnswers(questionId);
          }
        }
        message.notification(json["message"]);
    },


    showHidden: (id) => {
        div = document.getElementById(id);
        if(div.style.display == "block"){
            div.style.display = "none";
        }else{
          div.style.display = "block";
        };
    },


    deleteAnswer: async (answerId, questionId) => {
        document.getElementById('pop_up').remove();
        url = baseURL+`questions/${questionId}/answers/${answerId}`
        const response = await fetch(url, {
          method: 'DELETE',
          headers: head
        })
        let json = await response.json();
        if(response.status == 200){
            document.getElementById('answer'+answerId.toString()).remove();
        }
        message.notification(json["message"]);
    }

}

document.getElementById('askQue').addEventListener('click', async (event) => {
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
    };
    const response = await fetch(url, settings);
    let json = await response.json();
    if(response.status == 201){
      try{
        home.getQuestions();
      }catch{
        profile.getMyQuestions();
      };
    }
    message.notification(json["message"]);
});

document.getElementById('searchbtn').addEventListener('click', async (event) =>{
    event.preventDefault();
    content = document.getElementById('searchInput').value;
    settings = {
      method: 'POST',
      headers: head,
      body: JSON.stringify({
          'search':content
      })
    }
    url = baseURL+'search'
    const response = await fetch(url, settings);
    json = await response.json();
    if(response.status == 200){
      json = json.RESULTS;
      displayNode = document.getElementById('mmm')
      while (displayNode.hasChildNodes()) {
          displayNode.removeChild(displayNode.lastChild);
      }
      let heading = `
      <div class="head">
        <h1>"${content}" search results<h1>
        <hr>
      </div>
      `
      displayNode.innerHTML = heading;
      for(question in json){
        content = json[question].content;
        id = json[question].id;
        user = json[question].username;
        date = json[question].posted_on;
        div = `
          <p>
            ${content}
            <br>
          </p>
          <p style="font-style: italic;font-family:courier;color:grey;font-weight:bold;font-size:0.8em;margin-left:60%;">
            Asked by ${user}<br>On ${date}
          </p>
          <button class="show_more" onclick="home.getAnswers(${id});">Answers</button>
          <hr>
        `
        node = document.createElement('div');
        node.className = "display_que";
        node.id = id+'this';
        node.innerHTML = div;
        document.getElementById('mmm').appendChild(node);
      }
      let button = document.createElement('button');
      button.className = 'show_more';
      button.onclick = () => {window.location.reload();}
      let footer = `
        Back
      `
      button.innerHTML = footer;
      displayNode.prepend(button);
    }else{
        message.notification(json['message']);
    }
})

document.getElementById('feed').onclick = () => {
    try{
      document.getElementById('menu-content').remove();
    }catch{}
}
