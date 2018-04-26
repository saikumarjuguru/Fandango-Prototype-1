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



  componentDidMount(){


    var self = this;

    $('.carousel-showmanymoveone .item').each(function(index ){

      var itemToClone = $(this);
      if(index ==0){
        itemToClone.addClass('active ')
        .on('click',self.clickDate);
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
  }else{
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
         <div key={i}  class= 'item' onClick ={this.clickDate}>
            <div class={ i==0 ? 'fandango-calender-click col-xs-12 col-sm-6 col-md-2 item-date': 'col-xs-12 col-sm-6 col-md-2 item-date'} data={date}  >
              <div className ="fandango-calender" >
                <span class="date-picker__date-weekday">{days[date.getDay()]}</span>
                <span class="date-picker__date-month">{months[date.getMonth()]}</span>
                <span class="date-picker__date-day">{date.getDate()}</span>

              </div>
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
