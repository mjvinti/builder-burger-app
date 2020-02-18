import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Max Schwarzmuller',
        address: {
          street: 'Teststreet 1',
          zipCode: '42351',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="your name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="your email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="your street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="postal code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;