import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Skeleton,
  Tooltip,
  Alert,
  Badge,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@mui/material";
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import NoteAddSharpIcon from "@mui/icons-material/NoteAddSharp";
import EngineeringSharpIcon from "@mui/icons-material/EngineeringSharp";
import SolarPowerSharpIcon from "@mui/icons-material/SolarPowerSharp";
import AttachEmailSharpIcon from "@mui/icons-material/AttachEmailSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import PrintSharpIcon from "@mui/icons-material/PrintSharp";
import FormEditTarjetas from "./FormTarjetas";
import AddTarjetas from "./AddTarjetas";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import useMyHook from "../Hooks";

const columns = [
  {
    field: "No_Tarjetas",
    headerName: "No de tarjetas",
    type: "number",
    minWidth: 150,
    align: "left",
    editable: true,
  },
  {
    field: "C_Control",
    headerName: "Centro de Control",
    minWidth: 150,
    type: "string",
    align: "left",
    editable: true,
  },
  {
    field: "Fecha",
    headerName: "Fecha",
    minWidth: 100,
    align: "left",
    type: "date",
    editable: true,
  },
  {
    field: "Chapa",
    headerName: "Chapa",
    type: "string",
    minWidth: 100,
    editable: true,
    align: "left",
  },
  {
    field: "Receptor",
    headerName: "Receptor",
    type: "string",
    editable: true,
    minWidth: 250,
    align: "left",
  },
  {
    field: "Ci",
    headerName: "Ci",
    type: "string",
    minWidth: 120,
    editable: true,
    align: "left",
  },
  {
    field: "Lit_inicial",
    headerName: "Lit. Inicial",
    type: "number",
    minWidth: 100,
    editable: true,
    align: "left",
  },
  {
    field: "Combos",
    headerName: "Combos",
    type: "string",
    minWidth: 100,
    editable: true,
    align: "left",
  },
  {
    field: "Cliente",
    headerName: "Cliente/Pr",
    type: "number",
    minWidth: 100,
    editable: true,
    align: "left",
  },
  {
    field: "Activa",
    headerName: "Activa",
    type: "boolean",
    minWidth: 120,
    editable: true,
    align: "center",
  },
  {
    field: "Estado",
    headerName: "Estado",
    type: "string",
    minWidth: 100,
    editable: true,
    align: "left",
  },
];

var myEstado = {
  1: "Asigando",
  2: "Existencia", 
  3: "Vencida",
  4: "Cancelada",
  5: "Pérdida o Deteriroro",
};

export default function DataGridDemo() {
  //llamar datos de la API
  const [tarjeta, setTarjeta] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const getTarjeta = React.useCallback(() => {
    setLoaded(false);
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tarjetas/`)
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data.map((item, index) => ({
            id: item.numero + index,
            No_Tarjetas: item.numero,
            C_Control: item.c_control,
            Fecha: item.fecha,
            Chapa: item.t_tarjeta_asociada_a,
            Receptor: item.receptor,
            Ci: item.ci,
            Lit_inicial: item.lit_inicio,
            Combos: item.combos,
            Cliente: item.cliente_pr,
            Activa: item.activa,
            Estado: item.estado,
            })
            );
            filteredData = filteredData.map((item, index) => {
              
                item.Estado= myEstado[item.Estado];
                return item;

               }
            );
            setTarjeta(filteredData);
            console.log(filteredData);
        })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setTarjeta, setLoaded]);

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
            sx={{color: '#0E7352'}}
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
            sx={{color: '#0E7352'}}
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
            sx={{color: '#0E7352'}}
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
            sx={{color: '#0E7352'}}
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
            sx={{color: '#0E7352'}}
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

  useEffect(()=>{
    getTarjeta()
  },[])

 

  return (
    <React.Fragment>
     
          <Box
            className="Box"
            sx={{ height: 600, width: "100%", margin: 3, marginTop: 5 }}
            >
              <Box sx={{ margin: 3, marginTop: 5}}>
              <center>
                <Typography variant="h7">
                  <strong>Entrada de Tarjetas</strong>
                </Typography>
              </center>
              <center>
                <Typography variant="h7">
                  <strong>UEB EICMA VILLA CLARA</strong>
                </Typography>
              </center>
            </Box>
            <DataGrid
              rows={tarjeta}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionTab(newSelectionModel);
              }}
              selectionModel={selectionTab}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
       

        {selectionTab.length === 1 ?
        <FormEditTarjetas
          open={openFormData}
          onClose={handleCloseFormData}
          editData={
            tarjeta.find((elem) => elem.id === selectionTab[0])
          
          }
        />
        : 
        <AddTarjetas
          open={openFormData}
          onClose={handleCloseFormData}
          create={formCreate}
        />
        }
    </React.Fragment>
  );
}
