import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Icon from "../utils/Logo_cut.png";
import makeStyles from "@mui/material/styles";
import { Block } from "@mui/icons-material";
import { ThemeProvider } from "styled-components";
import PlanMantenimiento from "./PlanMantenimiento";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded';
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import CreditCardOffRoundedIcon from "@mui/icons-material/CreditCardOffRounded";
import CarCrashRoundedIcon from '@mui/icons-material/CarCrashRounded';
import { Link } from "react-router-dom";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [selectionTab, setSelectionTab] = React.useState([]);

  // const handleRefreshT = () => {
  //   setRefreshTable(refreshTable === 0 ? 1 : 0);
  //   setSelectionTab([]);
  // };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ background: "#FFF" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{color: '#828278'}}/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
           <img
              className="Icono"
              width={"130p"}
              height={"50px"}
              src={Icon}
              alt=""
              position= ''
            ></img>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className="Drawer" variant="permanent" open={open}>
        <DrawerHeader sx={{background: '#fff'}}>
          <IconButton onClick={handleDrawerClose} sx={{background: '#fff'}}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List sx={{background: 'transparent'}}>
          {[
            {
              name: "Combustible",
              icon: <LocalGasStationRoundedIcon />,
              path: "/combustible",
            },
            {
              name: "Vehiculo",
              icon: <DirectionsCarRoundedIcon />,
              path: "/vehiculo",
            },
            {
              name: "Tarjetas",
              icon: <PaymentRoundedIcon />,
              path: "/tarjetas",
            },
            {
              name: "Entrada tickets",
              icon: <ConfirmationNumberRoundedIcon />,
              path: "/tickets",
            },
            {
              name: "Plan Mant.",
              icon: <BuildRoundedIcon />,
              path: "/planMant",
            },
            {
              name: "Equipo-Equipo",
              icon: <CommuteRoundedIcon />,
              path: "/equipo",
            },
            {
              name: "Tarjetas Dusosas",
              icon: <CreditCardOffRoundedIcon />,
              path: "/tarjeDudosas",
            },
            {
              name: "Equi. Ineficientes",
              icon: <CarCrashRoundedIcon />,
              path: "/anexo2",
            },
          ].map((index) => (
            <Link 
            to={index.path}
            style={{ textDecoration: 'none'}}

            >
              <ListItem disablePadding sx={{ display: "block", color: "#fff" }}>
                <ListItemButton
                  sx={{
                    minHeight: 60,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:"#fff",
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={index.name}
                    sx={{ 
                      opacity: open ? 1 : 0,

                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        {/* <List sx={{background: '#0E7352'}}>
          {[
            {
              name: "Resolucion",
              icon: <FeedRoundedIcon />,
              path: "/resolucion",
            },
            {
              name: "Articulos",
              icon: <SubjectRoundedIcon />,
              path: "/articulos",
            },
            {
              name: "Autocontrol",
              icon: <CheckBoxRoundedIcon />,
              path: "/autocontrol",
            },
            
           
          ].map((index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", color: "#fff" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  {index.icon}
                  <Link to={index.path}></Link>
                </ListItemIcon>
                <ListItemText
                  primary={index.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      {children}
    </Box>
  );
}
