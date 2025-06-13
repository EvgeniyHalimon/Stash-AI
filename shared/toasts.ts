import { toast } from 'react-toastify';

export const toastError = (error: Error) =>
  toast.error(error instanceof Error ? error.message : 'Something went wrong!');
