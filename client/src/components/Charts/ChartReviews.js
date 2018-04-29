import React, {Component} from 'react';
import axios from 'axios';
import NavAdmin from '../NavAdmin';
import config from '../../config'
import {Bar,Pie} from 'react-chartjs-2'

class ChartReviews extends Component {

  constructor(props){
    super(props);
    this.state={
      posts:[],
      chartData:{
        labels: [],
        datasets:[
          {
            label:'Reviews',
            data:[],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
              
            ]
          }
        ]
      }
    }
}

  componentWillMount(){
    let self = this;
    axios.get(config.API_URL+'/admin/getmoviereviews')
    .then(function (response) {
      console.log(response.data.message);
      self.setState({posts:response.data.message})
      console.log(self.state.posts);
      var labels_temp=[];
      var data_temp = [];
      self.state.posts.map((post)=>{
        labels_temp.push(post.movie_name);
        data_temp.push(post.reviews);
      })
      console.log(labels_temp);
      console.log(data_temp);
      
      self.setState({
        chartData: {
              ...self.state.chartData,
              labels:labels_temp,
              datasets:[
                {
                  label:'Reviews',
                  data:data_temp,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                    
                  ]
                }
              ]
          }
      });
    
    })
    .catch(function (error) {
      console.log(error);
    });

  
}



render(){
  
  

  return(
          <Bar
          data={this.state.chartData}
          
         
        />
     
       
  )
}
}

export default ChartReviews;
