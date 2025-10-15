import React from 'react';

interface ListContentProps {
  loading: boolean
  error: string | null
  totalData: number
  children: React.ReactNode
}

const ListContent: React.FC<ListContentProps> = ({ loading, error, totalData, children }) => {
  return (
    <>
      {
        loading
          ? <p className='text-center'>Loading...</p>
          : error
            ? <p className='text-center'>{error}</p>
            : totalData == 0
              ? <p className='text-center'>No Data</p>
              : children
      }
    </>
  );
};

export default ListContent;