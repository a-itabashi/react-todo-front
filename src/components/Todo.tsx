import { FormEvent } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { taskStore } from 'store/taskStore';
import { useQueryTasks } from 'hooks/useQueryTasks';
import { useMutateTask } from 'hooks/useMutateTask';
import { TaskItem } from 'components/TaskItem';

export const Todo = () => {
  // const queryClient = useQueryClient();
  const { editedTask } = taskStore();
  const updateTask = taskStore((state) => state.updateEditedTask);
  const { data, isLoading } = useQueryTasks();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  // const { logoutMutation } = useMutateAuth();
  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === 0)
      createTaskMutation.mutate({
        title: editedTask.title
      });
    else {
      updateTaskMutation.mutate(editedTask);
    }
  };
  // const logout = async () => {
  //   // mutateAsync()は、データを更新する非同期関数を実行し、その関数が完了した後に取得した最新のデータをキャッシュします。
  //   await logoutMutation.mutateAsync();
  //   queryClient.removeQueries(['tasks']);
  // };
  return (
    <div className='flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono'>
      <div className='flex items-center my-3'>
        <ShieldCheckIcon className='h-8 w-8 mr-3 text-indigo-500 cursor-pointer' />
        <span className='text-center text-3xl font-extrabold'>Task Manager</span>
      </div>
      {/* <ArrowRightOnRectangleIcon
        onClick={logout}
        className='h-6 w-6 my-6 text-blue-500 cursor-pointer'
      /> */}
      <form onSubmit={submitTaskHandler}>
        <input
          className='mb-3 mr-3 px-3 py-2 border border-gray-300'
          placeholder='title ?'
          type='text'
          onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
          value={editedTask.title || ''}
        />
        <button
          className='disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded'
          disabled={!editedTask.title}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='my-5'>
          {data?.map((task) => (
            <TaskItem key={task.id} id={task.id} title={task.title} />
          ))}
        </ul>
      )}
    </div>
  );
};
