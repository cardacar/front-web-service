import React, { Fragment, useEffect, useState } from "react";
import UseTable from "../components/UseTable";
import { TableBody, TableCell, TableRow, Toolbar } from "@mui/material";
import Controls from "../components/Controls/Control";
import { EditOutlined, Delete, Add } from "@mui/icons-material";
import {
  getAllEmployees,
  updateEmployees,
  deleteEmployee,
  createEmplotees,
} from "../services/employeesService";
import ModalDialog from "../components/ModalDialog";
import AddOrEddit from "../layout/AddOrEddit";
/* import {makeStyles} from '@mui/material/styles' */

const columns = [
  { id: "name", label: "Nombres" },
  { id: "apellidos", label: "Apellidos" },
  { id: "salario", label: "Salario" },
  { id: "cargo", label: "Cargo" },
  { id: "direccion", label: "Direccion" },
  { id: "antiguedad", label: "Antiguedad" },
  { id: "actions", label: "Acciones" },
];

const Home = () => {
  const [data, setData] = useState([]);
  const [openEditOrAdd, setOpenEditOrAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  //const styles = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    TblContainer,
    TblHead,
    TablePaginationCustom,
    dataAfterPagingAndSorting,
  } = UseTable(data, columns, filterFn);

  useEffect(() => {
    getAllEmployees().then(resp => setData(resp.data))
  }, [openEditOrAdd]);

  const openModal = (item) => {
    setDataEdit(item);
    setOpenEditOrAdd(true);
  };

  const addOrEdit = (dataForm, resetForm) => {
    console.log("agregar o actualizar");
    console.log({ dataForm, resetForm });
    if (dataForm.id === 0) {
        createEmplotees(dataForm).then(response => console.log(response))
    }else {
        updateEmployees(dataForm.id, dataForm).then(resp => console.log(resp))
    }
    resetForm();
    setDataEdit(null);
    setOpenEditOrAdd(false);
    //getAllEmployees().then(resp => setData(resp.data))
  };

  const deleteEmployeeApi = (id) => {
    deleteEmployee(id).then(resp => console.log(resp))
    getAllEmployees().then(resp => setData(resp.data))
  }

  return (
    <Fragment>
      <Toolbar>
        <Controls.Button
          text="Agregar"
          variant="outlined"
          startIcon={<Add />}
          //className={styles.newButton}
          onClick={() => {
            setOpenEditOrAdd(true);
            setDataEdit(null);
          }}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.apellidos}</TableCell>
              <TableCell>{item.salario}</TableCell>
              <TableCell>{item.cargo}</TableCell>
              <TableCell>{item.direccion}</TableCell>
              <TableCell>{item.antiguedad}</TableCell>
              <TableCell>
                <Controls.ActionButton
                  color="primary"
                  onClick={() => {
                    console.log("item");
                    openModal(item);
                  }}
                >
                  <EditOutlined fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                  color="secondary"
                  onClick={() => {
                    deleteEmployeeApi(item.id)
                  }}
                >
                  <Delete fontSize="small" />
                </Controls.ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TablePaginationCustom />
      <ModalDialog
        title="Formulario agregar un empleado"
        openModal={openEditOrAdd}
        setOpenModal={setOpenEditOrAdd}
      >
        <AddOrEddit dataForEdit={dataEdit} addOrEdit={addOrEdit} />
      </ModalDialog>
    </Fragment>
  );
};

export default Home;
