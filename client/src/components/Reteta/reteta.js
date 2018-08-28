import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retetaDupaID } from '../../actions';

const Template = (props) => (
  <div className="contentReteta">
    <div
      className="coverReteta"
      style={{
        backgroundImage: `url('/imagini/${props.reteta.imagine}')`,
      }}
    >

    </div>
    <div
      style={{
        margin: "10px 50px 10px 50px",
      }}>
      Ingrediente:
                <div
        style={{
          //display:"flex",
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
        {
          props.reteta.ingrediente_reteta.length !== 0 ? 
            props.reteta.ingrediente_reteta.map((item,i) => (
              <Chip key={i} className="chipIngrediente" label={item[i]} color="primary" />
            ))
          :<div>Nu au fost scrise ingredientele</div>
        }
        
      </div>
    </div>
    <div
      style={{
        margin: "10px 50px 10px 50px",
      }}>
          { 
            props.reteta.descriere_reteta.length !== 0 ?
              <p className="paragraphReteta">
                {props.reteta.descriere_reteta}
              </p>
              : <p>Nu a fost sccrisa descrierea</p>
          }
    </div>
  </div>
)

class Retata extends Component {

  componentDidMount() {
    this.props.retetaDupaID(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        
        {
          this.props.reteta ?
              <Header 
                element="reteta" 
                history={this.props.history} 
                titlu = {this.props.reteta.titlu_reteta}
                />
          : null
        }
        {
          this.props.reteta ? 
            <Template reteta={this.props.reteta} />
          : <CircularProgress size={50} style={{
            marginLeft: "45%",
            marginTop: 300,
        }} />
        }
        

        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reteta: state.retete.reteta
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    retetaDupaID
  }, dispatch)

}
export default connect(mapStateToProps, mapDispatchToProps)(Retata)