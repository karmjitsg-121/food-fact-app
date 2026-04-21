import React, { Component } from "react";

class ClassFoodCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBrand: false,
    };
  }

  componentDidMount() {
    console.log("ClassFoodCard Mounted");
  }

  componentWillUnmount() {
    console.log("ClassFoodCard Unmounted");
  }

  toggleBrand = () => {
    this.setState({
      showBrand: !this.state.showBrand,
    });
  };

  render() {
    const { product } = this.props;

    return (
      <div
        className="card"
        onClick={this.toggleBrand}
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            product.image_small_url ||
            "https://via.placeholder.com/100"
          }
          alt={product.product_name}
        />

        <h3>{product.product_name}</h3>

        {this.state.showBrand && (
          <p>{product.brands}</p>
        )}
      </div>
    );
  }
}

export default ClassFoodCard;