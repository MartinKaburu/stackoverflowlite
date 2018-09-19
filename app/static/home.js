const home = {
    getQuestions: async () => {
      let url = baseURL+"questions";
      const response = await fetch(url, {
        method: 'GET',
        headers: head
      });
      if(response.status == 200){
        json = await response.json();
        let data = await json.QUESTIONS;
        for(question in data){
          content = data[question].content;
          id = data[question].question_id;
          user = data[question].username;
          date = data[question].posted_on;
          try{
            document.getElementById(id.toString()+'this').remove();
          }catch{}
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
          node.id = id.toString()+'this';
          node.innerHTML = div;
          document.getElementById('mmm').appendChild(node);
        }
      }else if(response.status == 404){
        let json = await response.json()
        notification(json["message"])
      }else{
        window.location.replace('http://127.0.0.1:5000/auth');
      }
    },


    getAnswers: async (id) => {
      let url = baseURL+`questions/${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: head
      });
      if(response.status == 200){
          let json = await response.json();
          let data = await json.answers;
          let node = document.createElement('div');
          node.id = id;
          node.className = "my_answer";
          node.style['display'] = 'none';
          for(answer in data){
              let content = data[answer].answer_content;
              let downvotes = data[answer].downvotes;
              let upvotes = data[answer].upvotes;
              let accepted = data[answer].accepted;
              let user = data[answer].username;
              let answerId = data[answer].answer_id;
              let questionId = data[answer].question_id;
              let date = data[answer].posted_on;
              textareaid = 'textarea'+id.toString();
              paragraphId = 'p'+answerId.toString();
              divId = 'answer'+answerId.toString();
              if(accepted){
                div = `
                    <div id=${divId}>
                    <img src="../static/img/tick.png" alt="">
                    <p id=${paragraphId} style="font-weight: bold;">
                        ${content}
                    </p>
                    <p style="font-style: italic;font-family:courier;color:grey;font-weight:bold;font-size:0.8em;margin-left:60%;">
                      Answer by ${user}<br>On ${date}
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
                node.innerHTML += div;

              }else{
                div = `
                    <div id=${divId}>
                    <p id=${paragraphId}>
                        ${content}
                    </p>
                    <p style="font-style: italic;font-family:courier;color:grey;font-weight:bold;font-size:0.8em;margin-left:60%;">
                      Answer by ${user}<br>On ${date}
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
                node.innerHTML += div;
              };

          };
          textareaid = 'textarea'+id.toString();
          questionId = id;
          answer_question = `
              <textarea rows="5" id=${textareaid} style="display: block;" placeholder="My answer" name='my_answer' required data-validation-required-message="Please enter an answer first"></textarea>
              <button class="button" onclick="globals.answerQuestion(${questionId}, ${textareaid});">Answer</button>
          <hr>
          `
          node.innerHTML += answer_question;
          document.getElementById(id.toString()+'this').appendChild(node);
          globals.showHidden(id);
      }else{
        let json = await response.json();
        message.notification(json["message"]);
      }
    }
}
