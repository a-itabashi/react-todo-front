import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Task } from 'types';
import { taskStore } from 'store/taskStore';
import { useError } from 'hooks/useError';

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const { switchErrorHandling } = useError();
  const resetEditedTask = taskStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation(
    // Omitを使用してTask型から'id' | 'created_at' | 'updated_at'プロパティを除外した新しい型を作成
    (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) =>
      axios.post<Task>(`${process.env.REACT_APP_API_URL}/tasks`, task),
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
        if (previousTasks) {
          // 既存の配列に新しいtaskデータを追加する
          queryClient.setQueryData(['tasks'], [...previousTasks, res.data]);
        }
        resetEditedTask();
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      }
    }
  );
  const updateTaskMutation = useMutation(
    (task: Omit<Task, 'created_at' | 'updated_at'>) =>
      axios.put<Task>(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
        title: task.title
      }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            previousTasks.map((task) => (task.id === variables.id ? res.data : task))
          );
        }
        resetEditedTask();
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      }
    }
  );
  const deleteTaskMutation = useMutation(
    (id: number) => axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            ['tasks'],
            previousTasks.filter((task) => task.id !== variables)
          );
        }
        resetEditedTask();
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      }
    }
  );
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation
  };
};
