class AuthApi {

    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = {
        'Content-Type': options.headers['Content-Type']
      };
    }

    login(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
          })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 400) {
                return Promise.reject(`не передано одно из полей`);
            } else if (res.status === 401) {
                return Promise.reject(`пользователь с email не найден`);
            } 
            return Promise.reject(`Error: ${res.status}`);
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return this.user();
            }
        });
    }
  
    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
               email: data.email,
               password: data.password
            }) 
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 400) {
                return Promise.reject(`некорректно заполнено одно из полей`);
            } 
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    user() {
        const jwt = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${jwt}`,
            }
          })
          .then((res) => {
              if (res.ok) {
                  return res.json();
              } else if (res.status === 400) {
                  return Promise.reject(`Токен не передан или передан не в том формате`);
              } else if (res.status === 401) {
                  return Promise.reject(`Переданный токен некорректен`);
              } 
              return Promise.reject(`Error: ${res.status}`);
          });
    }

    logout() {
        localStorage.removeItem("jwt");
    }
}

const auth = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;