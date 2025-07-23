import useLocalStorage from "@/hooks/useLocalStoage";
import {
  getKeyValue,
  Table as HeroUITable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type TableProps as HeroUITableProps,
  type TableBodyProps,
  type TableColumnProps,
  type TableHeaderProps
} from "@heroui/react";
import React, { useEffect, type Key, type ReactElement } from "react";
import Pagination from "../pagination/Pagination";
import Select, { type SELECT_ITEM } from "../select/Select";
import Spinner from "../spinner/Spinner";

interface TABLE_COLUMN extends Partial<TableColumnProps<any>> {
  key: string;
  label: string;
}

type PAGINATION_PROPS = {
  page: number;
  setPage: (value: number) => void;
  totalPages: number | undefined;
  setPageSize: (value: number) => void;
};

type BaseProps = Omit<HeroUITableProps, "sortDescriptor">;

interface TableProps extends BaseProps {
  columns: TABLE_COLUMN[];
  rows:
    | {
        [key: string]: string | number | ReactElement | undefined | Key | null;
      }[]
    | undefined;
  tableHeaderProps?: Partial<TableHeaderProps<any>>;
  tableBodyProps?: Partial<TableBodyProps<any>>;
  paginationProps: PAGINATION_PROPS;
  setSortDescriptor: (value: SORT_PARAMS) => void;
  sortDescriptor: SORT_PARAMS;
}

const PAGE_SIZE_OPTIONS: SELECT_ITEM[] = [
  {
    key: "10",
    label: "10 / page"
  },
  {
    key: "20",
    label: "20 / page"
  },
  {
    key: "50",
    label: "50 / page"
  },
  {
    key: "100",
    label: "100 / page"
  },
  {
    key: "200",
    label: "200 / page"
  }
];

const Table = (props: TableProps) => {
  const {
    columns = [],
    rows = [],
    layout = "fixed",
    color = "primary",
    isVirtualized = true,
    tableBodyProps,
    tableHeaderProps,
    paginationProps,
    setSortDescriptor,
    sortDescriptor,
    ...restProps
  } = props;

  const {
    page = 1,
    setPage = () => ({}),
    totalPages = 1,
    setPageSize = () => ({})
  } = paginationProps;

  const [lclPageSize, setLclPageSize] = useLocalStorage("pageSize", 10);

  // Set page size on render
  useEffect(() => setPageSize(lclPageSize), []);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setLclPageSize(parseInt(e.target.value));

    // Set page number to 1 when page size changes
    setPage(1);
  };

  return (
    <HeroUITable
      layout={layout}
      color={color}
      isVirtualized={isVirtualized}
      isHeaderSticky
      bottomContentPlacement="outside"
      maxTableHeight={637}
      bottomContent={
        // ? Below logic makes the pagination disappear when loading
        // ? Need to fix it
        totalPages > 1 && (
          <div className="flex w-full justify-end gap-3">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={setPage}
              isDisabled={tableBodyProps?.isLoading}
            />

            <Select
              className="max-w-30"
              items={PAGE_SIZE_OPTIONS}
              defaultSelectedKeys={[`${lclPageSize}`]}
              onChange={handlePageSizeChange}
              isDisabled={tableBodyProps?.isLoading}
            />
          </div>
        )
      }
      {...restProps}
      sortDescriptor={{
        column: sortDescriptor.sortBy,
        direction:
          sortDescriptor.sortOrder === "asc" ? "ascending" : "descending"
      }}
      onSortChange={(sortDescriptor) => {
        setSortDescriptor({
          sortBy: sortDescriptor.column,
          sortOrder: sortDescriptor.direction === "ascending" ? "asc" : "desc"
        });
      }}
    >
      <TableHeader columns={columns} {...tableHeaderProps}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.align || "start"}
            hideHeader={column.hideHeader || false}
            allowsSorting={column.allowsSorting || false}
            isRowHeader={column.isRowHeader || false}
            textValue={column.textValue}
            width={column.width}
            maxWidth={column.maxWidth}
            minWidth={column.minWidth}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={rows}
        emptyContent={"No data to display."}
        loadingContent={<Spinner label="Loading..." />}
        {...tableBodyProps}
      >
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </HeroUITable>
  );
};

export default Table;
