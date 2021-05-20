import { data } from 'autoprefixer';
import PropTypes, { element, number } from 'prop-types';
import { useRouter } from 'next/router';
import { lte } from 'lodash';
import stripeClient from '../../client';

export async function getStaticProps() {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });
  const { data: prices } = await stripeClient.prices.list({
    active: true,
  });

  const productsWithPrices = products.map((prod) => (
    {
      id: prod.id,
      images: prod.images,
      description: prod.description,
      name: prod.name,
      price: '',
    }));
  function iteratePrice() {
    for (let i = 0; i < prices.length; i++) {
      console.log('price prod id', i, prices[i].product);
}
  }
  iteratePrice();

// element i 0 prod_JDwjHwh6RXgxvK is price i 2
// element i 1 prod_JDwhONLZFRdITf is price i 3
// element i 2 prod_JDweYG3kdQvs57 is price i 4
// element i 3 prod_JDwcPoNLuSYoDZ is price i 5
// element i 4 prod_JC6IXQUtT0DQLk is price i 6
// element i 5 prod_JC69bPRlYGhXHZ is price i 7
// element i 6 prod_JC673zZjKiK8Z5 is price i 8
// element i 7 prod_JC3m60KgDmQTKY is price i 9
// element i 8 prod_JBcfp1oqmtcIq6 is price i undefined
// price index 0 and 1 do not correspond with a logged element
// price index 0 is prod_JWN87VaJBKBz2O which is an archived product
// price index 1 is prod_JDwqPjT4LIWnkB which is an archived product
// Q why are archived products still showing up in the price array?
// archived products are causing an undefined element to return, breaking code

  productsWithPrices.forEach((element) => {
    const matchingPrice = prices.find((price) => price.product === element.id);
    element.price = matchingPrice.unit_amount;
  });

  // function integratePrice() {
  //   for (let i = 0; i < productsWithPrices.length; i++) {
  //     let matchingPrice = prices.find((price) => price.product === productsWithPrices[i].id);
  //     console.log(productsWithPrices.length);
  //     if (matchingPrice === undefined) {
  //       matchingPrice = { unit_amount: null };
  //     }
  //     productsWithPrices[i].price = matchingPrice.unit_amount;
  //     // console.log('match', i, matchingPrice.unit_amount);
  //     // console.log('sucess', productsWithPrices.price);
  //   }
  // }
  // integratePrice();

  return {
    props: {
      products,
      prices,
      productsWithPrices,
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });
  const { data: prices } = await stripeClient.prices.list({
    active: true,
  });
  const productsWithPrices = products.map((prod) => ({
    id: prod.id,
    images: prod.images,
    description: prod.description,
    name: prod.name,
    price: 20,
  }));

  const paths = productsWithPrices.map((product) => ({
    params: {
      id: product.id,
      name: product.name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  productsWithPrices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ProductItem = ({ productsWithPrices }) => {
  const router = useRouter();
  const productArray = productsWithPrices.map((x) => x);
  const { name, id } = router.query; // Destructuring our router object

  const activeProd = productArray.find((prod) => prod.id === id);

  return (
    <div>
      <img className="w-75 " src={activeProd.images} alt="" />
      <h1 className="text-center font-bold text-xl mb-2">
        {name}
      </h1>
      <h2>
        <b>Description: </b>
        {activeProd.description}
      </h2>

      <h2>
        <b>Price:</b>
        {formatter.format(`${activeProd.price}`)}
      </h2>
    </div>
  );
};

ProductItem.propTypes = propTypes;
export default ProductItem;
