import React , {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';

class Footer extends Component {

	render() {

		return(
			
            <div>
                <h3 align="center" class="pageerror">You've ripped a hole in the fabric of the internet. Love, Fandango Team..</h3>
                <img src="https://css-tricks.com/images/404.jpg" alt="Page Not Found (404)." className="errorimage"/>

            </div>

      
		)
	}
}

export default withRouter(Footer);

