import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MeniuModificare = (props) => {
    return (
        <Menu
            anchorEl={ props.optiuneModificare }
            open = { props.open }
            onClose={ props.inchideMeniu }
          >
          
            <MenuItem value={props.idRetetaModificare}  onClick={ e => props.editeazaReteta(e) }>
              Editeaza
            </MenuItem>
            <MenuItem value={1} onClick={props.stergeReteta}>
              Sterge
            </MenuItem>
        </Menu>
    );
};

export default MeniuModificare;