import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';


import Pagination from './pagination';

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        padding: 10
    },
    card: {
        display: "flex",
        justifyContent: "space-between"
    },
    detalii: {
        display: 'flex',
    },
    continut: {
        flex: '1',
    },
    poza: {
        width: 150,
        height: 150,
        margin: 20,
        borderRadius: 10
    },
    retetaLink: {
        display: 'flex',
        textDecoration: "none"
    },
    more: {
    }
};


const Afisare = (props) => (

    props.retete.retete.map((item, i) => (
        props.pagina <= i && i < props.retetaPerPagina ?
            <Grid item lg={6} key={i}>
                {/*target="_blank"*/}
                {/* {{`/reteta/${item._uuid}`}} */}
                <Card className={props.classes.card}>
                    <Link to={"/reteta/" + item._uuid} className={props.classes.retetaLink}>
                        <CardMedia
                            className={props.classes.poza}
                            image={`/imagini/${item.imagine}`}
                            title={item.titlu_reteta}
                        />
                        <CardContent className={props.classes.continut}
                            style={{
                                overflowY: "hidden",
                            }}
                        >
                            <Typography variant="headline"> {item.titlu_reteta} </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                style={{
                                    marginTop: 25,

                                }}
                            >
                                {item.descriere_reteta}
                            </Typography>
                        </CardContent>
                    </Link>
                    <CardContent className={props.classes.more}>
                        <Tooltip title="Modifica" placement="top">
                            <IconButton
                                onClick={e => props.modificaReteta(e)}
                                aria-label="More"
                                aria-owns={props.open ? 'long-menu' : null}
                                aria-haspopup="true"
                                value={item._uuid}
                            >
                                {/* {console.log(item._uuid)}
                                {console.log(i)} */}
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                    </CardContent>
                </Card>
            </Grid>
            : null
    ))
)


const ToateRete = (props) => {
    //console.log(props)
    return (
        <div>
            {
                props.retete.retete ?
                    <div>
                        <Pagination 
                            urmatoareaPagina={props.urmatoareaPagina} 
                            anterioaraPagina={props.anterioaraPagina} 
                            disableLeft = {props.disableLeft}
                            disableRight = {props.disableRight}
                            dimensiuneArray = {props.retete.retete.length}
                            />
                        <div
                            style={{
                                margin: 15,
                            }}
                        >
                            <Grid container spacing={16}>
                                <Afisare {...props} pagina={props.pagina} retetaPerPagina={props.retetaPerPagina} />
                            </Grid>
                        </div>
                    </div>
                    : <CircularProgress size={50} style={{
                        marginLeft: "50%",
                        marginTop: 100,
                    }} />
            }
            
        </div>
    );
};



export default withStyles(styles)(ToateRete);