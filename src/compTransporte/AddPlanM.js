import * as React from "react";
import {
  Typography,
  TextField,
  Fade,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Divider,
  FormGroup,
  Switch,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveSharpIcon from "@mui/icons-material/ArchiveSharp";
import PlaylistRemoveSharpIcon from "@mui/icons-material/PlaylistRemoveSharp";
import { useState } from "react";
import { Modal } from "bootstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in ref={ref} {...props} />;
});

const iniData = {
  Meses: "",
  Plan: "",
  Km: "",
  Km_sin_recorrer: "",
  Km_recorridos: "",
  Actividad: "",
  Fecha: "",
  Observaciones: "",
};

const iniDataValid = {
  Meses:  { error: false, errorText: "" },
  Plan:  { error: false, errorText: "" },
  Km:  { error: false, errorText: "" },
  Km_sin_recorrer:  { error: false, errorText: "" },
  Km_recorridos:  { error: false, errorText: "" },
  Actividad:  { error: false, errorText: "" },
  Fecha:  { error: false, errorText: "" },
  Observaciones:  { error: false, errorText: "" },
};

export default function FormBEntradaSalida({
  open,
  onClose,
  onContinue,
  create,
  editData,
  matricula,
  anno,
  ...props
}) {
  const [dataSt, setDataSt] = React.useState(iniData);
  const [dataValid, setDataValid] = React.useState(iniDataValid);
  const [loading, setLoading] = React.useState(false);


  const handleClose = () => {
    setDataSt(iniData);
    setDataValid(iniDataValid);
    setLoading(false);
    onClose();
  };

  const handleMeses = (e) => {
    setDataSt({
      ...dataSt,
      Meses: e.target.value,
    });
  };

  const handlePlan = (e) => {
    setDataSt({
      ...dataSt,
      Plan: e.target.value,
    });
  };

  const handleKm = (e) => {
    setDataSt({
      ...dataSt,
      Km: e.target.value,
    });
  };
  const handleKm_sin_recorrer = (e) => {
    setDataSt({
      ...dataSt,
      Km_sin_recorrer: e.target.value,
    });
  };
  const handleKm_recorridos = (e) => {
    setDataSt({
      ...dataSt,
      Km_recorridos: e.target.value,
    });
  };
  const handleActividad = (e) => {
    setDataSt({
      ...dataSt,
      Actividad: e.target.value,
    });
  };
  const handleFecha = (e) => {
    setDataSt({
      ...dataSt,
      Fecha: e.target.value,
    });
  };
  const handleObservaciones = (e) => {
    setDataSt({
      ...dataSt,
      Observaciones: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    const newData = {
      matricula: dataSt.Matricula,
      mes: dataSt.Meses,
      plan_consumo: dataSt.Plan,
      km_a_recorrer: dataSt.Km,
      km_prox_mant: dataSt.Km_sin_recorrer,
      km_recorridos: dataSt.km_recorridos,
      actividad: dataSt.Actividad,
      fecha_mant: dataSt.Fecha,
      descripcion: dataSt.Observaciones,
  };
  fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/mant-anual/${
    matricula
  }/${anno.format("YYYY")}`,
{
  method: 'POST', mode: 'cors',
  headers:{
    'Content-Type':'application/json'},
    body: JSON.stringify(newData),
  })
  .then(response=> response.json())
  // .then(usuario => {alert("ok")})
  .catch(error => {
    alert("Error", error);
    
});
handleClose();
  };
  
  return (
    
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      scroll="paper"
      TransitionComponent={Transition}
      aria-labelledby="form-data-client-sale-dialog-label"
      aria-describedby="form-data-client-sale-dialog-description"
    >
      <DialogTitle>
        {/* "Agregar Datos"  */}
        <Tooltip title="Cerrar" placement="top">
          <IconButton
            aria-label="cerrar-form-data-client-sale"
            disabled={loading}
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "65vh", minHeight: "65vh" }}>
        <Alert severity="info">Todos los campos deben ser llenados.</Alert>
        <Stack
          direction="row"
          spacing={2}
          alignItems="initial"
          alignContent="center"
          sx={{ mb: "1vh" }}
        >
          <FormControl
            variant="standard"
            sx={{ minWidth: "100px", width: "200px" }}
            disabled={loading}
          >
            <InputLabel id="estado">Seleccionar Mes</InputLabel>
            <Select
              labelId="mes"
              id="mes"
              defaultValue=""
              value={dataSt.Meses}
              onChange={handleMeses}
              label="cliente"
            >
                  <MenuItem value={1}>
                      Enero
                  </MenuItem>
                  <MenuItem value={2}>
                      Febrero
                  </MenuItem>
                  <MenuItem value={3}>
                      Marzo
                  </MenuItem>
                  <MenuItem value={4}>
                      Abril
                  </MenuItem>
                  <MenuItem value={5}>
                      Mayo
                  </MenuItem>
                  <MenuItem value={6}>
                      Junio
                  </MenuItem>
                  <MenuItem value={7}>
                      Julio
                  </MenuItem> 
                  <MenuItem value={8}>
                      Agosto
                  </MenuItem> 
                  <MenuItem value={9}>
                      Septiembre
                  </MenuItem>
                  <MenuItem value={10}>
                      Octubre
                  </MenuItem>
                  <MenuItem value={11}>
                      Nobiembre
                  </MenuItem>
                  <MenuItem value={12}>
                      Diciembre
                  </MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="Plan de Consumo"
            type="text"
            disabled={loading}
            value={dataSt.Plan}
            onChange={handlePlan}
            sx={{ minWidth: "60px", width: "150px" }}
          />
          <TextField
            variant="standard"
            label="Km a Recorrer"
            type="text"
            disabled={loading}
            value={dataSt.Km}
            onChange={handleKm}
            sx={{ minWidth: "100px", width: "150px" }}
          />
          <TextField
            variant="standard"
            label="Km sin recorrer"
            type="text"
            disabled={loading}
            value={dataSt.Km_sin_recorrer}
            onChange={handleKm_sin_recorrer}
            sx={{ minWidth: "160px", width: "220px" }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="initial"
          alignContent="center"
          sx={{ mb: "1vh" }}
        >
          <TextField
            variant="standard"
            label="Km recorridos"
            type="text"
            disabled={loading}
            value={dataSt.Km_recorridos}
            onChange={handleKm_recorridos}
            sx={{ minWidth: "100px", width: "230px" }}
          />
          <TextField
            variant="standard"
            label="Actividad a realizar"
            type="text"
            disabled={loading}
            value={dataSt.Actividad}
            onChange={handleActividad}
            sx={{ minWidth: "160px", width: "230px" }}
          />
          <TextField
            variant="standard"
            label="Fecha aproximada del mtto"
            type="text"
            disabled={loading}
            value={dataSt.Fecha}
            onChange={handleFecha}
            sx={{ minWidth: "160px", width: "230px" }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="initial"
          alignContent="center"
          sx={{ mb: "1vh" }}
        >
          <TextField
            variant="standard"
            label="Observaciones"
            type="text"
            disabled={loading}
            value={dataSt.Observaciones}
            onChange={handleObservaciones}
            sx={{ minWidth: "100px", width: "230px" }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          sx={{ borderRadius: 0, background: "#0E7352" }}
          disabled={loading}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <LoadingButton
          variant="contained"
          sx={{ borderRadius: 0, background: "#0E7352", color: "#fff" }}
          loading={loading}
          onClick={handleSubmit}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}