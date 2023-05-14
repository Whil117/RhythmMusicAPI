import { toast } from 'react-toastify';

const clipBoard = (url: string) => {
  toast.success('URL copied successfully'), navigator.clipboard.writeText(url);
};

export default clipBoard;
