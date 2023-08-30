import * as React from "react";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
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
import FormEditMantenimiento from "./FormMantenimiento";
import AddMantenimiento from "./AddPlanM";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ContentCutOutlined } from "@mui/icons-material";
import { ROUTESAPP } from "../utils/Routes";
import useMyHook from "../Hooks";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect } from "react";

let columns = [
  {
    field: "Meses",
    headerName: "Meses",
    type: "string",
    minWidth: 80,
    editable: true,
    align: "left",
  },
  {
    field: "Plan",
    headerName: "Plan de consumo Combustible (Lt)",
    minWidth: 250,
    editable: true,
    type: "number",
    align: "center",
  },
  {
    field: "Km",
    headerName: "Km a recorrer",
    minWidth: 110,
    editable: true,
    type: "number",
    align: "left",
  },
  {
    field: "Km_sin_recorrer",
    headerName: "Km sin recorrer para el próximo mtto",
    type: "number",
    minWidth: 250,
    editable: true,
    align: "center",
  },
  {
    field: "Km_recorridos",
    headerName: "Km recorridos para el próximo mtto",
    editable: true,
    minWidth: 250,
    type: "number",
    align: "center",
  },
  {
    field: "Actividad",
    headerName: "Actividad a realizar",
    type: "string",
    minWidth: 250,
    editable: true,
    align: "left",
  },
  {
    field: "Fecha",
    headerName: "Fecha aproximada del mtto",
    type: "date",
    minWidth: 200,
    editable: true,
    align: "left",
  },
  {
    field: "Observaciones",
    headerName: "Observaciones",
    type: "string",
    width: 250,
    editable: true,
    align: "left",
  },
];
const iniData = [
  {
    Chapa: "",
    id: "",
    Indice_Real: "",
    Comb_utiliza: "",
    Tipo: "",
    fecha: Date.parse("yyyy"),
  },
];

var myMes = {
  1: "Enero",
  2: "Febrero", 
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};



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
  const [chapa, setChapa] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const [dataSt, setDataSt] = React.useState(iniData);
  const [planM, setPlanM] = React.useState([]);
  const [value, setValue] = React.useState(dayjs());
  let [link, setLink] = React.useState('');
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
  const handleChapa = (e) => {
    setDataSt({
      ...dataSt,
      Chapa: e.target.value,
    });
  };
  // const handleLink = (DataSt.Chapa,Value) => {
  //   setLink({
  //     link:value.format('YYYY')
  //   })
  // }
  // handleLink();

  // ------------- chapas existentes ------------------------------
  const getChapa = React.useCallback(() => {
    setLoaded(false);
    fetch(`http://${process.env.REACT_APP_REST_API_URL}/transporte/vehiculo/`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.map((item, index) => ({
          id: item.matricula,
          Tipo: item.tipo,
          Chapa: item.matricula,
          Comb_utiliza: item.combustible,
          Indice_Real: item.indice_consumo_real,
        }));

        setChapa(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setChapa, setLoaded]);
// ----------------------------------------------------------------


  const getPlanM = React.useCallback(() => {
    setLoaded(false);
    fetch(
      `http://${process.env.REACT_APP_REST_API_URL}/transporte/mant-anual/${
        dataSt.Chapa
      }/${value.format("YYYY")}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let filteredData = data.map((item, index) => ({
          id: index,
          Meses: item.mes,
          Plan: item.plan_consumo,
          Km: item.km_a_recorrer,
          Km_sin_recorrer: item.km_prox_mant,
          Km_recorridos: item.km_recorridos,
          Actividad: item.actividad,
          Fecha: item.fecha_mant,
          Observaciones: item.descripcion,
          
        }));
        filteredData = filteredData.map((item, index) => {
              
          item.Meses= myMes[item.Meses];
          return item;

         }
      )
        setPlanM(filteredData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [setLoaded, dataSt.Chapa, value, setPlanM]);

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
    getPlanM();
  }, [value, dataSt]);

  
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        className="Box"
        sx={{ height: 600, width: "100%", margin: 3, marginTop: 5 }}
      >
        <Box sx={{ margin: 3, marginTop: 5 }}>
          <center>
            <Typography variant="h7">
              <strong>PLAN DE MANTENIMIENTO EQUIPOS DE TRANSPORTE.</strong>
            </Typography>
          </center>
        </Box>
        <Box
          sx={{
            height: 170,
            width: "50%",
            display: "inline-block",
            marginTop: 3,
          }}
        >
        
          {/* <Typography variant="h7">MINISTERIO DE LA AGRICULTURA</Typography>
          <br></br>
          <Typography variant="h7">OSM GELMA</Typography>
          <br></br>
          <Typography variant="h7">
            EMPRESA DE INFORMÁTICA Y COMUNICACIÓN
          </Typography>
          <br></br>
          <Typography variant="h7">UEB VILLA CLARA</Typography> */}
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
        <Box
          sx={{
            height: 100,
            width: "50%",
            display: "inline-block",
            marginTop: 3,
          }}
        >
          {chapa.map((ele) => {
            if(ele.Chapa == dataSt.Chapa)
                  return (
                    <Typography variant="h7">Equipo: {ele.Tipo}</Typography>
                    );
          })}
          <br></br>
          {chapa.map((ele) => {
            if(ele.Chapa == dataSt.Chapa)
                  return (
                    <Typography variant="h7">Matrícula: {ele.Chapa}</Typography>
                    );
          })}
          <br></br>
          {chapa.map((ele) => {
            if(ele.Chapa == dataSt.Chapa)
                  return (
                    <Typography variant="h7">Ciclo de Mantenimiento: 10000</Typography>
                    );
          })}
          <br></br>
          {chapa.map((ele) => {
            if(ele.Chapa == dataSt.Chapa)
                  return (
                    <Typography variant="h7">Combustible: {ele.Comb_utiliza}</Typography>
                    );
          })}
          <br></br>
          {chapa.map((ele) => {
            if(ele.Chapa == dataSt.Chapa)
                  return (
                    <Typography variant="h7">Índice de Consumo: {ele.Indice_Real}</Typography>
                    
                    );
          })}
                  {/* <Typography variant="h7">Equipo: {ele.Tipo}</Typography>
                  <br></br>
                  <Typography variant="h7">Matrícula: {dataSt.Chapa}</Typography>
                  <br></br>
                  <Typography variant="h7">Ciclo de Mantenimiento: 10000</Typography>
                  <br></br>
                  <Typography variant="h7">Combustible: {ele.Comb_utiliza}</Typography>
                  <br></br>
                  <Typography variant="h7">Índice de Consumo: {ele.Indice_Real}</Typography> */}
        </Box>
        

        <DataGrid
          rows={planM}
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
        <FormEditMantenimiento
          open={openFormData}
          onClose={handleCloseFormData}
          editData={
            planM.find((elem) => elem.id === selectionTab[0])
          
          }
        />
        : 
        <AddMantenimiento
          open={openFormData}
          onClose={handleCloseFormData}
          create={formCreate}
          matricula={dataSt.Chapa}
          anno={value}
        />
        }
    </React.Fragment>
  );
  
}
