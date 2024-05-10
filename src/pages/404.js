import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const NotFound = () => {
  return (
		<div style={styles.container}>
			<h1 style={styles.heading}>Oops! 404 - Page Not Found</h1>
			<p style={styles.text}>
				Sorry, the page you are looking for does not exist.
			</p>
			<p style={styles.text}>
				Return to <Link to="/">homepage</Link>.
			</p>
		</div>
	)
}

const styles={

  container : {
    fontFamily: 'Arial, sans-serif',
    // backgroundImage: url('/landing-page/banner3.jpg'), /* Change the path to your image */
    backgroundSize: 'cover', /* This ensures the image covers the whole container */
    backgroundPosition: 'center', /* This centers the image within the container */
    color: '#333',
    textAlign: 'center',
    padding: '50px',
  
  },
  
  heading :{
    fontSize: '36px',
  }
  ,
  text :{
    fontSize: '18px',
  }
  

}


export default NotFound;
