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
import Button from "../button/Button";
import Pagination from "../pagination/Pagination";
import Popover from "../popover/Popover";
import Select, { type SELECT_ITEM } from "../select/Select";
import Skeleton from "../skeleton/Skeleton";
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
  hasSorting?: boolean;
  hasPagination?: boolean;
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
    hasSorting = true,
    hasPagination = true,
    topContent,
    bottomContent,
    ...restProps
  } = props;

  const {
    page,
    setPage = () => ({}),
    totalPages,
    setPageSize = () => ({})
  } = paginationProps;

  const [lclPageSize, setLclPageSize] = useLocalStorage("pageSize", 10);

  // Set page size on render
  useEffect(() => setPageSize(lclPageSize), []);

  useEffect(() => {
    // Redirect to last page if current page no is greater total pages
    if (totalPages && page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setLclPageSize(parseInt(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDescriptor({ ...sortDescriptor, [e.target.name]: e.target.value });
  };

  return (
    <HeroUITable
      layout={layout}
      color={color}
      isVirtualized={isVirtualized}
      bottomContentPlacement="outside"
      isHeaderSticky
      maxTableHeight={637}
      topContentPlacement="outside"
      topContent={
        <div className="flex flex-row items-center justify-between gap-1">
          {topContent}
          <div />
          {hasSorting && (
            <Popover
              triggerElement={
                <Button
                  size="sm"
                  isLoading={tableBodyProps?.isLoading}
                  color="primary"
                >
                  Sort by:{" "}
                  {
                    columns.find(({ key }) => sortDescriptor.sortBy === key)
                      ?.label
                  }
                </Button>
              }
              placement="bottom-end"
              classNames={{
                content: "gap-3 p-1.5 flex flex-row"
              }}
            >
              <Select
                name="sortBy"
                items={columns
                  .filter(({ allowsSorting }) => allowsSorting)
                  .map(({ key, label }) => ({ key, label }))}
                className="w-40"
                placeholder="Name"
                size="sm"
                label="Sort by"
                isClearable
                defaultSelectedKeys={[sortDescriptor.sortBy]}
                onChange={handleSortChange}
                value={sortDescriptor.sortBy}
                isLoading={tableBodyProps?.isLoading}
                isDisabled={tableBodyProps?.isLoading}
              />

              <Select
                name="sortOrder"
                items={[
                  { label: "Low to high", key: "asc" },
                  { label: "High to low", key: "desc" }
                ]}
                className="w-40"
                placeholder="Low to high"
                label="Sort order"
                size="sm"
                isClearable
                onChange={handleSortChange}
                defaultSelectedKeys={[sortDescriptor.sortOrder]}
                value={sortDescriptor.sortOrder}
                isLoading={tableBodyProps?.isLoading}
                isDisabled={tableBodyProps?.isLoading}
              />
            </Popover>
          )}
        </div>
      }
      bottomContent={
        <div className="flex flex-row items-center justify-between gap-1">
          {bottomContent}
          <div />
          {
            // ? Below logic makes the pagination disappear when loading
            // ? Need to fix it
            hasPagination && (
              // !tableBodyProps?.isLoading &&
              <div className="flex w-full flex-row items-center justify-end gap-1">
                {tableBodyProps?.isLoading ? (
                  <Skeleton className="rounded-xl">
                    <div className="h-10 w-70" />
                  </Skeleton>
                ) : (
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page || 1}
                    total={totalPages || 1}
                    onChange={setPage}
                    isDisabled={tableBodyProps?.isLoading}
                  />
                )}

                {tableBodyProps?.isLoading ? (
                  <Skeleton className="rounded-xl">
                    <div className="h-10 w-30" />
                  </Skeleton>
                ) : (
                  <Select
                    className="max-w-31"
                    items={PAGE_SIZE_OPTIONS}
                    defaultSelectedKeys={[`${lclPageSize}`]}
                    onChange={handlePageSizeChange}
                    isDisabled={tableBodyProps?.isLoading}
                  />
                )}
              </div>
            )
          }
        </div>
      }
      sortDescriptor={{
        column: sortDescriptor.sortBy,
        direction:
          sortDescriptor.sortOrder === "asc" ? "ascending" : "descending"
      }}
      onSortChange={(sortDescriptor) =>
        setSortDescriptor({
          sortBy: sortDescriptor.column,
          sortOrder: sortDescriptor.direction === "ascending" ? "asc" : "desc"
        })
      }
      classNames={{
        td: "truncate"
      }}
      {...restProps}
    >
      <TableHeader columns={columns} {...tableHeaderProps}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.align || "start"}
            hideHeader={column.hideHeader || false}
            allowsSorting={false}
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
