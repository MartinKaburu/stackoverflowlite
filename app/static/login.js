let head = new Headers({
  "Content-Type":"application/json"
});

signupForm = document.forms['signupForm']
let baseURL = 'http://localhost:8000/';


async function login(){
  let loginForm = document.getElementById('login')
  let email = loginForm.email.value;
  let password = loginForm.password.value;
  console.log(email, password)
  url = baseURL + 'api/v1/auth/login'
  const response = await fetch(url, {
    method: 'POST',
    headers: head,
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
  if (response.status == 200){
    let json = await response.json();
    console.log(json);
    let token = json['access_token'];
    localStorage.setItem('token', token)
    window.location.replace(baseURL+'home')
  }else{
    console.log(response.status)
    alert('Invalid credentials');
    }
}
