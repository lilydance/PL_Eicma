import * as React from 'react';
import { Box, Paper, Typography, Stack, Divider, Menu, MenuItem, IconButton, Skeleton, Tooltip, Alert, Badge, ListItemIcon, ListItemText, makeStyles } from "@mui/material";
import { DataGrid, esES, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import NoteAddSharpIcon from '@mui/icons-material/NoteAddSharp';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import SolarPowerSharpIcon from '@mui/icons-material/SolarPowerSharp';
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import PrintSharpIcon from '@mui/icons-material/PrintSharp';
import FormNewPlan from '../compCombustible/FormCombustible';
import useMyHook from "../Hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect } from "react";

const columns = [
  { 
    field: 'No', 
    headerName: 'No',
    type: 'number', 
    minWidth: 60,
    editData: true,
    align: "left",
  },
  { 
    field: 'Mes', 
    headerName: 'Mes',
    type: 'number', 
    minWidth: 60,
    editData: true,
    align: "left",
  },
  {
    field: 'PROV', 
    headerName: 'PROV.',
    type: 'string', 
    minWidth: 60,
    editData: true,
    align: "left",
  },
  {
    field: 'OACE',
    headerName: 'OACE',
    minWidth: 110,
    editable: true,
    type: 'string',
    align: "left",
  },
  {
    field: 'OSDE',
    headerName: 'OSDE',
    type: 'string',
    minWidth: 150,
    editable: true,
    aling: "left"
  },
  {
    field: 'Entidad',
    headerName: 'Entidad',
    type: 'string',
    minWidth: 150,
    editable: true,
    aling: "left"
  },
  {
    field: 'Descripcion',
    headerName: 'Descripción del Equipo',
    type: 'string',
    minWidth: 200,
    editable: true,
    aling: "left",
  },
  {
    field: 'Matricula',
    headerName: 'Matrícula',
    type: 'string',
    minWidth: 150,
    editable: true,
    aling: "left",
  },
  {
    field: 'Servicio',
    headerName: 'Servicio',
    type: 'string',
    minWidth: 150,
    editable: true,
    aling: "left",
  },
  {
    field: 'Combustible',
    headerName: 'Combustible sin Respaldo (lts)',
    type: 'string',
    minWidth: 220,
    editable: true,
    aling: "left",
  },
  {
    field: 'Medidas',
    headerName: 'Medidas Aplicadas',
    type: 'string',
    minWidth: 150,
    editable: true,
    aling: "left",
  },
];
const iniData = [
  {
    id: "",
    fecha: Date.parse("yyyy"),
  },
];

// const rows = [];

export default function DataGridDemo() {
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
  const [loading, setLoading] = React.useState(true);
  const [loaded, setLoaded] = React.useState(true);
  const [equiposIne, setEquiposIne] = React.useState([]);
  const [value, setValue] = React.useState(dayjs());
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

  const getEquiposIne = React.useCallback(() => {
    setLoaded(false);
    fetch(
      `http://${process.env.REACT_APP_REST_API_URL}/transporte/equipo-ineficientes/${value.format("YYYY")}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filteredData = data.map((item, index) => ({
          id: index,
          No: item.id,
          Mes: item.mes,
          PROV: "VC",
          OACE: "",
          OSDE: "GELMA",
          Entidad: "UEB EICMA VC",
          Descripcion: "",
          Matricula: item.matricula_ineficiente,
          Servicio: item.servicio,
          Combustible: item.comb_sin_respaldo,
          Medidas: item.medidas,
        }));

        setEquiposIne(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setLoaded, value, setEquiposIne]);

  useEffect(() => {
    getEquiposIne();
  }, [value]);

    const MenuToolBar = () => {
        const elementOne = selectionTab.length !== 1 ? null : rowsCan.find(ele => ele.id === selectionTab[0]);

        return (
            <div>
                <Stack
                    direction='row'
                    justifyContent='flex-end'
                    divider={<Divider orientation='vertical' />}
                >
                    <Divider orientation='vertical' flexItem />
                    <IconButton
                        variant="text"
                        aria-label='view'
                        sx={{ color: "#0E7352" }}
                        onClick={handleViewData}
                        disabled={selectionTab.length !== 1}
                    >
                        <Tooltip title='Ver' placement="top"><VisibilitySharpIcon /></Tooltip></IconButton>
                  
                    <Divider orientation='vertical' flexItem /> 
                </Stack>
            </div>
        );
    };
    const CustomToolbar = () => {
        return (
          <GridToolbarContainer>
            <GridToolbarFilterButton sx={{color: '#0E7352'}}/>
            <GridToolbarExport
              printOptions={{ disableToolbarButton: true }}
              csvOptions={{ allColumns: true }}
              sx={{color: '#0E7352'}}
            />
            <MenuToolBar />
          </GridToolbarContainer>
        );
      };
   


  return (
    <React.Fragment>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box className='Box' sx={{ height: 600, width: '100%', sm:'flex', margin: 3, marginTop: 10}}>
    <Box sx={{ margin: 3, marginTop: 5 }}>
          <center>
            <Typography variant="h7">
              <strong>Anexo 2: Relaciones de Equipos Ineficientes.</strong>
            </Typography>
          </center>
          <br></br>
          <DatePicker
              // styled={marginTop= 3}
              views={["year"]}
              label="Año"
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
      <DataGrid
        rows={equiposIne}
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
    </React.Fragment>
  );
}