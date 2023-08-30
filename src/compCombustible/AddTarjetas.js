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
import { useEffect } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in ref={ref} {...props} />;
});

const iniData = {
  No_Tarjetas: "",
  C_Control: "",
  Fecha: "",
  Chapa: "",
  Receptor: "",
  Ci: "",
  Lit_inicial: "",
  Combustible: "",
  Cliente: "",
  Activa: "",
  Estado: "",
};

const iniDataValid = {
  No_Tarjetas: { error: false, errorText: "" },
  C_Control: { error: false, errorText: "" },
  Fecha: { error: false, errorText: "" },
  Chapa: { error: false, errorText: "" },
  Receptor: { error: false, errorText: "" },
  Ci: { error: false, errorText: "" },
  Lit_inicial: { error: false, errorText: "" },
  Combustible: { error: false, errorText: "" },
  Cliente: { error: false, errorText: "" },
  Activa: { error: false, errorText: "" },
  Estado: { error: false, errorText: "" },
};

export default function FormBEntradaSalida({
  open,
  onClose,
  onContinue,
  create,
  editData,
  ...props
}) {
  const [checked, setChecked] = React.useState(true);
  const [dataSt, setDataSt] = React.useState(iniData);
  const [dataValid, setDataValid] = React.useState(iniDataValid);
  const [loading, setLoading] = React.useState(false);
  const [combustibles, setCombustibles] = React.useState([]);
  const [vehiculo, setVehiculo] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);

  const handleClose = () => {
    setDataSt(iniData);
    setDataValid(iniDataValid);
    setLoading(false);
    onClose();
  };

  const handleNo_Tarjetas = (e) => {
    setDataSt({
      ...dataSt,
      No_Tarjetas: e.target.value,
    });
  };

  const handleC_Control = (e) => {
    setDataSt({
      ...dataSt,
      C_Control: e.target.value,
    });
  };

  const handleFecha = (e) => {
    setDataSt({
      ...dataSt,
      Fecha: e.target.value,
    });
  };
  const handleChapa = (e) => {
    setDataSt({
      ...dataSt,
      Chapa: e.target.value,
    });
  };
  const handleReceptor = (e) => {
    setDataSt({
      ...dataSt,
      Receptor: e.target.value,
    });
  };
  const handleCi = (e) => {
    setDataSt({
      ...dataSt,
      Ci: e.target.value,
    });
  };
  const handleLit_inicial = (e) => {
    setDataSt({
      ...dataSt,
      Lit_inicial: e.target.value,
    });
  };
  const handleCombustible = (e) => {
    setDataSt({
      ...dataSt,
      Combustible: e.target.value,
    });
  };
  const handleCliente = (e) => {
    setDataSt({
      ...dataSt,
      Cliente: e.target.value,
    });
  };
  const handleActiva = (e) => {
    setChecked(e.target.checked);
    console.log(checked)
  };

  const handleEstado = (e) => {
    setDataSt({
      ...dataSt,
      Estado: e.target.value,
    });
  };
  // ------------- agregar datos a la API -----------------------
  const handleSubmit = (e) => {
    const newData = {
      numero: dataSt.No_Tarjetas,
      c_control: dataSt.C_Control,
      fecha: dataSt.Fecha,
      t_tarjeta_asociada_a: dataSt.Chapa,
      receptor: dataSt.Receptor,
      ci: dataSt.Ci,
      lit_inicio: dataSt.Lit_inicial,
      combos: dataSt.Combustible,
      cliente_pr: dataSt.Cliente,
      activa: checked,
      estado: dataSt.Estado,
    };
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tarjetas/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      // .then(usuario => {alert("ok")})
      .catch((error) => {
        alert("Error", error);
      });
    handleClose();
  };
  // -----------------------------------------------------------------

  // -------------- toma los tipos de combustibles existentes segun la tabla combustible --------------------
  const getCombustibles = React.useCallback(() => {
    setLoaded(false);
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tip-comb/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        const filteredData = data.map((item, index) => ({
          id: item.name + index,
          Tipo: item.name,
        }));

        setCombustibles(filteredData);
        // console.log(combustibles)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setCombustibles, setLoaded]);

  useEffect(()=>{
    getCombustibles()
  },[setCombustibles, setLoaded])
//   --------------------------------------------------------------------------------------------------------
useEffect(() => {
  getCombustibles();
}, []);

// --------------------toma las chapas existentes en la tabla vehiculo --------------------------------
const getVehiculo = React.useCallback(() => {
  setLoaded(false);
  fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/vehiculo/`)
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data.map((item, index) => ({
        id: item.matricula + index,
        Chapa: item.matricula,
      }));

      setVehiculo(filteredData);
    })
    .catch((err) => console.log(err))
    .finally(() => setLoaded(true));
}, [setVehiculo, setLoaded]);
// -------------------------------------------------------------------------------------------------------
useEffect(() => {
  getVehiculo();
}, []);

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
        {/* {"Agregar Datos"} */}
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
            label="No de Tarjetas"
            type="string"
            disabled={loading}
            value={dataSt.Combustible}
            onChange={handleNo_Tarjetas}
            sx={{ minWidth: "60px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Centro de Control"
            type="text"
            disabled={loading}
            value={dataSt.Precio}
            onChange={handleC_Control}
            sx={{ minWidth: "60px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Fecha"
            type="text"
            disabled={loading}
            value={dataSt.Subelemento}
            onChange={handleFecha}
            sx={{ minWidth: "100px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl
            variant="standard"
            sx={{ minWidth: "100px", width: "200px" }}
            disabled={loading}
          >
            <InputLabel id="cliente">Seleccionar Matrícula</InputLabel>
            <Select
              labelId="chapa"
              id="chapa"
              defaultValue=""
              value={dataSt.Chapa}
              onChange={handleChapa}
              label="chapa"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {vehiculo.map((ele) => {
                return (
                  <MenuItem key={ele.id} value={ele.id}>
                    {ele.Chapa}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
            label="Receptor"
            type="text"
            disabled={loading}
            value={dataSt.Subelemento}
            onChange={handleReceptor}
            sx={{ minWidth: "100px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Ci"
            type="text"
            disabled={loading}
            value={dataSt.Subelemento}
            onChange={handleCi}
            sx={{ minWidth: "160px", width: "275px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Lit. inicial"
            type="text"
            disabled={loading}
            value={dataSt.Subelemento}
            onChange={handleLit_inicial}
            sx={{ minWidth: "160px", width: "275px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
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
            <InputLabel id="cliente">Seleccionar Combustible</InputLabel>
            <Select
              labelId="combustible"
              id="combustible"
              defaultValue=""
              value={dataSt.Combustible}
              onChange={handleCombustible}
              label="combustible"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {combustibles.map((ele) => {
                return (
                  <MenuItem key={ele.id} value={ele.id}>
                    {ele.Tipo}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="Cliente"
            type="text"
            disabled={loading}
            value={dataSt.Subelemento}
            onChange={handleCliente}
            sx={{ minWidth: "160px", width: "250px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ fontSize: "12px" }}
                checked={checked}
                onChange={handleActiva}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Activa"
            
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="initial"
          alignContent="center"
          sx={{ mb: "1vh" }}
        >
          {/* 700 */}
          <FormControl
            variant="standard"
            sx={{ minWidth: "100px", width: "200px" }}
            disabled={loading}
          >
            <InputLabel id="estado">Seleccionar Estado</InputLabel>
            <Select
              labelId="estado"
              id="estado"
              defaultValue=""
              value={dataSt.Estado}
              onChange={handleEstado}
              label="cliente"
            >
              <MenuItem value={1}>Asigando</MenuItem>
              <MenuItem value={2}>Existencia</MenuItem>
              <MenuItem value={3}>Vencida</MenuItem>
              <MenuItem value={4}>Cancelada</MenuItem>
              <MenuItem value={5}>Pérdida o Deterioro</MenuItem>
            </Select>
            {console.log(dataSt.Estado)} 
          </FormControl>
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
