import React from 'react'
import './cart-dropdown.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import {connect} from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selector'
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../../redux/cart/cart.action'


const CartDropdown = ({cartItems,history,dispatch})=>(
    <div className="cart-dropdown">
        <div className="cart-items">
            {cartItems.length?cartItems.map(
                cartItem => <CartItem item={cartItem} key={cartItem.id}></CartItem>
            ):<div className="empty-message">No Item Selected</div>}
        </div>
        <CustomButton onClick={()=>{
            history.push('/checkout')
            dispatch(toggleCartHidden())
        }}>Go To Checkout</CustomButton>
    </div>
)
const mapStateToProps=(state)=>({
    cartItems:selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown))