import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Todo } from 'components/Todo';
import { Auth } from 'components/Auth';
import { useEffect } from 'react';
import axios from 'axios';
import { CsrfToken } from 'types';

function App() {
  useEffect(() => {
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
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
