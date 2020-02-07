import React, { Component } from 'react';
import FotoItem from './Foto';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = { fotos: [] };
    this.login = this.props.login;
  }

  componentWillMount(){
    this.props.store.subscribe(() => {
      this.setState({fotos:this.props.store.getState()});
    })
  }

  carregaFotos() {
    let urlPerfil;

    if (this.login === undefined) {
      urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
    }
    //this.props.store.lista(urlPerfil)
    const listaFixa = [
      {
      "urlPerfil": "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg",
      "loginUsuario": "alots",
      "horario": "07/02/2020 12:38",
      "urlFoto": "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/photo-1.jpg",
      "id": 1,
      "likeada": false,
      "likers": [],
      "comentarios": [],
      "comentario": "Legenda da foto"
      },
      {
      "urlPerfil": "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg",
      "loginUsuario": "alots",
      "horario": "07/02/2020 12:38",
      "urlFoto": "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/photo-2.jpg",
      "id": 2,
      "likeada": false,
      "likers": [],
      "comentarios": [],
      "comentario": "Legenda da foto"
      }
      ]

    this.props.store.dispatch({type:'LISTAGEM', fotos:listaFixa});
  }

  componentDidMount() {
    this.carregaFotos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.carregaFotos();
    }
  }

  like(fotoId) {
    this.props.store.like(fotoId);
  }

  comenta(fotoId, textoComentario) {
    this.props.store.comenta(fotoId, textoComentario);
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)} />)
          }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}