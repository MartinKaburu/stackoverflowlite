let head = new Headers({
  'Content-Type':'application/json'
});

let baseURL = 'http://127.0.0.1:8000/api/v1/'


const notelogin = (data) =>{
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
}


const notesignup = (data) =>{
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


elem = document.getElementById('loginbtn').addEventListener('click', async (event) => {
      event.preventDefault();
      let form = document.getElementById('login');
      let email = form.email.value;
      let password = form.password.value;
      let frame = JSON.stringify({
        "email": email,
        "password": password,
      })
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
          window.location.replace('http://127.0.0.1:5000/home');
      }else{
        let data = await res.json();
        try{
            notelogin(data["description"]);
        }catch{
            notelogin(data["message"]);
        }
      }
});


elem = document.getElementById('signupbtn').addEventListener('click', async (event) => {
    event.preventDefault();
    const signupForm = document.forms['signupForm'];
    let username = signupForm.username.value;
    let email = signupForm.email.value;
    let password = signupForm.password.value;
    url = baseURL + 'auth/signup';
    try{
        let res = await fetch(url, {
          method: 'POST',
          headers: head,
          body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
          })
        })
        if(res.status == 201){
            let data = await res.json();
            data = data["message"]+"&nbsp;log in to continue";
            notesignup(data);
        }else{
          let data = await res.json();
          notesignup(data["message"]);
        }
    }catch(err){
          console.log(err);
    }
});
