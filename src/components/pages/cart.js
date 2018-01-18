"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component{

  onDelete(_id) {
    const currentBookToDelete = this.props.cart
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart) {
        return cart._id === _id;
      }
    )

    let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id) {
    this.props.updateCart(_id);
  }

  onDecrement() {

  }
  render() {
    if(this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty()
    }
  }
  renderEmpty(){
    return(<div></div>);
  }

  renderCart() {
    const cartItemsList = this.props.cart.map(function(cartArr) {
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>     </span>
            </Col>
             <Col xs={12} sm={2}>
              <h6>{cartArr.price}</h6>
            </Col>
             <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{minWidth:'300px'}}>
                <Button bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return(
      <Panel bsStyle="primary">
        <Panel.Heading>Cart</Panel.Heading>
        {cartItemsList}
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return{
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCartItem: deleteCartItem,
    updateCart: updateCart,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);