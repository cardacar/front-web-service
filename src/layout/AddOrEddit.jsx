import React, { Fragment, useEffect } from "react";
import { Typography, Divider, Grid } from "@mui/material";
import { useForm, Form } from "../components/Form";
import Controls from "../components/Controls/Control";

const initialValues = {
  id: 0,
  name: "",
  apellidos: "",
  salario: "",
  cargo: "",
  direccion: "",
  antiguedad: "",
};

const AddOrEddit = (props) => {
  const { addOrEdit, dataForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    setValues,
    errors,
    /* setErrors, */ handleInputChange,
    resetForm,
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (dataForEdit != null) {
      const newDataForEdit = {
        id: dataForEdit.id,
        name: dataForEdit.name,
        apellidos: dataForEdit.apellidos,
        salario: dataForEdit.salario,
        cargo: dataForEdit.cargo,
        direccion: dataForEdit.direccion,
        antiguedad: dataForEdit.antiguedad,
      };
      setValues({
        ...newDataForEdit,
      });
    }
  }, [setValues, dataForEdit]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <div style={{display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'center'}}>
          
            <Controls.Input
              name="name"
              label="Nombre*"
              value={values.name}
              onChange={handleInputChange}
              errors={errors.name}
            />
            <Controls.Input
              name="apellidos"
              label="apellidos*"
              value={values.apellidos}
              onChange={handleInputChange}
              errors={errors.apellidos}
              
              sx={{marginTop: 2}}
            />
            <Controls.Input
              name="salario"
              label="salario*"
              value={values.salario}
              onChange={handleInputChange}
              errors={errors.salario}
              type="Number"
              sx={{marginTop: 2}}
            />
            <Controls.Input
              name="cargo"
              label="cargo*"
              value={values.cargo}
              onChange={handleInputChange}
              errors={errors.cargo}
              sx={{marginTop: 2}}
            />
            <Controls.Input
              name="direccion"
              label="direccion*"
              value={values.direccion}
              onChange={handleInputChange}
              errors={errors.direccion}
              sx={{marginTop: 2}}
            />
            <Controls.Input
              name="antiguedad"
              label="antiguedad*"
              value={values.antiguedad}
              onChange={handleInputChange}
              errors={errors.antiguedad}
              type="Number"
              sx={{marginTop: 2}}
            />

          <Divider variant="middle" />

          <div style={{margin: '10px', width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Controls.Button type="submit" text="Agregar" size="small" style={{marginRight: '20px'}} />
            <Controls.Button text="Reiniciar" onClick={resetForm} size="small" />
          </div>

          </div>

        
      </Form>
    </Fragment>
  );
};

export default AddOrEddit;
