import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import {Route,Redirect} from 'react-router-dom'
import ShopPage from './pages/shop/shopPage.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import './App.css'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.action'
import Checkout from './pages/checkout/checkout.component';
class App extends React.Component{
  
  unsubscribeFromAuth = null;  
  componentDidMount(){
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef =await createUserProfileDocument(userAuth);
        userRef.onSnapshot(
          snapshot => {
            setCurrentUser({
                  id:snapshot.id,
                  ...snapshot.data()
                })
          })
      }
      setCurrentUser(userAuth)
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header></Header>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/Shop" component={ShopPage}></Route>
        <Route exact path="/SignIn" render={()=>this.props.currentUser?<Redirect to="/"/>:<SignInAndSignUpPage/>}></Route>
        <Route exact path="/Checkout" component={Checkout}></Route>
      </div>
    );
  }
}

const mapStateToProps = ({user,cart}) =>({
  currentUser:user.currentUser
})

const mapDispatchToProps= dispatch =>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
