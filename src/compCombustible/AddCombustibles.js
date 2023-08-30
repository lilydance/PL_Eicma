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
  Tipo: "",
  Precio: "",
  Subelemento: "",
};

const iniDataValid = {
  Tipo: { error: false, errorText: "" },
  Precio: { error: false, errorText: "" },
  Subelemento: { error: false, errorText: "" },
};

export default function FormBEntradaSalida({
  open,
  onClose,
  onContinue,
  create,
  editData,
//   onChange,
  ...props
}) {
  const [dataSt, setDataSt] = React.useState(iniData);
  const [dataValid, setDataValid] = React.useState(iniDataValid);
  const [loading, setLoading] = React.useState(false);
  //const [Combustible, setCombustible] = React.useState();

  const handleClose = () => {
    setDataSt(iniData);
    setDataValid(iniDataValid);
    setLoading(false);
    onClose();
  };

  const handleTipo = (e) => {
    setDataSt({
      ...editData,
      Tipo: e.target.value,
    });
  };

  const handlePrecio = (e) => {
    setDataSt({
      ...dataSt,
      Precio: e.target.value,
    });
  };

  const handleSubelemento = (e) => {
    setDataSt({
      ...dataSt,
      Subelemento: e.target.value,
    });
  };
// ---------------------- agregar datos a la API --------------------------------------
  const handleSubmit = (e) => {
    const newData = {
    name: dataSt.Tipo,
    precio: dataSt.Precio,
    subelemento_gastos: dataSt.Subelemento,
    };
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tip-comb/`,
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
  // -------------------------------------------------------------------------------

  React.useEffect(() => {
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tip-comb/`)
      .then((response) => {
        response.json().then(
          (response) => true
        );
      })
      .catch((err) => console.log(err));
    if (open || create) {
      return undefined;
    }
  }, [open]);

  
   return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
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
            label="Tipo de Combustible"
            type="string"
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
            label="Precio"
            type="text"
            disabled={loading}
            value={dataSt.Precio}
            onChange={handlePrecio}
            sx={{ minWidth: "60px", width: "100px" }}
            InputLabelProps={{
                shrink: true,
              }}
          />
          <TextField
            variant="standard"
            label="Sub-elemtos de gastos"
            type="text"
            disabled={loading}
            value={dataSt.Subelemento}
            onChange={handleSubelemento}
            sx={{ minWidth: "160px", width: "250px" }}
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
        ></Stack>
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
  ) 
}