import {
  getKeyValue,
  Table as HeroUITable,
  Pagination,
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
import { type Key, type ReactElement } from "react";
import Spinner from "../spinner/Spinner";

interface TABLE_COLUMN extends Partial<TableColumnProps<any>> {
  key: string;
  label: string;
}

type PAGINATION_PROPS = {
  page: number;
  setPage: (value: number) => void;
  totalPages: number | undefined;
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

const Table = (props: TableProps) => {
  const {
    columns = [],
    rows = [],
    layout = "fixed",
    color = "primary",
    isVirtualized = true,
    tableBodyProps,
    tableHeaderProps,
    paginationProps = {
      page: 0,
      setPage: () => ({}),
      totalPages: 1
    },
    setSortDescriptor,
    sortDescriptor,
    ...restProps
  } = props;

  const { page = 0, setPage, totalPages = 1 } = paginationProps;

  return (
    <HeroUITable
      layout={layout}
      color={color}
      isVirtualized={isVirtualized}
      isHeaderSticky
      bottomContentPlacement="outside"
      bottomContent={
        totalPages > 1 && (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
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
