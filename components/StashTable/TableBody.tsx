'use client';

import { useState } from 'react';
import { fetchWithAuth, formatDate, getQueryClient, IGoods } from '@/shared';
import { TableData, TableRow } from '..';
import { useMutation } from '@tanstack/react-query';
import { EditGoodModal, EditGoodsForm } from './EditGoodModal';

export const TableBody = ({
  goods,
  refetch,
}: {
  goods: IGoods[];
  refetch: () => void;
}) => {
  const qc = getQueryClient();
  const [editingGood, setEditingGood] = useState<Partial<IGoods> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteGood = async (id: string) => {
    await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/goods/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteGood,
    onError: error => console.error('Delete failed:', error),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['goods', 'goods-by-user'],
        exact: false,
      });
      refetch();
    },
  });

  const updateGood = async ({
    id,
    data,
  }: {
    id: string;
    data: EditGoodsForm;
  }) => {
    await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/goods/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: updateGood,
    onError: error => console.error('Update failed:', error),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['goods', 'goods-by-user'],
        exact: false,
      });
      refetch();
      setIsModalOpen(false);
      setEditingGood(null);
    },
  });

  const handleEdit = (good: Partial<IGoods>) => {
    setEditingGood(good);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGood(null);
  };

  const handleSubmit = (data: EditGoodsForm) => {
    if (editingGood) {
      updateMutate({ id: String(editingGood._id), data });
    }
  };

  const getInitialValues = (good: Partial<IGoods>): EditGoodsForm => ({
    title: good.title,
    price: good.price,
    category: good.category,
    postponed: good.postponed,
    whenWillItEnd: good.whenWillItEnd,
  });

  return (
    <>
      <tbody>
        {goods.map(
          ({
            _id,
            title,
            price,
            category,
            postponed,
            remainingToBePostponed,
            whenWillItEnd,
          }) => (
            <TableRow key={_id} className="table-body-row">
              <th scope="row" className="table-body-cell-first">
                {title}
              </th>
              <TableData className="table-body-cell">{price}</TableData>
              <TableData className="table-body-cell">{category}</TableData>
              <TableData className="table-body-cell">{postponed}</TableData>
              <TableData className="table-body-cell">
                {remainingToBePostponed}
              </TableData>
              <TableData className="table-body-cell">
                {formatDate(whenWillItEnd)}
              </TableData>
              <TableData className="table-body-cell">
                <div className="table-actions">
                  <button
                    onClick={() =>
                      handleEdit({
                        _id,
                        title,
                        price,
                        category,
                        postponed,
                        whenWillItEnd,
                      })
                    }
                    className="table-edit-button"
                  >
                    Edit
                  </button>
                  <span className="table-divider">|</span>
                  <button
                    onClick={() => deleteMutate(_id)}
                    className="table-delete-button"
                  >
                    Delete
                  </button>
                </div>
              </TableData>
            </TableRow>
          ),
        )}
      </tbody>

      {isModalOpen && editingGood && (
        <EditGoodModal
          initialValues={getInitialValues(editingGood)}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isPending={isUpdatePending}
        />
      )}
    </>
  );
};
