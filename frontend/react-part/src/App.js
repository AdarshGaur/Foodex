import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/Navbar/pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './components/Navbar/pages/LogIn';
import SignUp from './components/Navbar/pages/SignUp';
import Otp from './components/Navbar/pages/Otp';
import Profile from './components/Profile/Profile'
import AddRecipe from './components/Blogposts/AddRecipe/AddRecipe'
import ReadRecipe from './components/Blogposts/ReadRecipe/ReadRecipe'
import Starters from './components/Categories/Starters'
import MainCourse from './components/Categories/MainCourse'
import Drinks from './components/Categories/Drinks'
import Desserts from './components/Categories/Desserts'
import Others from './components/Categories/Others'
import SearchPage from './containers/SearchPage/SearchPage';
import FollowersList from './containers/FollowersList/FollowersList';
import ForgotPassword from './components/Navbar/pages/ForgotPass/ForgotPassword';
import ForgotOtp from './components/Navbar/pages/ForgotPass/ForgotOtp';
import PasswordReset from './components/Navbar/pages/ForgotPass/PasswordReset';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />

        {/* <Route path='/contact-us' component={ContactUs} /> */}
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={LogIn} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/forgot-otp' component={ForgotOtp} />
        <Route path='/change-password' component={PasswordReset} />
        <Route path='/profile' component={Profile} />
        <Route path='/otp' component={Otp} />
        <Route path='/add-recipe' component={AddRecipe} />
        <Route path='/read-recipe' component={ReadRecipe} />
        <Route path='/starters' component={Starters} />
        <Route path='/drinks-smoothies' component={Drinks} />
        <Route path='/desserts' component={Desserts} />
        <Route path='/main-course' component={MainCourse} />
        <Route path='/others' component={Others} />
        <Route path='/search-page' component={SearchPage} />
        {/* <Route path='/followers' component={FollowersList} /> */}
        {/* <Route path='/search-page/:searchTerm' component={SearchPage}/> */}

      </Switch>
      <NotificationContainer />
    </Router>


    
  );
}

export default App;



// import React from 'react';
// import 'react-notifications/lib/notifications.css';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
 
// class App extends React.Component {
//   createNotification = (type) => {
//     return () => {
//       switch (type) {
//         case 'info':
//           NotificationManager.info('Info message');
//           break;
//         case 'success':
//           NotificationManager.success('Success message', 'Title here');
//           break;
//         case 'warning':
//           NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
//           break;
//         case 'error':
//           NotificationManager.error('Error message', 'Click me!', 5000, () => {
//             alert('callback');
//           });
//           break;
//       }
//     };
//   };
 
//   render() {
//     return (
//       <div>
//         <button className='btn btn-info'
//           onClick={this.createNotification('info')}>Info
//         </button>
//         <hr/>
//         <button className='btn btn-success'
//           onClick={this.createNotification('success')}>Success
//         </button>
//         <hr/>
//         <button className='btn btn-warning'
//           onClick={this.createNotification('warning')}>Warning
//         </button>
//         <hr/>
//         <button className='btn btn-danger'
//           onClick={this.createNotification('error')}>Error
//         </button>
 
//         <NotificationContainer/>
//       </div>
//     );
//   }
// }
 
// export default App;

