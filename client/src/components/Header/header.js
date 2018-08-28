import React from 'react';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import AddIcon from "@material-ui/icons/Add";

const Header = (props) => {
    let template = null;
    //console.log(props.history)
    
    switch(props.element){
        case 'home':
            template = (
                <header>
                    <div
                        style={{
                            display:"flex",
                            textAlign:"center"
                        }}
                    >
                        <div
                            style={{
                                flexGrow:1
                            }}
                        >
                        <Button 
                            style={{
                                textTransform:"capitalize"
                            }}
                            variant="contained"
                             mini color="primary" 
                             aria-label="Add"
                             onClick = { e => props.adaugaReteta(e) }
                             >
                            <AddIcon style={{
                                marginRight:5
                            }}/>Reteta Noua
                        </Button>
                        </div>
                        <div
                            style={{
                                flexGrow:2,
                                fontSize:"20px",
                                marginTop:10
                            }}
                            ><strong>Retete</strong> culinare</div>
                        <div
                        style={{
                            flexGrow:1,
                            marginTop:5,
                            display:"flex",
                            flexDirection:"column"
                        }}
                        ><div style={{
                        }}
                        >Search</div> 
                        <input 
                            className="search" 
                            onChange={ e => props.cautaReteta(e) }
                        />
                        </div>
                    </div>
                </header> 
            );
            break;
        case 'reteta':
            template = (
                <header 
                style={{
                    display:"flex",

                }}
                >
                    <div
                        style={{
                            textAlign:"center",
                            width:150
                        }}
                    >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={ e => props.history.goBack() }
                            style={{
                                textTransform:"capitalize"
                            }}
                        >
                            <ChevronLeft />
                            Inapoi                        
                        </Button>
                    </div>
                    <div
                        style={{
                            flexGrow:2,
                            textAlign:"center",
                            marginTop:10,
                            fontWeight:500,
                            color: "#3f51b5"
                        }}
                    >
                            { props.titlu }                       
                    </div>
                    <div
                        style={{
                            width:150
                        }}
                    >
                    </div>                                  
                </header>
            );
            break;
        default:
            template = null
    }

    return template;
};

export default Header;