export const BASE_URL = 'https://auth.nomoreparties.co';

export const signUp = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject(`Ошибка: некорректно заполнено одно из полей`)
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

export const signIn = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return Promise.reject(`Ошибка: не передано одно из полей`)
      } else if ( res.status === 401) {
        return Promise.reject(`Ошибка: пользователь с email не найден`)
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}
