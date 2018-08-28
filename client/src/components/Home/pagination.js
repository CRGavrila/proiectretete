import React from 'react';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Button } from '@material-ui/core';

const Pagination = (props) => {
    //console.log( props.disableRight || props.dimensiuneArray<=6 )
    return (
        <div
            style={{
                padding:15,
                marginBottom:10,
                display:"flex",
            }}>
                <div
                style={{
                    flexGrow:1,
                    textAlign:"left"
                }}>   
                    <Button 
                    variant="contained" 
                    disabled={props.disableLeft} 
                    color="secondary"
                    onClick={props.anterioaraPagina}   
                    >
                        <SkipPreviousIcon />
                        Inapoi
                    </Button>
                </div>
                <div
                style={{
                    flexGrow:1,
                    textAlign:"center"
                }}>
                    <div
                        style={{
                            paddingTop:10
                    }}>
                        
                    </div>
                </div>
                <div
                style={{
                    flexGrow:1,
                    textAlign:"right"
                }}>   
                    <Button 
                    variant="contained" 
                    disabled={ props.disableRight || props.dimensiuneArray <= 6 }
                    color="secondary"
                    onClick={e => props.urmatoareaPagina(e, props.dimensiuneArray)}
                    >
                        Inainte
                        <SkipNextIcon />
                    </Button>
                </div>
            </div>
    );
};

export default Pagination;