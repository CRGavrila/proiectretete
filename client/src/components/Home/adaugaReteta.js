import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adaugaReteta } from '../../actions';

class RetetaNoua extends Component {

    componentDidUpdate(){

    }

    static getDerivedStateFromProps(props, state) {
        
        if(props.reteta)
            if(props.reteta.reteta)
                if (state.eroareTitlu !== props.reteta.reteta.eroareTitlu || state.eroareDescriere !== props.reteta.reteta.eroareDescriere || state.success !== props.reteta.reteta.success) {
                    console.log(props.reteta.reteta)
                    return {
                        eroareTitlu: props.reteta.reteta.eroareTitlu,
                        eroareDescriere: props.reteta.reteta.eroareDescriere,
                        success: props.reteta.reteta.success
                    }
                }
        
         return null
      }

    state = {
        titlu:'',
        eroareTitlu:'',
        descriere:'',
        eroareDescriere:'',
        ingredientNou:'',
        fileUpload:'',
        ingrediente:[],
        success:null

    }
    
    uploadImagine = (e) => {
        if(e.target.files[0]){
            document.getElementById("imagine").src = URL.createObjectURL(e.target.files[0]);
            document.getElementById("imagine").height = 150;
            document.getElementById("imagine").width = 150;
  
            let formData = new FormData()
            formData.append('myFile', e.target.files[0], e.target.files[0].name)
            console.log(e.target.files[0])
            axios.post('/api/upload/', formData)
                .then( response => console.log(response.data))
                .then( this.setState({
                    fileUpload: e.target.files[0].name
                }) )
            
            
        }else{
            document.getElementById("imagine").src = '';
            document.getElementById("imagine").height = 0;
            document.getElementById("imagine").width = 0;
        }
      }

    handleDelete = item  => {
        const chipData = this.state.ingrediente
          const chipToDelete = chipData.indexOf(item);
          chipData.splice(chipToDelete, 1);
        

        this.setState({
            ingrediente:chipData
        });
      };

    handleTitle = (e) => {
        this.setState({
            titlu:e.target.value
        })

      }

      handleDescriere = (e) => {
        this.setState({
            descriere:e.target.value
        })
      }

      salveazaModificarea = (e) => {
        
        //e.preventDefault();
        this.props.adaugaReteta( this.state.titlu , 
                                this.state.descriere , 
                                this.state.ingrediente , 
                                this.state.fileUpload);
      }

      handleIngredientNou = (e) => {
        this.setState({
            ingredientNou : e.target.value
        })
      }

      adaugaIngredientNou = () => {
          if(this.state.ingredientNou !== ''){
            let ingredienteActuale = this.state.ingrediente;
            let ingredienteAdaugate = ingredienteActuale.concat(this.state.ingredientNou)
            this.setState({
                ingrediente:ingredienteAdaugate,
                ingredientNou:''
            })
          }          
      }

  render() {
      //console.log("erR",this.state.eroareTitlu)
      //console.log(this.props.retete)
      
    return (
        <form encType="multipart/form-data">
                     {/* <form onSubmit={ e => console.log("ok")}> */}

                <div className="form_element">
                    <label>Titlul retetei:</label>
                    <input
                        type="text"
                        onChange={e => this.handleTitle(e)}
                        value={this.state.titlu}
                    />
                    <label className="label_error">
                        {this.state.eroareTitlu}
                    </label>
                </div>
            
            <div className="form_element">
                <label>Descrierea retetei:</label>
                <textarea
                    className="descriereForm"
                    onChange={this.handleDescriere}
                    value={this.state.descriere}
                />
                <label className="label_error">
                    { this.state.eroareDescriere }
                </label>
            </div>
            
            <div className="form_element">
                <label>Ingrediente:</label>
            </div>

            <div className="form_element"
                style={{
                    border:"1px solid grey",
                    display:"flex",
                    flexDirection:"row",
                }}
            >
                
                <input 
                    style={{
                        flexGrow:2,
                        border:"none",
                    }}
                    value={this.state.ingredientNou}
                    onChange={ e => this.handleIngredientNou(e) }
                />
                <Button
                    color='primary'
                    style={{
                        textTransform:"capitalize"
                    }}
                    onClick={e => this.adaugaIngredientNou(e) }
                >
                    <AddIcon />
                    adauga
                </Button>
            </div>

            <div className="form_element">
                {this.state.ingrediente.map((item,i)=>(
                     <Chip key={i} className="chipIngrediente" label={ item } color="primary" onDelete={ e => this.handleDelete(item)}/>                       
                ))}
            </div>
            
                        <input
                            accept="image/*"
                            id="uploadPozaReteta"
                            type="file"
                            onChange={ e => this.uploadImagine(e) }
                            style={{
                                display:"none"
                            }}
                        />
                                <div
                                    style={{
                                        textAlign:"center",                                        
                                    }}
                                >
                                    <label htmlFor="uploadPozaReteta">
                                        <Button 
                                            variant="contained"
                                            component="span"
                                            style={{
                                                textTransform:"capitalize"
                                            }}
                                        >
                                            Upload
                                        </Button>
                                    </label>
                                </div>
                                <div className="form_element">
                                    <img id="imagine"  alt="" />
                                </div>                                
                                <div className="form_element"
                                    style={{
                                        textAlign:"center",                                        
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        //type="submit"
                                        onClick={this.salveazaModificarea}
                                    >
                                        Salveaza
                                    </Button>
                                </div>
                            {
                                this.state.success ?
                                    window.location.reload()
                                : null
                            }
            </form>
                )
            }
        }

    function mapStateToProps(state){
            return {
                reteta: state.retete
            }
        }

    function mapDispatchToProps(dispatch){
            return bindActionCreators({
                adaugaReteta
            }, dispatch)
        }


export default connect(mapStateToProps , mapDispatchToProps)(RetetaNoua);
