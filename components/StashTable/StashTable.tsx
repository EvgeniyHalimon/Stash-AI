import { TableBody, TableHead } from '..';

export const StashTable = () => {
  return (
    <div className="relative h-fit overflow-x-auto shadow-md">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};
