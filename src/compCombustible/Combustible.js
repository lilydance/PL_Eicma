import * as React from "react";
import {
  Box,
  //   Paper,
  Typography,
  Stack,
  Divider,
  //   Menu,
  //   MenuItem,
  IconButton,
  //   Skeleton,
  Tooltip,
  backdropClasses,
  //   Alert,
  //   Badge,
  //   ListItemIcon,
  //   ListItemText,
  //   makeStyles,
} from "@mui/material";
import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  //   useGridApiContext,
  //   useGridSelector,
} from "@mui/x-data-grid";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import FormEditCombustible from "./FormCombustible";
import AddCombustible from "./AddCombustibles";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import useMyHook from "../Hooks";

const columns = [
  {
    field: "Tipo",
    headerName: "Tipo de Combustible",
    type: "string",
    width: 150,
  },
  {
    field: "Precio",
    headerName: "Precio del litro",
    width: 110,
    type: "number",
  },
  {
    field: "Subelemento",
    headerName: "Sub-elemento de gastos",
    width: 170,
    type: "number",
  },
];

export default function DataGridDemo() {
  //--------------- llamando datos de la API -------------------------
  const [combustibles, setCombustibles] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const getCombustibles = React.useCallback(() => {
    setLoaded(false);
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/tip-comb/`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.map((item, index) => ({
          id: item.name + index,
          Tipo: item.name,
          Precio: item.precio,
          Subelemento: item.subelemento_gastos,
        }));

        setCombustibles(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setCombustibles, setLoaded]);
// ------------------------------------------------------------------
  // const {loading} = useMyHook();
  // const {selectionTab} = useMyHook();
  // const {setSelectionTab} = useMyHook();
  // const {refreshTable}= useMyHook();
  // const {openFormData}= useMyHook();
  // const {formCreate}= useMyHook();
  // const {confirmDial}= useMyHook();
  // const {rowsCan}= useMyHook();
  // const {openViewData}= useMyHook();
  // const {handleCloseFormData}= useMyHook().handleCloseFormData;
  // const {handleViewData}= useMyHook().handleViewData;
  // const {handleCloseViewData}= useMyHook().handleCloseViewData;
  // const {handleOpenConfirmDial}= useMyHook().handleOpenConfirmDial;
  // const {handleCloseConfirmDial}= useMyHook().handleCloseConfirmDial;
  // const {handleCreateData}= useMyHook().handleCreateData;
  // const {handleUpdateData}= useMyHook().handleUpdateData;
  // const {handleRefreshT}= useMyHook().handleRefreshT;

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
            onClick={handleRefreshT}
            sx={{ color: "#0E7352" }}
          >
            <Tooltip title="Actualizar" placement="top">
              <RefreshSharpIcon />
            </Tooltip>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            variant="text"
            aria-label="crear"
            onClick={handleCreateData}
            disabled={selectionTab.length !== 0}
            sx={{ color: "#0E7352" }}
          >
            <Tooltip title="Nuevo" placement="top">
              <AddSharpIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            variant="text"
            aria-label="editar"
            onClick={handleUpdateData}
            disabled={selectionTab.length !== 1}
            sx={{ color: "#0E7352" }}
          >
            <Tooltip title="Editar" placement="top">
              <EditSharpIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            variant="text"
            aria-label="delete"
            onClick={handleOpenConfirmDial}
            disabled={selectionTab.length < 1}
            sx={{ color: "#0E7352" }}
          >
            <Tooltip title="Eliminar" placement="top">
              <DeleteSharpIcon />
            </Tooltip>
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            variant="text"
            aria-label="view"
            onClick={handleViewData}
            disabled={selectionTab.length !== 1}
            sx={{ color: "#0E7352" }}
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
    getCombustibles();
  }, []);

  return (
    <React.Fragment>
      <Box
        className="Box"
        sx={{ height: 600, width: "100%", margin: 3, marginTop: 5 }}
      >
        <Box sx={{ margin: 3, marginTop: 5 }}>
          <center>
            <Typography variant="h7">
              <strong>Información Combustible</strong>
            </Typography>
          </center>
          <center>
            <Typography variant="h7">
              <strong>UEB EICMA VILLA CLARA</strong>
            </Typography>
          </center>
        </Box>

        <DataGrid
          rows={combustibles}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionTab(newSelectionModel);
          }}
          selectionModel={selectionTab}
          // pageSize={8}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
        {selectionTab.length === 1 ?
        <FormEditCombustible
          open={openFormData}
          onClose={handleCloseFormData}
          editData={
            combustibles.find((elem) => elem.id === selectionTab[0])
          
          }
        />
        : 
        <AddCombustible
          open={openFormData}
          onClose={handleCloseFormData}
          create={formCreate}
        />
        }
        
    </React.Fragment>
  );
}
