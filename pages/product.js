import React from "react";
import PropTypes from "prop-types";
import stripeClient from "../client";

export async function getStaticProps() {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });

  return {
    props: {
      products,
    },
  };
}

const propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Product = ({ products }) => {
  // eslint-disable-next-line no-console
  console.log(products);
  return (
    <ul>
      Product
      <li>
        {products.map((obj) => {
          // eslint-disable-next-line no-console
          console.log(obj);
          return (
            <li>
              {obj.name}
            </li>
          );
        })}
      </li>
    </ul>
  );
};
Product.propTypes = propTypes;
export default Product;
