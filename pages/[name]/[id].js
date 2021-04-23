import { data } from 'autoprefixer';
import PropTypes, { number } from 'prop-types';
import { useRouter } from 'next/router';
import stripeClient from '../../client';

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

export async function getStaticPaths() {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });
  const paths = products.map((product) => ({
    params: {
      id: product.id,
      name: product.name
    }
  }));

  return {
    paths,
    fallback: false
  };
}

const propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ProductItem = ({ products }) => {
  // eslint-disable-next-line react/prop-types
  const numberOfProducts = products.length;
  const router = useRouter();
  const productArray = products.map((x) => x);
  const { name, id } = router.query; // Destructuring our router object
  // eslint-disable-next-line no-console
  console.log('Product Array: ', productArray);
  // eslint-disable-next-line no-console
  console.log('route id', id);
  // eslint-disable-next-line no-console
  console.log(numberOfProducts);
  // eslint-disable-next-line no-console
  console.log(productArray.length);

  // should this be a forEach? No, forEach does not return a value. For loop
  // doesn't work for some reason. Find out why. While also doesn't want to iterate.
  // Figure out what I'm doing wrong with the loop.
  const i = 0;
  while (i < numberOfProducts) {
    if (id === productArray[i].id) {
      // eslint-disable-next-line no-console
      console.log(i);
      return (
        <div>
          <img className="w-75 " src={productArray[i].images} alt="" />
          <h1 className="text-center font-bold text-xl mb-2">
            {productArray[i].name}
          </h1>
          <h2>
            <b>Description: </b>
            {productArray[i].description}
          </h2>

          <h2>
            <b>Price:</b>
            {productArray[i].data}
          </h2>
        </div>
      );
    // eslint-disable-next-line no-console
    } console.log(i);
    return (i + 1);
  }
};

ProductItem.propTypes = propTypes;
export default ProductItem;

// import React from "react";
// import PropTypes from "prop-types";
// import stripeClient from "../../client";

// export async function getStaticProps() {
//   const { data: products } = await stripeClient.products.list({
//     active: true,
//   });

//   return {
//     props: {
//       products,
//     },
//   };
// }

// const propTypes = {
//   products: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// const Product = ({ products }) => {
//   // eslint-disable-next-line no-console
//   console.log(products);
//   return (
//     <ul>
//       Product
//       <li>
//         {products.map((obj) => {
//           // eslint-disable-next-line no-console
//           console.log(obj);
//           return (
//             <ul>
//               <li>{obj.name}</li>
//               <li>{obj.description}</li>
//             </ul>
//           );
//         })}
//       </li>
//     </ul>
//   );
// };
// Product.propTypes = propTypes;
// export default Product;
