import { TableBody, TableHead } from '..';

export const StashTable = () => {
  return (
    <div className="relative overflow-x-auto shadow-md h-fit">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};
