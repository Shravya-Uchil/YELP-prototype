import React, { Component } from "react";
import { Card, Modal, Button, Col, Row } from "react-bootstrap";

class Item extends Component {
  constructor(props) {
    super(props);
    this.setState({
      showModal: false,
      itemQty: 1,
    });
    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onClose = (e) => {
    this.setState({
      showModal: false,
    });
  };

  onQuantityChange = (e) => {
    let quantity = parseInt(e.target.value);
    this.setState({
      itemQty: quantity,
    });
  };

  addToCart = (e) => {
    let item_id = this.props.menu_item.item_id;
    let cartList = [];

    if (
      parseInt(localStorage.getItem("selected_restaurant_id")) !==
      this.props.menu_item.restaurant_id
    ) {
      localStorage.setItem("cart_list", cartList);
    }

    if (localStorage.getItem("cart_list")) {
      cartList.push(...JSON.parse(localStorage.getItem("cart_list")));
    }

    let index = cartList.findIndex((cart) => cart.item_id === item_id);
    if (index === -1) {
      cartList.push({
        item_id: item_id,
        item_quantity: this.state.itemQty || 1,
        item_price: this.props.menu_item.item_price,
        item_name: this.props.menu_item.item_name,
      });
      //localStorage.setItem("cart_res_id", this.props.menu_item.res_id);
      localStorage.setItem("cart_list", JSON.stringify(cartList));
      this.setState({
        showModal: false,
        itemQty: 1,
      });
    }
  };

  removeFromCart = (e) => {
    let item_id = this.props.menu_item.item_id;
    let cartList = [];

    if (localStorage.getItem("cart_list")) {
      cartList.push(...JSON.parse(localStorage.getItem("cart_list")));
    }

    let index = cartList.findIndex((cart) => cart.item_id === item_id);
    if (index !== -1) {
      cartList.splice(index, 1);
      localStorage.setItem("cart_items", JSON.stringify(cartList));
      this.setState({
        itemQty: 0,
      });
    }
  };

  render() {
    let cartItems = [];
    let cartItemIds = [];
    let buttonClick = this.openModal;
    let showModal = false;
    if (localStorage.getItem("cart_items")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart_items")));
      cartItemIds = cartItems.map((cartItem) => cartItem.item_id);
      //buttonText = cartItemIds.includes(this.props.menu_item.item_id)
      //? "Remove from Cart"
      //: buttonText;
      //buttonVariant = cartItemIds.includes(this.props.menu_item.item_id)
      //? "warning"
      //: buttonVariant;
      //buttonClick = cartItemIds.includes(this.props.menu_item.item_id)
      //? this.removeFromCart
      //: this.openModal;
    }
    if (this.state) {
      showModal = this.state.showModal;
    }

    return (
      <div>
        <Card bg="white" style={{ width: "50rem", margin: "2%" }}>
          <Row>
            <Col>
              <Card.Img
                style={{ width: "12rem", height: "9rem" }}
                alt=""
                src={"http://localhost:3001/yelp/images/item/item_default.png"}
              />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{this.props.menu_item.item_name}</Card.Title>
                <Card.Text>{this.props.menu_item.item_description}</Card.Text>
                <Card.Text>
                  Price: $ {this.props.menu_item.item_price}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col align="right">
              <br />
              <br />
              <Button
                variant="primary"
                onClick={this.openModal}
                name={this.props.menu_item.item_id}
              >
                Add to Cart
              </Button>
              &nbsp; &nbsp;
              <Button
                variant="primary"
                onClick={this.removeFromCart}
                name={this.props.menu_item.item_id}
              >
                Remove from Cart
              </Button>
            </Col>
          </Row>
        </Card>
        <Modal show={showModal} onHide={this.onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.menu_item.item_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <img
                src="http://localhost:3001/yelp/images/item/item_default.png"
                width="100%"
                alt=""
              />
              <p>{this.props.menu_item.item_description}</p>
              Quantity:{" "}
              <input
                type="number"
                name={this.props.menu_item.item_id}
                min="1"
                max="20"
                width="10%"
                onChange={this.onQuantityChange}
                defaultValue="1"
                autofocus
              ></input>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addToCart}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Item;