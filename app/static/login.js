let head = new Headers({
  'Content-Type':'application/json'
});

// const login = async () => {
//       let form = document.getElementById('login');
//       let email = form.email.value;
//       let password = form.password.value;
//       let frame = JSON.stringify({
//         "email": email,
//         "password": password,
//       })
//       console.log(frame);
//       let settings = {
//           method: 'POST',
//           headers: {'Content-Type':'application/json'},
//           body: frame
//       }
//       let url = 'http://127.0.0.1:8000/api/v1/auth/login'
//       fetch(url, settings)
//       .then((res) => {
//           if(res.status == 200){
//               console.log("success");
//               res.json().then((data) => {
//               localStorage.setItem("token", data["access_token"]);
//               window.location.replace('http://127.0.0.1:5000/home');
//             })
//           }else{
//               console.log("login failed");
//               console.log(res.json());
//               console.log(res.status);
//               return;
//           }
//      })
//       .catch((err) => {
//           console.log(err);
//         });
// };

const login = async () => {
    let form = document.getElementById('login');
    let email = form.email.value;
    let password = form.password.value;
    let url = 'http://127.0.0.1:8000/api/v1/auth/login'
    let res  = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'email': "mugunamartin340@gmail.com",
          'password': "kaburu@andela",
        })
    })
    console.log(res.status);
    if(res.status == 200){
      console.log(" success is here");
      data  = await res.json()
      console.log(data);
    }else{
      console.log("failed");
      data = await res.json();
      console.log(data);
    }

};

async function submitSignup(){
  const signupForm = document.forms['signupForm']
  let username = signupForm.username.value;
  let email = signupForm.email.value;
  let password = signupForm.password.value;
  url = baseURL + 'auth/signup'
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
