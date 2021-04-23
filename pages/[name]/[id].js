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

  const activeProd = productArray.filter((prod) => prod.id === id);

  return (
    <div>
      <img className="w-75 " src={activeProd[0].images} alt="" />
      <h1 className="text-center font-bold text-xl mb-2">
        {activeProd[0].name}
      </h1>
      <h2>
        <b>Description: </b>
        {activeProd[0].description}
      </h2>

      <h2>
        <b>Price:</b>
        {activeProd[0].data}
      </h2>
    </div>
  );
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
