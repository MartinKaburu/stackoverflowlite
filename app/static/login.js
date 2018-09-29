let head = new Headers({
  'Content-Type':'application/json'
});

let baseURL = 'https://kaburu-stackoverflowlite-cp3.herokuapp.com/api/v1/'

const authMessage = {
  notelogin: (type, data) =>{
      if(type == 'success'){
        p = document.createElement('p');
        p.id = 'notel-a';
        p.innerHTML = data;
        document.getElementById('body').appendChild(p);
        setTimeout(() => {
          element = document.getElementById('notel-a');
          element.style['-webkit-animation'] = 'noteout 2s';
        }, 2000);
        setTimeout(() => {
          element = document.getElementById('notel-a').remove();
        }, 4000);
      }
      else{
        p = document.createElement('p');
        p.id = 'notel-f';
        p.innerHTML = data;
        document.getElementById('body').appendChild(p);
        setTimeout(() => {
          element = document.getElementById('notel-f');
          element.style['-webkit-animation'] = 'noteout 2s';
        }, 2000);
        setTimeout(() => {
          element = document.getElementById('notel-f').remove();
        }, 4000);
      }
  },


  notesignup: (type, data) =>{
      if(type == 'success'){
        p = document.createElement('p');
        p.id = 'note-a';
        p.innerHTML = data;
        document.getElementById('body').appendChild(p);
        setTimeout(() => {
          element = document.getElementById('note-a');
          element.style['-webkit-animation'] = 'noteout 2s';
        }, 2000);
        setTimeout(() => {
          element = document.getElementById('note-a').remove();
        }, 4000);
      }
      else {
        p = document.createElement('p');
        p.id = 'note-f';
        p.innerHTML = data;
        document.getElementById('body').appendChild(p);
        setTimeout(() => {
          element = document.getElementById('note-f');
          element.style['-webkit-animation'] = 'noteout 2s';
        }, 2000);
        setTimeout(() => {
          element = document.getElementById('note-f').remove();
        }, 4000);
      }
  }
}

elem = document.getElementById('loginbtn').addEventListener('click', async (event) => {
      event.preventDefault();
      authMessage.notelogin('success', 'working...');
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
          authMessage.notelogin('success', 'logging in...')
          let json = await res.json();
          let token = json['access_token'];
          localStorage.setItem('token', token);
          window.location.replace('https://stackoverflowlite-beta.herokuapp.com/home');
      }else{
        let data = await res.json();
        try{
            authMessage.notelogin('fail', data["description"]);
        }catch{
            authMessage.notelogin('fail', data["message"]);
        }
      }
});


elem = document.getElementById('signupbtn').addEventListener('click', async (event) => {
    event.preventDefault();
    authMessage.notesignup('success', 'working...');
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
            authMessage.notesignup('success', data);
        }else{
          let data = await res.json();
          authMessage.notesignup('fail', data["message"]);
        }
    }catch(err){
          console.log(err);
    }
});
