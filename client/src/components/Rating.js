import React, {Component} from 'react';
import { connect } from 'react-redux';
import {starMovie,getReviewsOfMovie} from '../actions'

const mapDispatchToProps = (dispatch) => {

    let actions = {starMovie,getReviewsOfMovie};
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
      temp_rating: null,
      disable : this.props.disable || false
    }
     this.star_out = this.star_out.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      rating : nextProps.rating || null
    })
  }

  rate(rating) {
    if(!this.state.disable){
      this.setState({
        rating: rating,
        temp_rating: rating
      });
      let data = {
        movieid :this.props.movieid,
        rating : this.state.rating,
        userid : localStorage.getItem("userId")
      }
      this.props.addStar(this.state.rating);
      // this.props.dispatch(this.props.starMovie(data))
      // .then(()=>this.props.dispatch(this.props.getReviewsOfMovie(this.props.movieid)))
    }
  }

  star_over(rating) {
    if(!this.state.disable){
      this.state.temp_rating = this.state.rating;
      this.state.rating = rating;

      this.setState({
        rating: this.state.rating,
        temp_rating: this.state.temp_rating
      });
    }
  }

  star_out() {
    if(!this.state.disable){
      this.state.rating = this.state.temp_rating;
      this.setState({ rating: this.state.rating });
    }
  }
  render() {
    var stars = [];
    for(var i = 1; i <= 5; i++) {
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
