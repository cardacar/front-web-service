import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

/* import { makeStyles } from '@mui/styles'; */

/* const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: theme.spacing(3),
      "& thead th": {
        fontWeight: "600",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.light,
      },
      "& tbody td": {
        fontWeight: "300",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fffbf2",
        cursor: "pointer",
      },
    },
  })); */

export default function useTable(data, headCells, filterFn) {
  //const styles = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table 
      sx={{ marginTop: 3, 
      "& thead th": { fontWeight: "600" },
      "& tbody td": {
        fontWeight: "300",
      },
      "& tbody tr:hover": {
        backgroundColor: "#B1BABD",
        cursor: "pointer",
      },
       }}>
      {props.children}
    </Table>
  );

  const TblHead = () => {
    const handleSort = (cellId) => {
      const isAscending = orderBy === cellId && order === "asc";
      setOrder(isAscending ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const changePage = (event, newPage) => {
    setPage(newPage);
  };
  //Funcion que detecta el cambio de pagina
  const changeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TablePaginationCustom = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={data.length}
      onPageChange={changePage}
      onRowsPerPageChange={changeRowsPerPage}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const dataAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(data), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return {
    TblContainer,
    TblHead,
    TablePaginationCustom,
    dataAfterPagingAndSorting,
  };
}
