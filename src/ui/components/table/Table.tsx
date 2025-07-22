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
import type { Key, ReactElement } from "react";
import Spinner from "../spinner/Spinner";

interface TABLE_COLUMN extends Partial<TableColumnProps<any>> {
  key: string;
  label: string;
}

interface TableProps extends HeroUITableProps {
  columns: TABLE_COLUMN[];
  rows:
    | {
        [key: string]: string | number | ReactElement | undefined | Key | null;
      }[]
    | undefined;
  tableHeaderProps?: Partial<TableHeaderProps<any>>;
  tableBodyProps?: Partial<TableBodyProps<any>>;
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
    ...restProps
  } = props;

  return (
    <HeroUITable
      layout={layout}
      color={color}
      isVirtualized={isVirtualized}
      isHeaderSticky
      maxTableHeight={820}
      {...restProps}
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
        loadingContent={<Spinner />}
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
