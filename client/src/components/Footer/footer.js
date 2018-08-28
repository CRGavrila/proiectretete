import React from 'react';

const Footer = (props) => {
    
    return (
        <footer>
            {
                props.dimensiuneArray && props.retetaPerPagina ?
                    <div>
                       Pagina {Math.floor(props.retetaPerPagina/6)} / {props.dimensiuneArray ===6 ? 1 : Math.floor(props.dimensiuneArray/6)+1 } 
                    </div>
                : null
            }
        </footer>
    );
};

export default Footer;