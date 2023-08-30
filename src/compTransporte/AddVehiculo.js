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
import { Select } from "@mui/material";
import { useEffect } from "react";
import { fontSize } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in ref={ref} {...props} />;
});

const iniData = {
  id: "",
  Matricula: "",
  Tipo: "",
  Marca: "",
  Modelo: "",
  Color: "",
  Indice_Real: "",
  Fecha_normaConsumo: "",
  Venc_FICAV: "",
  Venc_LicOperativa: "",
  Estado_tecn: "",
  Comb_utiliza: "",
  Cap_Tanque: "",
  coms_segunFabr: "",
  prueba_litro: "",
  No_Motor: "",
  No_chasi: "",
  Tarjetas_combustible: "",
  No_AFT: "",
};

const iniDataValid = {
  Matricula: { error: false, errorText: "" },
  Tipo: { error: false, errorText: "" },
  Marca: { error: false, errorText: "" },
  Modelo: { error: false, errorText: "" },
  Color: { error: false, errorText: "" },
  Indice_Real: { error: false, errorText: "" },
  Fecha_normaConsumo: { error: false, errorText: "" },
  Venc_FICAV: { error: false, errorText: "" },
  Venc_LicOperativa: { error: false, errorText: "" },
  Estado_tecn: { error: false, errorText: "" },
  Comb_utiliza: { error: false, errorText: "" },
  Cap_Tanque: { error: false, errorText: "" },
  coms_segunFabr: { error: false, errorText: "" },
  prueba_litro: { error: false, errorText: "" },
  No_Motor: { error: false, errorText: "" },
  No_chasi: { error: false, errorText: "" },
  Tarjetas_combustible: { error: false, errorText: "" },
  No_AFT: { error: false, errorText: "" },
};

export default function FormBEntradaSalida({
  open,
  onClose,
  onContinue,
  create,
  editData,
  onChange,
  ...props
}) {
  const [dataSt, setDataSt] = React.useState(iniData);
  const [dataValid, setDataValid] = React.useState(iniDataValid);
  const [loading, setLoading] = React.useState(false);
  const [combustibles, setCombustibles] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const [checked, setChecked] = React.useState(true);

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

  // ------------- add elementos a la API---------------------
  const handleSubmit = (e) => {
    const newData = {
    matricula: dataSt.Matricula,
    tipo: dataSt.Tipo,
    marca: dataSt.Marca,
    modelo: dataSt.Modelo,
    color: dataSt.Color,
    indice_consumo_real: dataSt.Indice_Real,
    indice_consumo_fabricante: dataSt.coms_segunFabr,
    f_act_indice: dataSt.Fecha_normaConsumo,
    f_vencFICAV: dataSt.Venc_FICAV,
    f_venc_lic_operativa: dataSt.Venc_LicOperativa,
    apto: checked,
    cap_tanque: dataSt.Cap_Tanque,
    prueba_litro: dataSt.prueba_litro,
    num_motor: dataSt.No_Motor,
    num_chasis: dataSt.No_chasi,
    num_AFT: dataSt.No_AFT,
    combustible: dataSt.Comb_utiliza,
    tarjeta_asociada: parseInt(dataSt.Tarjetas_combustible),
  };
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/vehiculo/`,
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
// ------------------------------------------------------------------------------------
  const handleMatricula = (e) => {
    setDataSt({
      ...dataSt,
      Matricula: e.target.value,
    });
  };

  const handleTipo = (e) => {
    setDataSt({
      ...dataSt,
      Tipo: e.target.value,
    });
  };

  const handleMarca = (e) => {
    setDataSt({
      ...dataSt,
      Marca: e.target.value,
    });
  };
  const handleModelo = (e) => {
    setDataSt({
      ...dataSt,
      Modelo: e.target.value,
    });
  };
  const handleColor = (e) => {
    setDataSt({
      ...dataSt,
      Color: e.target.value,
    });
  };
  const handleIndice_Real = (e) => {
    setDataSt({
      ...dataSt,
      Indice_Real: e.target.value,
    });
  };
  const handleFecha_normaConsumo = (e) => {
    setDataSt({
      ...dataSt,
      Fecha_normaConsumo: e.target.value,
    });
  };
  
  const handleVenc_FICAV = (e) => {
    setDataSt({
      ...dataSt,
      Venc_FICAV: e.target.value,
    });
  };
  const handleVenc_LicOperativa = (e) => {
    setDataSt({
      ...dataSt,
      Venc_LicOperativa: e.target.value,
    });
  };
  const handleEstado_tecn = (e) => {
    setChecked(e.target.checked);
  };
  const handleComb_utiliza = (e) => {
    setDataSt({
      ...dataSt,
      Comb_utiliza: e.target.value,
    });
  };
  const handleCap_Tanque = (e) => {
    setDataSt({
      ...dataSt,
      Cap_Tanque: e.target.value,
    });
  };
  const handlecoms_segunFabr = (e) => {
    setDataSt({
      ...dataSt,
      coms_segunFabr: e.target.value,
    });
  };
  const handleprueba_litro = (e) => {
    setDataSt({
      ...dataSt,
      prueba_litro: e.target.value,
    });
  };
  const handleNo_Motor = (e) => {
    setDataSt({
      ...dataSt,
      No_Motor: e.target.value,
    });
  };
  const handleNo_chasi = (e) => {
    setDataSt({
      ...dataSt,
      No_chasi: e.target.value,
    });
  };
  const handleTarjetas_combustible = (e) => {
    setDataSt({
      ...dataSt,
      Tarjetas_combustible: e.target.value,
    });
  };
  const handleNo_AFT = (e) => {
    setDataSt({
      ...dataSt,
      No_AFT: e.target.value,
    });
  };
  const handleClose = () => {
    setDataSt(iniData);
    setDataValid(iniDataValid);
    setLoading(false);
    onClose();
  };


  // React.useEffect(() => {
  //   fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/vehiculo/`)
  //     .then((response) => {
  //       response.json().then(
  //         (response) => true
  //       );
  //     })
  //     .catch((err) => console.log(err));
  //   if (open || create) {
  //     return undefined;
  //   }
  // }, [open]);

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
          sx={{ mb: "1vh", marginTop: 2 }}
        >
          <TextField
            variant="standard"
            label="Matrícula"
            type="string"
            disabled={loading}
            value={dataSt.Matricula}
            onChange={handleMatricula}
            sx={{ minWidth: "60px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Tipo"
            type="text"
            disabled={loading}
            value={dataSt.Tipo}
            onChange={handleTipo}
            sx={{ minWidth: "60px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Marca"
            type="text"
            disabled={loading}
            value={dataSt.Marca}
            onChange={handleMarca}
            InputLabelProps={{
              shrink: true,
            }}
           
          />
          <TextField
            variant="standard"
            label="Modelo"
            type="text"
            disabled={loading}
            value={dataSt.Modelo}
            onChange={handleModelo}
            sx={{ minWidth: "160px", width: "230px" }}
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
          sx={{ mb: "1vh", marginTop: 2 }}
        >
          <TextField
            variant="standard"
            label="Color"
            type="text"
            disabled={loading}
            value={dataSt.Color}
            onChange={handleColor}
            sx={{ minWidth: "100px", width: "150px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Indice de Consumo Real"
            type="text"
            disabled={loading}
            value={dataSt.Indice_Real}
            onChange={handleIndice_Real}
            sx={{ minWidth: "160px", width: "275px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Actualización Norma de Consumo"
            type="date"
            disabled={loading}
            value={dataSt.Fecha_normaConsumo}
            onChange={handleFecha_normaConsumo}
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
          sx={{ mb: "1vh", marginTop: 2 }}
        >
          <TextField
            variant="standard"
            label="Vencimiento FICAV"
            type="Date"
            disabled={loading}
            value={dataSt.Venc_FICAV}
            onChange={handleVenc_FICAV}
            sx={{ minWidth: "100px", width: "200px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Vencimiento Lic. Operativa"
            format="YYYY/MM/DD"
            type="Date"
            disabled={loading}
            value={dataSt.Venc_LicOperativa}
            onChange={handleVenc_LicOperativa}
            sx={{ minWidth: "160px", width: "250px" }}
            InputLabelProps={{
              shrink: true,
            }}
            />
          <FormControlLabel 
            control={
              <Checkbox sx={{fontSize: "12px"}}
                checked={checked}
                value={dataSt.Estado_tecn}
                onChange={handleEstado_tecn}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Estado Técnico"
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="initial"
          alignContent="center"
          sx={{ mb: "1vh", marginTop: 2 }}
        >
          {/* 700 */}
          <FormControl
            variant="standard"
            sx={{ minWidth: "100px", width: "200px" }}
            disabled={loading}
          >
            <InputLabel id="cliente">Seleccionar Combustible</InputLabel>
            <Select
              labelId="cliente"
              id="cliente"
              disabled={loading}
              defaultValue={dataSt.Comb_utiliza}
              value={dataSt.Comb_utiliza}
              onChange={handleComb_utiliza}
              label="cliente"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {combustibles.map((ele) => {
                return (
                  <MenuItem key={ele.id} value={ele.Tipo}>
                    {ele.Tipo}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="Capacidad del Tanque"
            type="text"
            disabled={loading}
            value={dataSt.Cap_Tanque}
            onChange={handleCap_Tanque}
            sx={{ minWidth: "160px", width: "240px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="Indice de Consumo según Fabricante"
            type="boolean"
            disabled={loading}
            value={dataSt.coms_segunFabr}
            onChange={handlecoms_segunFabr}
            sx={{ minWidth: "160px", width: "280px" }}
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
          sx={{ mb: "1vh", marginTop: 2 }}
        >
          {/* 700 */}
          <TextField
            variant="standard"
            label="Prueba del Litro"
            type="date"
            disabled={loading}
            value={dataSt.prueba_litro}
            onChange={handleprueba_litro}
            sx={{ minWidth: "100px", width: "180px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="No Motor"
            type="text"
            disabled={loading}
            value={dataSt.No_Motor}
            onChange={handleNo_Motor}
            sx={{ minWidth: "160px", width: "240px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="No Chasi"
            type="boolean"
            disabled={loading}
            value={dataSt.No_chasi}
            onChange={handleNo_chasi}
            sx={{ minWidth: "160px", width: "280px" }}
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
          sx={{ mb: "1vh", marginTop: 2 }}
        >
          {/* 700 */}
          <TextField
            variant="standard"
            label="Tarjeta de Combustible"
            type="text"
            disabled={loading}
            value={dataSt.Tarjetas_combustible}
            onChange={handleTarjetas_combustible}
            sx={{ minWidth: "100px", width: "180px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="standard"
            label="No de AFT en Contabildad"
            type="text"
            disabled={loading}
            value={dataSt.No_AFT}
            onChange={handleNo_AFT}
            sx={{ minWidth: "160px", width: "240px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 0, background: "#0E7352" }}
          disabled={loading}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ borderRadius: 0, background: "#0E7352", color: "#fff" }}
          loading={loading}
          onClick={handleSubmit}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}