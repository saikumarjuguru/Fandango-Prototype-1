import React, {Component} from 'react';
import { connect } from 'react-redux';
import {starMovie} from '../actions'

const mapDispatchToProps = (dispatch) => {

    let actions = {starMovie};
    return { ...actions, dispatch };

  }

const mapStateToProps = (state) => {
    return {

    }
}

class Rating extends Component{

  propTypes: {
    disabled: React.PropTypes.bool
  }

  constructor(props){
    super(props);
    this.state ={
      rating: this.props.rating || null,
      temp_rating: null
    }
    // this.rate = this.rate.bind(this);
    // this.star_over = this.star_over.bind(this);
     this.star_out = this.star_out.bind(this);
  }

  rate(rating) {
    this.setState({
      rating: rating,
      temp_rating: rating
    });
    let data = {
      movieid :this.props.movieid,
      rating : this.state.rating+1,
    //  userid : localStorage.getItem("userid");
     userid : 1
    }
    this.props.dispatch(this.props.starMovie(data))
  }

  star_over(rating) {
    this.state.temp_rating = this.state.rating;
    this.state.rating = rating;

    this.setState({
      rating: this.state.rating,
      temp_rating: this.state.temp_rating
    });
  }

  star_out() {
    this.state.rating = this.state.temp_rating;
    this.setState({ rating: this.state.rating });
  }
  render() {
    var stars = [];
    for(var i = 0; i < 5; i++) {
      var klass = 'star-rating__star';

      if (this.state.rating >= i && this.state.rating != null) {
        klass += ' is-selected';
      }

      stars.push(
        <label
          className={klass}
          onClick={this.rate.bind(this,i)}
          onMouseOver={this.star_over.bind(this,i)}
          onMouseOut={this.star_out}>
          ★
        </label>
      );
    }

    return (
      <div className="star-rating">
        {stars}
      </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Rating);
