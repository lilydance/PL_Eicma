import * as React from 'react';
import { Typography, Fade,Stack, Dialog, DialogActions, DialogTitle, DialogContent, IconButton, Tooltip, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade in ref={ref} {...props} />;
});

export default function ViewGestion({
    open,
    onClose,
    viewData,
    ...props
}) {
    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth='lg'
            scroll='paper'
            onClose={onClose}
            TransitionComponent={Transition}
            aria-labelledby="form-data-client-sale-dialog-label"
            aria-describedby="form-data-client-sale-dialog-description"
        >
            <DialogTitle>
                Gestión de Presupuestos
                <Tooltip title='Cerrar' placement="top">
                    <IconButton
                        aria-label="cerrar-form"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            {(open && viewData !== null) && (
                <DialogContent dividers sx={{ maxHeight: '70vh', minHeight: '70vh' }}>
                    <Stack direction='column' spacing={3} alignItems='initial' alignContent='center' sx={{ mb: '1vh' }}>
                        {/* <Typography variant='h4'>{viewData.EntradaSalida}</Typography> */}
                    </Stack>
                    <Divider textAlign="left" sx={{ mt: '4vh', mb: '3vh' }}>DATOS DE CLIENTE</Divider>
                    <Stack direction='row' spacing={3} alignItems='initial' alignContent='center' sx={{ mb: '2vh' }}>
                        {/* <Typography><strong>ID</strong> {viewData.id}</Typography> */}
                        {/* <Typography><strong>Comercial: </strong> {viewData.seller}</Typography>
                        <Typography><strong>Tipo: </strong> {viewData.type}</Typography>
                        <Typography><strong>Estado: </strong> {viewData.state}</Typography> */}
                    </Stack>
                    <Stack direction='row' spacing={3} alignItems='initial' alignContent='center' sx={{ mb: '2vh' }}>
                        {/* <Typography><strong>Costo Estimado: </strong> {viewData.costEstimate}</Typography>
                        <Typography><strong>Costo Estimado (inc.IVA): </strong> {viewData.costEstimateIva}</Typography>
                        <Typography><strong>Costo Final: </strong> {viewData.costFinal}</Typography>
                        <Typography><strong>Costo Final (inc.IVA): </strong> {viewData.costFinalIva}</Typography> */}
                    </Stack>
                    <Divider textAlign="left" sx={{ mt: '4vh', mb: '3vh' }}>DATOS DE CONTACTOS</Divider>
                    <Stack direction='column' spacing={2} alignItems='initial' alignContent='center' sx={{ mb: '2vh' }}>
                        {/* <Typography><strong>Fecha: </strong> {viewData.updateAt}</Typography>
                        <Typography><strong>Cliente: </strong> {viewData.client}</Typography>
                        <Typography><strong>Env. Correo: </strong> {viewData.sendToMail}</Typography>
                        <Typography><strong>Env. Whatsapp: </strong>{viewData.sendToWhatsApp}</Typography>
                        <Typography><strong>Ent. Impreso: </strong> {viewData.sendToPrint}</Typography> */}
                    </Stack>
                    <Divider textAlign="left" sx={{ mt: '4vh', mb: '3vh' }}>CARACTERÍSTICAS</Divider>
                    <Stack direction='column' spacing={2} alignItems='initial' alignContent='center' sx={{ mb: '2vh' }}>
                        {/* <Typography><strong>Características: </strong>{viewData.features}</Typography>
                        <Typography><strong>Descripción: </strong>{viewData.description}</Typography> */}
                    </Stack>
                    {/* {Object.entries(viewData.obj.compatibilyTest).length > 0 && (
                        <ViewQuestionaryComercial
                            compatibilyTest={viewData.obj.compatibilyTest}
                            styleBox={{ ml: '2%', mb: '5vh' }}
                        />
                    )} */}
                </DialogContent>
            )}
            <DialogActions sx={{ bgcolor: 'primary.main' }}></DialogActions>
        </Dialog>
    );
}