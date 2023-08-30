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
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useRef } from "react";
import AddEquipo from "./AddEquipo";
import FormEditEquipo from "./FormEditEquipo";

const columns = [
  { 
    field: 'No', 
    headerName: 'No',
    type: 'number', 
    width: 50,
  },
  {
    field: 'Matricula',
    headerName: 'Matrícula',
    width: 120,
    type: 'string',
  },
  {
    field: 'Tipo',
    headerName: 'Tipo de Equipo',
    width: 110,
    type: 'string',
  },
  {
    field: 'Indice',
    headerName: 'Índice de consumo según fabr.',
    type: 'number',
    width: 230,
    align: "left",
  },
  {
    field: 'Nivel',
    headerName: 'Nivel de actividad real',
    type: 'number',
    width: 170,
  },
  {
    field: 'Combustible',
    headerName: 'Combustible serviciado mes',
    type: 'number',
    width: 200,
  },
  {
    field: 'Combustible_inicio',
    headerName: 'Comb. inicio de mes en tanque',
    type: 'number',
    width: 220,
  },
  {
    field: 'Combustible_fin',
    headerName: 'Comb. fin de mes en tanque',
    type: 'number',
    width: 210,
  },
  {
    field: 'Combustible_real',
    headerName: 'Comb. real consumido',
    type: 'number',
    width: 180,
  },
  {
    field: 'Combustible_debio_cons',
    headerName: 'Comb. que debió consumir',
    type: 'number',
    width: 210,
  },
  {
    field: 'Consumo_real',
    headerName: 'Índice consumo real',
    type: 'number',
    width: 160,
  },
  {
    field: 'Consumo_normado',
    headerName: 'Índice consumo normado',
    type: 'number',
    width: 180,
  },
  {
    field: 'Diferencia',
    headerName: 'Diferencia en consumo',
    type: 'number',
    width: 180,
  },
  {
    field: 'Desviacion',
    headerName: 'Desviación del índice normado 5%',
    type: 'number',
    width: 250,
  },
  {
    field: 'Desviacion_absoluta',
    headerName: 'Desviación Abs.',
    type: 'number',
    width: 120,
  },
  {
    field: 'Combustible_tipo',
    headerName: 'Tipo de Combustible',
    type: 'number',
    width: 150,
  },
];

const iniData = [
    {
      fecha: Date.parse("yyyy"),
    },
  ];
const rows = [];

export default function DataGridDemo() {
    const [dataSt, setDataSt] = React.useState(iniData);
    const [loading, setLoading] = React.useState(true);
    const [refreshTable, setRefreshTable] = React.useState(0);
    const [openFormData, setOpenFormData] = React.useState(false);
    const [value, setValue] = React.useState(dayjs());
    const [formCreate, setFormCreate] = React.useState(true);
    const [confirmDial, setConfirmDial] = React.useState({
        open: false,
        titleCD: 'Confirmar Eliminación',
        contentCD: '¿Está seguro que desea eliminar la selección de registros realizada?',
        msgSuccessCD: 'Eliminación correcta.',
        msgErrorCD: 'Error en la solicitud de eliminación. Code: f-1208.'
    });

    const [rowsCan, setRowsCan] = React.useState([]);
    const [selectionTab, setSelectionTab] = React.useState([]);
    const [openViewData, setOpenViewData] = React.useState(false);
    const [equipo, setEquipo] = React.useState([]);
    const [loaded, setLoaded] = React.useState(true);

    const getEquipo = React.useCallback(() => {
        setLoaded(false);
        fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/equipo/${value.format("YYYY/M")}`)
          .then((res) => res.json())
          .then((data) => {
            const filteredData = data.map((item, index) => ({
              id: item.id,
              No: index + 1,
              Matricula: item.matricula_ee,
              Tipo: "",
              Indice: item.indice_consumo_fabricante,
              Nivel: item.actividad_real,
              Combustible: item.comb_serviciado,
              Combustible_inicio: item.comb_inicio_mes,
              Combustible_fin: item.comb_fin_mes,
              Combustible_real: item.comb_consumido,
              Combustible_debio_cons: item.comb_debio_consumir,
              Consumo_real: item.indice_consumo_real,
              Consumo_normado: item.indice_comsumo_normado,
              Diferencia: item.dif_consumo,
              Desviacion: item.desviacion_indice_normado,
              Desviacion_absoluta: item.desviacion_absoluta,
              Combustible_tipo: item.combustible,
            }));
    
            setEquipo(filteredData);
            
          })
          .catch((err) => console.log(err))
          .finally(() => setLoaded(true));
      }, [setEquipo, setLoaded]);

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

    const MenuToolBar = () => {
        const elementOne = selectionTab.length !== 1 ? null : rowsCan.find(ele => ele.id === selectionTab[0]);

        return (
            <div>
                <Stack
                    direction='row'
                    justifyContent='flex-end'
                    divider={<Divider orientation='vertical' />}
                >
                    <IconButton
                        variant="text"
                        aria-label='refresh'
                        sx={{ color: "#0E7352" }}
                        onClick={handleRefreshT}
                    >
                        <Tooltip title='Actualizar' placement="top"><RefreshSharpIcon /></Tooltip></IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton
                        variant="text"
                        aria-label='crear'
                        sx={{ color: "#0E7352" }}
                        onClick={handleCreateData}
                        disabled={selectionTab.length !== 0}
                    >
                        <Tooltip title='Nuevo' placement="top"><AddSharpIcon /></Tooltip></IconButton>
                    <IconButton
                        variant="text"
                        aria-label='editar'
                        sx={{ color: "#0E7352" }}
                        onClick={handleUpdateData}
                        disabled={selectionTab.length !== 1}
                    >
                        <Tooltip title='Editar' placement="top"><EditSharpIcon /></Tooltip></IconButton>
                    <IconButton
                        variant="text"
                        aria-label='delete'
                        sx={{ color: "#0E7352" }}
                        onClick={handleOpenConfirmDial}
                        disabled={selectionTab.length < 1}
                    >
                        <Tooltip title='Eliminar' placement="top"><DeleteSharpIcon /></Tooltip></IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton
                        variant="text"
                        aria-label='view'
                        sx={{ color: "#0E7352" }}
                        onClick={handleViewData}
                        disabled={selectionTab.length !== 1}
                    >
                        <Tooltip title='Ver' placement="top"><VisibilitySharpIcon /></Tooltip></IconButton>
                   
            
                    
                       
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
        getEquipo();
      }, [value, dataSt]);

  return (
    <React.Fragment>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
          className="Box"
          sx={{
            height: 600,
            width: "100%",
            sm: "flex",
            margin: 3,
            marginTop: 10,
          }}
        >
          <center>
            <Typography variant="h7">
              <strong>Equipo-Equipo</strong>
            </Typography>
          </center>
          <Box
            sx={{
              height: 130,
              width: "50%",
              display: "inline-block",
              marginTop: 0,
            }}
          >  <br></br>
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
      <DataGrid
        rows={equipo}
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
    {selectionTab.length === 1 ?
        <FormEditEquipo
          open={openFormData}
          onClose={handleCloseFormData}
          editData={
            equipo.find((elem) => elem.id === selectionTab[0])
          
          }
        />
        : 
        <AddEquipo
          open={openFormData}
          onClose={handleCloseFormData}
          create={formCreate}
          fecha = {value}
        />
        }
    </LocalizationProvider>
    </React.Fragment>
  );
}