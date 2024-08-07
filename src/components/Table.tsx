import { DataTable } from 'mantine-datatable';
import { IFilter } from '../constants/constants';

interface ITable {
    records: any;
    total: number;
    columns: any[];
    filter: IFilter;
    fetching?: boolean;
    selectedRecords?: any;
    handleOnSelectedRecordsChange?: any;
    handleChangeFilter?: any;
}

const Table = ({ records, total, columns, filter, selectedRecords, fetching, handleOnSelectedRecordsChange, handleChangeFilter }: ITable) => {
    return (
        <div className="datatables pagination-padding">
            <DataTable
                className="whitespace-nowrap table-hover invoice-table"
                records={records}
                columns={columns}
                highlightOnHover
                totalRecords={total}
                recordsPerPage={filter.size}
                page={filter.page}
                recordsPerPageOptions={[10, 20, 30, 50, 100]}
                onPageChange={(page) => handleChangeFilter({ ...filter, page })}
                onRecordsPerPageChange={(size) => handleChangeFilter({ ...filter, size })}
                selectedRecords={selectedRecords}
                onSelectedRecordsChange={handleOnSelectedRecordsChange}
                paginationText={({ from, to, totalRecords }) => `Hiển thị từ ${from} đến ${to} trong ${totalRecords} bản ghi`}
                fetching={fetching}
            />
        </div>
    );
};

export default Table;
