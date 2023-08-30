import * as React from "react";
import {
  Box,
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
import FormEditVehiculo from "./FormVehiculo";
import AddVehiculo from "./AddVehiculo";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import useMyHook from "../Hooks";

const columns = [
  {
    field: "Matricula",
    headerName: "Matrícula",
    type: "string",
    minWidth: 80,
    align: "left",
    editable: true,
  },
  {
    field: "chofer",
    headerName: "Chofer",
    type: "string",
    minWidth: 150,
    align: "left",
    editable: true,
  },
  {
    field: "Tipo",
    headerName: "Tipo",
    type: "string",
    minWidth: 70,
    align: "left",
    editable: true,
  },
  {
    field: "Marca",
    headerName: "Marca",
    minWidth: 50,
    type: "string",
    align: "left",
    editable: true,
  },
  {
    field: "Modelo",
    headerName: "Modelo",
    minWidth: 50,
    type: "string",
    align: "left",
    editable: true,
  },
  {
    field: "Color",
    headerName: "Color",
    type: "string",
    minWidth: 50,
    align: "left",
    editable: true,
  },
  {
    field: "Indice_Real",
    headerName: "Indice de consumo Real",
    type: "float",
    minWidth: 170,
    align: "left",
    editable: true,
  },
  {
    field: "Fecha_normaConsumo",
    headerName: "Actualización Norma de Consumo",
    type: "date",
    minWidth: 250,
    editable: true,
    align: "left",
  },
  {
    field: "Venc_FICAV",
    headerName: "Vencimiento FICAV",
    type: "date",
    minWidth: 150,
    editable: true,
    align: "left",
  },
  {
    field: "Venc_LicOperativa",
    headerName: "Vencimiento Lic. Operativa",
    type: "date",
    minWidth: 200,
    editable: true,
    align: "left",
  },
  {
    field: "Estado_tecn",
    headerName: "Estado Técnico",
    type: "boolean",
    minWidth: 120,
    editable: true,
    align: "center",
  },
  {
    field: "Comb_utiliza",
    headerName: "Tipo de Combustible",
    type: "string",
    minWidth: 150,
    align: "left",
    editable: true,
  },
  {
    field: "Cap_Tanque",
    headerName: "Capacidad del Tanque",
    type: "float",
    minWidth: 160,
    align: "left",
    editable: true,
  },
  {
    field: "coms_segunFabr",
    headerName: "Indice de comsumo según fabricante",
    type: "float",
    minWidth: 250,
    editable: true,
    align: "center",
  },
  {
    field: "prueba_litro",
    headerName: "Prueba del litro",
    type: "date",
    minWidth: 120,
    editable: true,
    align: "left",
  },
  {
    field: "No_Motor",
    headerName: "No Motor",
    type: "string",
    minWidth: 100,
    editable: true,
    align: "left",
  },
  {
    field: "No_chasi",
    headerName: "No chasi",
    type: "string",
    minWidth: 80,
    editable: true,
    align: "left",
  },
  {
    field: "Tarjetas_combustible",
    headerName: "Tarjetas Mágneticas",
    type: "string",
    minWidth: 200,
    align: "left",
    editable: true,
  },
  {
    field: "No_AFT",
    headerName: "No AFT en contabilidad",
    type: "number",
    minWidth: 180,
    align: "left",
    editable: true,
  },
];


export default function DataGridDemo() {
  const [vehiculo, setVehiculo] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  
  const getVehiculo = React.useCallback(()=>{
    setLoaded(false)
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/vehiculo/`)
      .then((res) => (res.json()))
      .then((data)=>{
          const filteredData = data.map((item, index)=>( {
            id: item.matricula,
            Matricula: item.matricula,
            chofer: item.chofer,
            Tipo: item.tipo,
            Marca: item.marca,
            Modelo: item.modelo,
            Color: item.color,
            Indice_Real: item.indice_consumo_real,
            Fecha_normaConsumo: item.f_act_indice,
            Venc_FICAV: item.f_vencFICAV,
            Venc_LicOperativa: item.f_venc_lic_operativa,
            Estado_tecn: item.apto,
            Comb_utiliza: item.combustible,
            Cap_Tanque: item.cap_tanque,
            coms_segunFabr: item.indice_consumo_fabricante,
            prueba_litro: item.prueba_litro,
            No_Motor: item.num_motor,
            No_chasi: item.num_chasis,
            Tarjetas_combustible: item.tarjeta_asociada,
            No_AFT: 123,
          }))
         
          setVehiculo(filteredData)
      })
      .catch(err => console.log(err))
      .finally(() => setLoaded(true));
  },[setVehiculo,setLoaded])

  
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

  useEffect(()=>{
    getVehiculo()
  },[])

  return (
    <React.Fragment>
     
          <Box
            className="Box"
            sx={{ height: 600, width: "100%", margin: 3 ,marginTop: 5 }}
          >
            <Box sx={{ margin: 3, marginTop: 5 }}>
              <center>
                <Typography variant="h7">
                  <strong>Información de los Vehículos</strong>
                </Typography>
              </center>
              <center>
                <Typography variant="h7">
                  <strong>UEB EICMA VILLA CLARA</strong>
                </Typography>
              </center>
            </Box>
            <DataGrid
              rows={vehiculo}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionTab(newSelectionModel);
              }}
              selectionModel={selectionTab}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        

        {selectionTab.length === 1 ?
        <FormEditVehiculo
          open={openFormData}
          onClose={handleCloseFormData}
          editData={
            vehiculo.find((elem) => elem.id === selectionTab[0])
          
          }
        />
        : 
        <AddVehiculo
          open={openFormData}
          onClose={handleCloseFormData}
          create={formCreate}
        />
        }

    </React.Fragment>
  );
}