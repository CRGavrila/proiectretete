import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import EditeazaRetea from './editeazaReteta';
import AdaugaReteta from './adaugaReteta';
//import axios from 'axios';

import './styles.css';

const ModificareReteta = (props) => {

    let template = null;

    switch (props.optiune) {
        case 'editare':
            //console.log(props)
            template = (
                <Dialog
                    open={props.statusDialog}
                    onClose={props.inchideDialogEditare}
                >
                    <DialogTitle >Modifica Reteta</DialogTitle>
                    <DialogContent>
                        <EditeazaRetea 
                            idRetetaModificare={props.idRetetaModificare}
                            { ...props }
                            />
                    </DialogContent>
                </Dialog>
            );
            break;
        case 'stergere':
            //console.log(props.idRetetaModificare)
            template = (
                <Dialog
                    open={props.statusDialog}
                    onClose={props.inchideDialogStergere}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle id="scroll-dialog-title">Sterge</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Esti sigur ca doresti sa stergi aceasta reteta?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={e => props.inchideDialogStergere(e, props.idRetetaModificare )} color="secondary">
                            Da
                        </Button>
                        <Button onClick={e => props.inchideDialogStergere(e, "nu")} color="primary">
                            Nu
                        </Button>
                    </DialogActions>
                </Dialog>
            );
            break;
        case 'adaugare':
            //console.log(props)
            template = (
                <Dialog
                    open={props.statusDialog}
                    onClose={props.inchideDialogEditare}
                >
                    <DialogTitle >Adauga Reteta Noua</DialogTitle>
                    <DialogContent>
                        <AdaugaReteta />
                    </DialogContent>
                </Dialog>
            );
            break;
        default:
            template = null

    };
    return template;
};
export default ModificareReteta;