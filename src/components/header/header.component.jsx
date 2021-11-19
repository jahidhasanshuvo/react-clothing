import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg.svg'
import './header.styles.scss'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCurrentUser} from '../../redux/user/user.selector'
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {createStructuredSelector} from 'reselect'
// import {useEffect} from 'react'

const Header = ({currentUser,hidden})=>{
    // useEffect(()=>console.log(currentUser))

    return(
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"></Logo>
        </Link>
        <div className="options">
            <Link to='/shop' className="option">
                SHOP
            </Link>
            <Link to='/contact' className="option">
                CONTACT
            </Link>
            {
                currentUser?(<div className="option" onClick={()=>auth.signOut()}>
                    SIGN Out
                </div>):
                (<Link to='/signin' className="option">
                    SIGN IN
                </Link>)
            }
            <CartIcon/>
        </div>
        {hidden?null:<CartDropdown/>}
    </div>
)}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden:selectCartHidden
})
export default connect(mapStateToProps)(Header)