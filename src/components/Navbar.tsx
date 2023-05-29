import { useQueryClient } from '@tanstack/react-query';
import { useMutateAuth } from 'hooks/useMutateAuth';
// import { Breadcrumb } from 'components/Breadcrumb';
import { Link } from 'react-router-dom';
import { authStore } from 'store/authStore';

export const Navbar = () => {
  const { isLogged } = authStore();
  const queryClient = useQueryClient();
  const { logoutMutation } = useMutateAuth();
  const logout = async () => {
    // mutateAsync()は、データを更新する非同期関数を実行し、その関数が完了した後に取得した最新のデータをキャッシュします。
    await logoutMutation.mutateAsync();
    queryClient.removeQueries(['tasks']);
  };

  return (
    <nav className='relative w-full flex flex-wrap items-center justify-between py-3  text-gray-500 hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg navbar-light'>
      <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
        <Link to='/' className='text-gray-500 hover:text-gray-600'>
          {/* {siteConfig.title} */}
          テストタイトル
        </Link>
        {/* {isLogged ?? ( */}
        <button color='primary' onClick={logout}>
          ログアウト
        </button>
        {/* )} */}
      </div>
    </nav>
  );
};
