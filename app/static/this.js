let head = new Headers({
  "Content-Type":"application/json"
});

let baseURL = 'http://localhost:8000/';


async function login(){
    const loginForm = document.forms['loginForm']
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    console.log(email,password);
    url = baseURL + 'api/v1/auth/login'
    try{
        console.log("here");
        let res = await fetch(url, {
            method: 'POST',
            headers: head,
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        console.log("after fetch");
        if(res.status == 200){
            console.log("success");
            console.log("logged in successfully");
            let json = await response.json();
            console.log(json);
            let token = json['access_token'];
            localStorage.setItem('token', token)
            window.location.replace(baseURL+'home')
        }else{
            console.log("good fail");
            data = await res.json()
            console.log(res.status);
            console.log(data);
            console.log("Ooops something went wrong");
        }
      }catch(err){
        console.log(err);
    }
}


async function submitSignup(){
  const signupForm = document.forms['signupForm']
  let username = signupForm.username.value;
  let email = signupForm.email.value;
  let password = signupForm.password.value;
  url = baseURL + 'api/v1/auth/signup'
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
      console.log("User created successfully");
    }else{
      console.log(res.status);
      console.log("Ooops something went wrong");
    }
  }catch(err){
    console.log(err);
  }
}
