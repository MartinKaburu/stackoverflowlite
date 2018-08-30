async function get_questions(){
  head = new Headers({
    "Content-Type":"application/json",
    "Authorization":"JWT" +localStorage.getItem('token')
  });
  try{
    const = url = 'http://127.0.0.1:8000/api/v1/questions';
    let response = await fetch(url, {
      method: 'GET',
      headers: head
    });
  }catch(error){
      console.log(error);
    }
  if(response.status == 200){
    questions = response.json();
    //get htm div and append
    console.log(questions);
  }else{
    alert('something went wrong');
  }
}

function get_answers(){
  question_id = {};
  questions = document.getElementsByClassName('recent_questions').children;
  for(let i = 0; i <= questions.length; i++){

  }
}
