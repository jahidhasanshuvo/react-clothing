import React from 'react'
import {connect} from 'react-redux'
import {clearItemFromCart,removeItemFromCart,addItem} from '../../redux/cart/cart.action'

import './checkout-item.styles.scss'

const ChcekoutItem = ({cartItem,dispatch})=>(
    <div className="checkout-item">
        <div className="image-container">
            <img alt="item" src={cartItem.imageUrl}/>
        </div>
        <span className="name">{cartItem.name}</span>
        <span className="quantity">
            <div className="arrow" onClick={()=>dispatch(removeItemFromCart(cartItem))}>&#10094;</div>
            <span className="value">{cartItem.quantity}</span>
            <div className="arrow" onClick={()=>dispatch(addItem(cartItem))}>&#10095;</div>
        </span>
        <span className="price">${cartItem.price}</span>
        <div className="remove-button" onClick={()=>dispatch(clearItemFromCart(cartItem))}>&#10005;</div>
    </div>
)
export default connect(null)(ChcekoutItem)