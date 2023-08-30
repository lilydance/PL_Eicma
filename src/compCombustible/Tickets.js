import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  IconButton,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Tooltip,
  Select,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import FormEditTickets from "./FormTickets";
import AddTickets from "./AddTickets";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMyHook from "../Hooks";

const columns = [
  {
    field: "Fecha",
    headerName: "Fecha",
    type: "Date",
    editable: true,
    minWidth: 150,
    align: "left",
  },
  {
    field: "Hora",
    headerName: "Hora",
    minWidth: 120,
    editable: true,
    type: "datetime-local",
    align: "left",
  },
  {
    field: "Lugar",
    headerName: "Lugar",
    minWidth: 110,
    editable: true,
    type: "string",
    align: "left",
  },
  {
    field: "No_Chips",
    headerName: "No Chips",
    type: "number",
    minWidth: 150,
    editable: true,
    align: "left",
  },
  {
    field: "Entradas_Cant",
    headerName: "Entradas: Cantidad",
    editable: true,
    minWidth: 200,
    type: "float",
    align: "left",
  },
  {
    field: "Entradas_Importe",
    headerName: "Entradas: Importe",
    type: "float",
    minWidth: 140,
    editable: true,
    align: "left",
  },
  {
    field: "Salidas_Cant",
    headerName: "Salidas: Cantidad",
    type: "float",
    minWidth: 150,
    editable: true,
    align: "left",
  },
  {
    field: "Salidas_Importe",
    headerName: "Salidas: Importe",
    type: "float",
    minWidth: 120,
    editable: true,
    align: "left",
  },
  {
    field: "Saldo_Cant",
    headerName: "Saldo: Cantidad",
    type: "float",
    minWidth: 120,
    editable: true,
    align: "left",
  },
  {
    field: "Saldo_Importe",
    headerName: "Saldo: Importe",
    type: "float",
    minWidth: 120,
    editable: true,
    align: "left",
  },
];

const iniData = [
  {
    Chapa: "",
    id: "",
    fecha: Date.parse("yy-mm"),
    matricula: "",
    responsable: "",
    noTarjeta: "",
    vencimiento: "",
    combustible: "",
    precio: "",
    saldoMesAnterior: "",
  },
];


export default function DataGridDemo() {
  const [dataSt, setDataSt] = React.useState(iniData);
  const [chapa, setChapa] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const [tarjetas, setTarjetas] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [value, setValue] = React.useState(dayjs());
  const [loading, setLoading] = React.useState(true);
  const [refreshTable, setRefreshTable] = React.useState(0);
  const [openFormData, setOpenFormData] = React.useState(false);
  const [formCreate, setFormCreate] = React.useState(true);
  const [confirmDial, setConfirmDial] = React.useState({
    open: false,
    titleCD: "Confirmar Eliminación",
    contentCD:
      "¿Está seguro que desea eliminar la selección de registros realizada?",
    msgSuccessCD: "Eliminación correcta.",
    msgErrorCD: "Error en la solicitud de eliminación. Code: f-1208.",
  });
  const [rowsCan, setRowsCan] = React.useState([]);
  const [selectionTab, setSelectionTab] = React.useState([]);
  const [openViewData, setOpenViewData] = React.useState(false);
  const handleCloseFormData = () => {
    setOpenFormData(false);
    handleRefreshT();
  };

// --------------------- tomar las chapas existentes ----------------------
  const getChapa = React.useCallback(() => {
    setLoaded(false);
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/vehiculo/`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.map((item, index) => ({
          id: item.matricula,
          Chapa: item.matricula,
        }));

        setChapa(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setChapa, setLoaded]);
// --------------------------------------------------------------------------

  const getTickets = React.useCallback(() => {
    setLoaded(false);
    fetch(
      `http://${process.env.REACT_APP_REST_API_URL}/transporte/tickets/${
        dataSt.Chapa
      }/${value.format("YYYY/M")}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filteredData = data.map((item, index) => ({
          id: index,
          Fecha: item.fecha,
          Hora: "15:38",
          Lugar: item.lugar,
          No_Chips: item.nro_chip,
          Entradas_Cant: item.cantidad_entrada,
          Entradas_Importe: item.importe_entrada,
          Salidas_Cant: item.cantidad_salida,
          Salidas_Importe: item.importe_salida,
          Saldo_Cant: item.cantidad_saldo,
          Saldo_Importe: item.importe_saldo,
        }));

        setTickets(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [ setLoaded, dataSt.Chapa, value, setTickets]);

  const getTarjetas = React.useCallback(() => {
    setLoaded(false);
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tarjetas/`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.map((item, index) => ({
          matricula: item.t_tarjeta_asociada_a,
          responsable: item.receptor,
          noTarjeta: item.numero,
          vencimiento: item.fecha,
          combustible: item.combos,
         
        }));

        setTarjetas(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setTarjetas, setLoaded]);

  // const {loading} = useMyHook();
  // const {selectionTab} = useMyHook();
  // const {setSelectionTab} = useMyHook();
  // const {refreshTable}= useMyHook();
  // const {openFormData}= useMyHook();
  // const {formCreate}= useMyHook();
  // const {confirmDial}= useMyHook();
  // const {rowsCan}= useMyHook();
  // const {openViewData}= useMyHook();
  // const {handleCloseFormData}= useMyHook();
  // const {handleViewData}= useMyHook();
  // const {handleCloseViewData}= useMyHook();
  // const {handleOpenConfirmDial}= useMyHook();
  // const {handleCloseConfirmDial}= useMyHook();
  // const {handleCreateData}= useMyHook();
  // const {handleUpdateData}= useMyHook();
  // const {handleRefreshT}= useMyHook();
  
  const handleViewData = () => {
    if (selectionTab.length === 1) {
      setOpenViewData(true);
    }
  };
  const handleCloseViewData = () => {
    setOpenViewData(false);
  };
  const handleOpenConfirmDial = () => {
    setConfirmDial({ ...confirmDial, open: true });
  };

  const handleCloseConfirmDial = () => {
    setConfirmDial({ ...confirmDial, open: false });
    handleRefreshT();
  };

  const handleCreateData = () => {
    if (!formCreate) {
      setFormCreate(true);
    }
    setOpenFormData(true);
   
  };

  const handleUpdateData = () => {
    if (selectionTab.length === 1) {
      if (formCreate) {
        setFormCreate(false);
      }
      setOpenFormData(true);
    }
   
  };
  const handleRefreshT = () => {
    setRefreshTable(refreshTable === 0 ? 1 : 0);
    setSelectionTab([]);
  };

  const handleChapa = (e) => {
    setDataSt({
      ...dataSt,
      Chapa: e.target.value,
    });
  };
  const handleFecha = (e) => {
    setDataSt({
      ...dataSt,
      fecha: e.target.value,
    });
  };

  const MenuToolBar = () => {
    const elementOne =
      selectionTab.length !== 1
        ? null
        : rowsCan.find((ele) => ele.id === selectionTab[0]);

    return (
      <div>
        <Stack
          direction="row"
          justifyContent="flex-end"
          divider={<Divider orientation="vertical" />}
        >
          <IconButton
            variant="text"
            aria-label="refresh"
            sx={{ color: "#0E7352" }}
            onClick={handleRefreshT}
          >
            <Tooltip title="Actualizar" placement="top">
              <RefreshSharpIcon />
            </Tooltip>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            variant="text"
            aria-label="crear"
            sx={{ color: "#0E7352" }}
            onClick={handleCreateData}
            disabled={selectionTab.length !== 0}
          >
            <Tooltip title="Nuevo" placement="top">
              <AddSharpIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            variant="text"
            aria-label="editar"
            sx={{ color: "#0E7352" }}
            onClick={handleUpdateData}
            disabled={selectionTab.length !== 1}
          >
            <Tooltip title="Editar" placement="top">
              <EditSharpIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            variant="text"
            aria-label="delete"
            sx={{ color: "#0E7352" }}
            onClick={handleOpenConfirmDial}
            disabled={selectionTab.length < 1}
          >
            <Tooltip title="Eliminar" placement="top">
              <DeleteSharpIcon />
            </Tooltip>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            variant="text"
            aria-label="view"
            sx={{ color: "#0E7352" }}
            onClick={handleViewData}
            disabled={selectionTab.length !== 1}
          >
            <Tooltip title="Ver" placement="top">
              <VisibilitySharpIcon />
            </Tooltip>
          </IconButton>

          <Divider orientation="vertical" flexItem />
        </Stack>
      </div>
    );
  };
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton sx={{ color: "#0E7352" }} />
        <GridToolbarExport
          printOptions={{ disableToolbarButton: true }}
          csvOptions={{ allColumns: true }}
          sx={{ color: "#0E7352" }}
        />
        <MenuToolBar />
      </GridToolbarContainer>
    );
  };

  useEffect(() => {
    getChapa();
  }, []);

  useEffect(() => {
    getTickets();
  }, [value, dataSt]);

  useEffect(() => {
    getTarjetas();
  }, []);

 

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          className="Box"
          sx={{
            height: 700,
            width: "100%",
            sm: "flex",
            margin: 3,
            marginTop: 10,
          }}
        >
          <center>
            <Typography variant="h7">
              <strong>UEB EICMA VILLA CLARA.</strong>
            </Typography>
          </center>
          <Box
            sx={{
              height: 170,
              width: "50%",
              display: "inline-block",
              marginTop: 0,
            }}
          >
            <FormControl
              // variant="standard"
              sx={{ minWidth: "100px", width: "200px", margin: 3}}
              // disabled={loading}
            >
              <InputLabel id="cliente">Matrícula</InputLabel>
              <Select
                labelId="chapa"
                id="chapa"
                defaultValue=""
                value={dataSt.Chapa}
                onChange={handleChapa}
                label="chapa"
              >
                {chapa.map((ele) => {
                  return (
                    <MenuItem key={ele.id} value={ele.id}>
                      {ele.Chapa}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

                <br></br>
            <DatePicker
              // styled={marginTop= 3}
              views={["year", "month"]}
              label="Año y Mes"
              value={value}
              onChange={(value, d) => {
                console.log(value, d);
                setValue(value);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            ></DatePicker>

            
          </Box>
          <Box
            sx={{
              height: 170,
              width: "50%",
              display: "inline-block",
              marginTop: 3,
            }}
          >
              
                <Typography variant="h7">Responsable:</Typography>
                <br></br>
                <Typography variant="h7">Número de la Tarjeta:</Typography>
                <br></br>
                <Typography variant="h7">Fecha de vencimiento:</Typography>
                <br></br>
                <Typography variant="h7">Tipo de Combustible:</Typography>
                <br></br>
                <Typography variant="h7">Precio:</Typography>
                <br></br>
                <strong>
                  <Typography variant="h7">Saldo mes anterior:</Typography>
                </strong>
                <br></br>
  
          </Box>

          <DataGrid
            rows={tickets}
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionTab(newSelectionModel);
            }}
            selectionModel={selectionTab}
            checkboxSelection
          />
        </Box>
        </LocalizationProvider>

        {selectionTab.length === 1 ?
        <FormEditTickets
          open={openFormData}
          onClose={handleCloseFormData}
          editData={
            tickets.find((elem) => elem.id === selectionTab[0])
          
          }
        />
        : 
        <AddTickets
          open={openFormData}
          onClose={handleCloseFormData}
          create={formCreate}
          matricula={dataSt.Chapa}
          fecha={value}
        />
        }
      
    </React.Fragment>
  );
}
