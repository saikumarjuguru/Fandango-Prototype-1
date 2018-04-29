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

  constructor(props){
    super(props);
    this.state = {
     date : new Date()
    }
    this.clickDate = this.clickDate.bind(this);
  }

  static defaultProps = {
    movie : ''
  }



  componentDidMount (){
    var self = this;

    $('.carousel-showmanymoveone .carousel-item').each(function(index){
      var itemToClone = $(this);
      if(index ==0){
        itemToClone.addClass('active ')
        .on('click', self.clickDate);
      }
      for(var i=1;i<6;i++) {

        itemToClone = itemToClone.next();

        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
          itemToClone.on('click',self.clickDate)
        }

        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .on('click',self.clickDate)
          .appendTo($(this));
      }
    });
  }

  clickDate(event){
    console.log(event.target.parentElement.parentElement.getAttribute("data"));

    let date = event.target.parentElement.parentElement.getAttribute("data");
    if($('.fandango-calender-click').html() !==undefined){
      $('.fandango-calender-click').removeClass('fandango-calender-click');
      $(event.target.parentElement).addClass('fandango-calender-click')
    } else {
      $(event.target.parentElement).addClass('fandango-calender-click')
    }

    if(this.state.date!== date){
      this.setState({
        date : date
      },function(){
        console.log("STATE "+this.state.date);
        this.props.onDateSelect(new Date(this.state.date));
      })
    }

  }

  render(){

   let dateItems = [];
   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
   var days = ["Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat" ];
   for (var i = 0; i < 7; i++) {
   var date = new Date()
      date.setDate(date.getDate() + i )
        dateItems.push(
          <div key={i}  className='carousel-item row' onClick={this.clickDate}>
              <div className={ i==0 ? 'fandango-calender-click col-md-2 item-date p-0': 'col-md-2 item-date p-0'} data={date}  >
                <div className ="fandango-calender" >
                  <span className="date-picker__date-weekday">{days[date.getDay()]}</span>
                  <span className="date-picker__date-month">{months[date.getMonth()]}</span>
                  <span className="date-picker__date-day">{date.getDate()}</span>
                </div>
            </div>
          </div>
       );
  }

    return(


            <div className="carousel carousel-showmanymoveone" id="carousel-tilenav" data-interval="false">
              <div className="carousel-inner">
                {dateItems}
              </div>
              <a className="carousel-control-prev text-faded" href="#carousel-tilenav" role="button" data-slide="prev">
                <i className="fa fa-chevron-left fa-lg text-muted"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next text-faded" href="#carousel-tilenav" role="button" data-slide="next">
                <i className="fa fa-chevron-right fa-lg text-muted"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>


    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DateCarousel)
