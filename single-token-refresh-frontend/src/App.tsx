import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [content, setContent] = useState('')

  async function query() {
    try {
      const res = await axios.post('http://localhost:3000/user/login', {
        username: 'guang',
        password: '123456'
      });
      console.log(res.data);

      const res2 = await axios.get('http://localhost:3000/bbb', {
        headers: {
          Authorization: `Bearer ${res.data}`
        }
      });
      setContent(res2.data);
    } catch(e: any) {
      console.log(e.response.data.message);
    }
  }

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        const newToken = response.headers['token'];

        console.log(response.headers);
        if(newToken) {
          localStorage.setItem('token ', newToken);
        }
        return response;
      }
    )

    query();
  }, []);

  return (
    <div style={{fontSize: '100px'}}>{content}</div>
  )
}

export default App
