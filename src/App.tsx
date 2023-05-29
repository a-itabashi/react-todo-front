import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Todo } from 'components/Todo';
import { Auth } from 'components/Auth';
import { Navbar } from 'components/Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import { CsrfToken } from 'types';
import { authStore } from 'store/authStore';
import { getCookie } from 'utils/getCookie';

function App() {
  // const { isLogged, logIn, logOut } = authStore();
  useEffect(() => {
    // const token = getCookie('token');
    // console.log(token);
    // if (token) {
    //   console.log('test');
    //   logIn();
    // }
    // axios に Cookie を送受信させたいときは withCredentials=true を設定する
    axios.defaults.withCredentials = true;
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(`${process.env.REACT_APP_API_URL}/csrf`);
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token;
    };
    getCsrfToken();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
