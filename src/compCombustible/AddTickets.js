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
  Fecha: "",
  Hora: "",
  Lugar: "",
  No_chips: "",
  Entradas_Cant: "",
  Entradas_Importe: "",
  Salidas_Cant: "",
  Salidas_Importe: "",
  Saldo_Cantidad: "",
  Saldo_Importe: "",
};

const iniDataValid = {
  Fecha: { error: false, errorText: "" },
  Hora:{ error: false, errorText: "" },
  Lugar: { error: false, errorText: "" },
  No_chips: { error: false, errorText: "" },
  Entradas_Cant: { error: false, errorText: "" },
  Entradas_Importe: { error: false, errorText: "" },
  Salidas_Cant: { error: false, errorText: "" },
  Salidas_Importe: { error: false, errorText: "" },
  Saldo_Cantidad: { error: false, errorText: "" },
  Saldo_Importe: { error: false, errorText: "" },
};

export default function FormBEntradaSalida({
  open,
  onClose,
  onContinue,
  create,
  editData,
  matricula,
  fecha,
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

  const handleFecha = (e) => {
    setDataSt({
      ...dataSt,
      Fecha: e.target.value,
    });
  };

  const handleHora = (e) => {
    setDataSt({
      ...dataSt,
      Hora: e.target.value,
    });
  };

  const handleLugar = (e) => {
    setDataSt({
      ...dataSt,
      Lugar: e.target.value,
    });
  };
  const handleNo_Chips = (e) => {
    setDataSt({
      ...dataSt,
      No_Chips: e.target.value,
    });
  };
  const handleEntradas_Cant = (e) => {
    setDataSt({
      ...dataSt,
      Entradas_Cant: e.target.value,
    });
  };
  const handleEntradas_Importe = (e) => {
    setDataSt({
      ...dataSt,
      Entradas_Importe: e.target.value,
    });
  };
  const handleSalidas_Cant = (e) => {
    setDataSt({
      ...dataSt,
      Salidas_Cant: e.target.value,
    });
  };
  const handleSalidas_Importe = (e) => {
    setDataSt({
      ...dataSt,
      Salidas_Importe: e.target.value,
    });
  };
  const handleSaldo_Cantidad = (e) => {
    setDataSt({
      ...dataSt,
      Saldo_Cantidad: e.target.value,
    });
  };
  const handleSaldo_Importe = (e) => {
    setDataSt({
      ...dataSt,
      Saldo_Importe: e.target.value,
    });
  };
//   const handleSubmit = (e) => {
//     const newData = {
//       matricula: dataSt.Matricula,
//       fehca
//       Fecha: item.fecha,
//       Hora: "15:38",
//       Lugar: item.lugar,
//       No_Chips: item.nro_chip,
//       Entradas_Cant: item.cantidad_entrada,
//       Entradas_Importe: item.importe_entrada,
//       Salidas_Cant: item.cantidad_salida,
//       Salidas_Importe: item.importe_salida,
//       Saldo_Cant: item.cantidad_saldo,
//       Saldo_Importe: item.importe_saldo,
//   };
//   fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tickets/${
//     matricula
//   }/${fecha.format("YYYY/M")}`,
// {
//   method: 'POST', mode: 'cors',
//   headers:{
//     'Content-Type':'application/json'},
//     body: JSON.stringify(newData),
//   })
//   .then(response=> response.json())
//   // .then(usuario => {alert("ok")})
//   .catch(error => {
//     alert("Error", error);
    
// });
// handleClose();
//   };
  
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
        {/* {"Agregar Datos"}  */}
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
          <TextField
            variant="standard"
            label="Fecha"
            type="string"
            disabled={loading}
            value={dataSt.Fecha}
            onChange={handleFecha}
            sx={{ minWidth: "60px", width: "150px" }}
          />
          <TextField
            variant="standard"
            label="Hora"
            type="text"
            disabled={loading}
            value={dataSt.Hora}
            onChange={handleHora}
            sx={{ minWidth: "60px", width: "150px" }}
          />
          <TextField
            variant="standard"
            label="Lugar"
            type="text"
            disabled={loading}
            value={dataSt.Lugar}
            onChange={handleLugar}
            sx={{ minWidth: "100px", width: "150px" }}
          />
          <TextField
            variant="standard"
            label="No Chips"
            type="text"
            disabled={loading}
            value={dataSt.No_chips}
            onChange={handleNo_Chips}
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
          {/* <TextField
            variant="standard"
            label="Entradas: Cantidad"
            type="text"
            disabled={loading}
            value={dataSt.Entradas_Cant}
            onChange={handleEntradas_Cant}
            sx={{ minWidth: "100px", width: "230px" }}
          /> */}
          <TextField
            variant="standard"
            label="Entradas: Importe"
            type="text"
            disabled={loading}
            value={dataSt.Entradas_Importe}
            onChange={handleEntradas_Importe}
            sx={{ minWidth: "160px", width: "230px" }}
          />
          <TextField
            variant="standard"
            label="Salidas: Cantidad"
            type="text"
            disabled={loading}
            value={dataSt.Salidas_Cant}
            onChange={handleSalidas_Cant}
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
          {/* <TextField
            variant="standard"
            label="Salidas: Importe"
            type="text"
            disabled={loading}
            value={dataSt.Salidas_Importe}
            onChange={handleSalidas_Importe}
            sx={{ minWidth: "100px", width: "230px" }}
          /> */}
          {/* <TextField
            variant="standard"
            label="Saldo: Cantidad"
            type="text"
            disabled={loading}
            value={dataSt.Saldo_Cantidad}
            onChange={handleSaldo_Cantidad}
            sx={{ minWidth: "160px", width: "230px" }}
          />
          <TextField
            variant="standard"
            label="Saldo: Importe"
            type="text"
            disabled={loading}
            value={dataSt.Saldo_Importe}
            onChange={handleSaldo_Importe}
            sx={{ minWidth: "160px", width: "230px" }}
          /> */}
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
          // onClick={handleSubmit}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}