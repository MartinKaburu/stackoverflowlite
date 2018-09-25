let head = new Headers({
  'Content-Type':'application/json'
});

let baseURL = 'https://kaburu-stackoverflowlite-cp3.herokuapp.com/api/v1/'

const authMessage = {
  notelogin: (data) =>{
      p = document.createElement('p');
      p.id = 'notel';
      p.innerHTML = data;
      document.getElementById('body').appendChild(p);
      setTimeout(() => {
        element = document.getElementById('notel');
        element.style['-webkit-animation'] = 'noteout 2s';
      }, 2000);
      setTimeout(() => {
        element = document.getElementById('notel').remove();
      }, 4000);
  },


  notesignup: (data) =>{
      p = document.createElement('p');
      p.id = 'note';
      p.innerHTML = data;
      document.getElementById('body').appendChild(p);
      setTimeout(() => {
        element = document.getElementById('note');
        element.style['-webkit-animation'] = 'noteout 2s';
      }, 2000);
      setTimeout(() => {
        element = document.getElementById('note').remove();
      }, 4000);
  }
}

elem = document.getElementById('loginbtn').addEventListener('click', async (event) => {
      event.preventDefault();
      authMessage.notelogin('working...');
      let form = document.getElementById('login');
      let email = form.email.value;
      let password = form.password.value;
      let frame = JSON.stringify({email, password})
      let settings = {
          method: 'POST',
          headers: head,
          body: frame
      }
      let url = baseURL+'auth/login';
      const res = await fetch(url, settings);
      if(res.status == 200){
          let json = await res.json();
          let token = json['access_token'];
          localStorage.setItem('token', token);
          window.location.replace('https://stackoverflowlite-beta.herokuapp.com/home');
      }else{
        let data = await res.json();
        try{
            authMessage.notelogin(data["description"]);
        }catch{
            authMessage.notelogin(data["message"]);
        }
      }
});


elem = document.getElementById('signupbtn').addEventListener('click', async (event) => {
    event.preventDefault();
    authMessage.notesignup('working...');
    const signupForm = document.forms['signupForm'];
    let username = signupForm.username.value;
    let email = signupForm.email.value;
    let password = signupForm.password.value;
    url = baseURL + 'auth/signup';
    try{
        let res = await fetch(url, {
          method: 'POST',
          headers: head,
          body: JSON.stringify({username, email, password})
        })
        if(res.status == 201){
            let data = await res.json();
            data = data["message"]+"&nbsp;log in to continue";
            authMessage.notesignup(data);
        }else{
          let data = await res.json();
          authMessage.notesignup(data["message"]);
        }
    }catch(err){
          console.log(err);
    }
});
