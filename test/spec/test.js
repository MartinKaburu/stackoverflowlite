let head = new Headers({
  'Content-Type':'application/json'
});

let baseURL = 'http://127.0.0.1:8000/api/v1/'


describe("test user authentication", () => {
    it("create user", async () => {
        let email = 'test@gmail.com';
        let username = 'jasmine_test';
        let password = 'kaburu';
        let settings = {
          method: 'POST',
          headers: head,
          body: JSON.stringify({email, password, username})
        };
        let url = baseURL+'auth/signup'
        let res = await fetch(url, settings);
        expect(res.status).toEqual(201);
    });

    it("login user", async () => {
        let email = 'test@gmail.com';
        let password = 'kaburu';
        let settings = {
          method: 'POST',
          headers: head,
          body: JSON.stringify({email, password})
        };
        let url = baseURL+'auth/login'
        let res = await fetch(url, settings);
        let data = await res.json();
        let token = data["access_token"];
        head.append('Authorization', 'JWT '+token);
        console.log(data["access_token"]);
        expect(res.status).toEqual(200);
        expect(true).toEqual(true);
    });
});


describe('get from server', () => {
    it('fetch all questions', async() => {
      let url = baseURL+'questions';
      settings = {
        method: 'GET',
        headers: head
      };
      const res = await fetch(url, settings);
      expect(res.status).toEqual(404);
    });


    it('fetch user questions', async() => {
      let url = baseURL+'questions/user';
      settings = {
        method: 'GET',
        headers: head
      };
      const res = await fetch(url, settings);
      data = await res.json();
      expect(res.status).toEqual(404);
      expect(data['message']).toEqual('Current user has no questions')
    });
});
