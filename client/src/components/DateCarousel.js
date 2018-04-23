import React, {Component} from 'react';
import { connect } from 'react-redux';
import $ from 'jquery'

const mapDispatchToProps = (dispatch) => {

    let actions = {};
    return { ...actions, dispatch };

  }

  const mapStateToProps = (state) => {
    return {

    };
  }


class DateCarousel extends Component{

  static defaultProps = {
    movie : ''
  }

  componentDidMount(){

    $('.carousel-showmanymoveone .item').each(function(index ){

      var itemToClone = $(this);
      if(index ==0){
        itemToClone.addClass('active');
      }
      for(var i=1;i<6;i++) {

        itemToClone = itemToClone.next();

        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }

        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .appendTo($(this));
      }

    });
  }

  render(){

    let dateItems = [];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
   for (var i = 0; i < 7; i++) {
  var date = new Date()
      date.setDate(date.getDate() + i )
       dateItems.push(
         <div class="item ">
            <div class="col-xs-12 col-sm-6 col-md-2">
              <a  href="#">
                <span class="date-picker__date-weekday">{days[date.getDay()]}</span>
                <span class="date-picker__date-month">{months[date.getMonth()]}</span>
                <span class="date-picker__date-day">{date.getDate()}</span>

              </a>
            </div>
         </div>

       );
  }

    return(
      <div class="container">


    <div class="row">
       <div class="col-md-12">
          <div class="carousel carousel-showmanymoveone slide" id="carousel-tilenav" data-interval="false">

             <div class="carousel-inner fandango-carousel">
              {dateItems}
            </div>
               <a class="left carousel-control" href="#carousel-tilenav" data-slide="prev"><i class="glyphicon glyphicon-chevron-left"></i></a>
            <a class="right carousel-control" href="#carousel-tilenav" data-slide="next"><i class="glyphicon glyphicon-chevron-right"></i></a>
          </div>
       </div>
    </div>


    </div>

    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DateCarousel)
