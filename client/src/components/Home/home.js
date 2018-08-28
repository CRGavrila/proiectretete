import React, { Component } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import ToateRete from './toateRete';
import MeniuModificare from './meniuModificare';
import ModificareReteta from './modificareReteta';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toateRetetele, stergeReteta, cautaRetetaDupaCuvant } from '../../actions';

class Home extends Component {

  state = {
    optiuneModificare: null,
    idRetetaModificare: null,
    optiune: null,
    statusDialog: false,
    pagina: 0,
    retetaPerPagina: 6,
    disableLeft: true,
    disableRight: false,
    stergereReteta: null
  }

  componentDidMount() {
    this.props.toateRetetele();

  }

  static getDerivedStateFromProps(props, state) {
    if (props.success) {
      if (props.success.success)
        if (state.stergereReteta !== props.success.success.success) {

          return {
            stergereReteta: props.success.success.success
          }
        }
    }

    console.log(props)

    return null
  }

  adaugaReteta = e => {
    console.log("Adauga ")
    this.setState({
      optiuneModificare: null,
      optiune: "adaugare",
      statusDialog: true
    })
  }

  modificaReteta = e => {
    console.log(e.currentTarget.value)
    //console.log(e)
    this.setState({
      optiuneModificare: e.currentTarget,
      idRetetaModificare: e.currentTarget.value,
    })
  }

  inchideMeniu = e => {
    this.setState({
      optiuneModificare: null,
      idRetetaModificare: null
    })
  }

  editeazaReteta = e => {
    //console.log("Editeaza " + e.currentTarget.value)
    console.log(this.state.idRetetaModificare)
    this.setState({
      optiuneModificare: null,
      optiune: "editare",
      statusDialog: true,
    })
  }

  stergeReteta = e => {
    console.log("Sterge " + e.target.value)
    this.setState({
      optiuneModificare: null,
      optiune: "stergere",
      statusDialog: true,
    })
  }

  inchideDialogEditare = (e, raspuns) => {
    console.log(raspuns)
    this.setState({
      optiuneModificare: null,
      statusDialog: false
    })
  }

  inchideDialogStergere = (e, raspuns) => {

    if (raspuns === "nu") {
      this.setState({
        optiuneModificare: null,
        statusDialog: false
      })
    } else if (raspuns === "backdropClick") {
      this.setState({
        optiuneModificare: null,
        statusDialog: false
      })
    } else {
      console.log(raspuns)
      this.props.stergeReteta(raspuns);
    }

  }

  urmatoareaPagina = (e, dimensiuneArray) => {
    console.log("next " + dimensiuneArray)
    let pagina_nou = this.state.pagina + 6;
    let retetaPerPagina = this.state.retetaPerPagina + 6;

    if (retetaPerPagina > dimensiuneArray) {
      this.setState({
        pagina: pagina_nou,
        retetaPerPagina: retetaPerPagina,
        disableRight: true,
        disableLeft: false
      })
    }
  }

  anterioaraPagina = e => {
    console.log("ante")
    let pagina_nou = this.state.pagina - 6;
    let retetaPerPagina = this.state.retetaPerPagina - 6;
    if (pagina_nou === 0) {
      this.setState({
        pagina: pagina_nou,
        retetaPerPagina: retetaPerPagina,
        disableLeft: true,
        disableRight: false,
      })
    }
  }

  cautaReteta = e => {
    console.log(e.target.value);
    let cuvant = e.target.value;
    if(cuvant.length === 0){
      window.location.reload()
    }
    this.props.cautaRetetaDupaCuvant(cuvant)
  }

  render() {
    return (
      <div>
        <Header 
            adaugaReteta={this.adaugaReteta} 
            element="home" history={this.props.history} 
            open={Boolean(this.state.optiuneModificare)} 
            cautaReteta={this.cautaReteta}
            />
        <div className="content">
          <ToateRete
            retete={this.props.retete}
            modificaReteta={this.modificaReteta}
            pagina={this.state.pagina}
            retetaPerPagina={this.state.retetaPerPagina}
            disableLeft={this.state.disableLeft}
            disableRight={this.state.disableRight}
            urmatoareaPagina={this.urmatoareaPagina}
            anterioaraPagina={this.anterioaraPagina}
          />

          <MeniuModificare
            optiuneModificare={this.state.optiuneModificare}
            open={Boolean(this.state.optiuneModificare)}
            inchideMeniu={this.inchideMeniu}
            idRetetaModificare={this.state.idRetetaModificare}
            adaugaReteta={this.adaugaReteta}
            editeazaReteta={this.editeazaReteta}
            stergeReteta={this.stergeReteta}

            statusDialog={this.state.statusDialog}
            inchideDialogEditare={this.inchideDialogEditare}
            inchideDialogStergere={this.inchideDialogStergere}
          />
          {/* aduagua reteta noua */}
          <ModificareReteta
            optiune={this.state.optiune}
            idRetetaModificare={this.state.idRetetaModificare}
            statusDialog={this.state.statusDialog}
            inchideDialogEditare={this.inchideDialogEditare}
            inchideDialogStergere={this.inchideDialogStergere}
            {...this.props}
          />
        </div>


        {
          this.props.retete.retete ?
            <Footer dimensiuneArray={this.props.retete.retete.length} retetaPerPagina={this.state.retetaPerPagina} />
            : <Footer />
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  //console.log(state)
  return {
    retete: state.retete,
    success: state.retete,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toateRetetele,
    stergeReteta,
    cautaRetetaDupaCuvant
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
