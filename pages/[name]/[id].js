import { data } from 'autoprefixer';
import PropTypes, { number } from 'prop-types';
import { useRouter } from 'next/router';
import stripeClient from '../../client';
import { lte } from 'lodash';

export async function getStaticProps() {
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
    price: '',
  }));

  function integratePrice() {
    for (let i = 0; i < productsWithPrices.length; i++) {
      const matchingPrice = prices.filter((price) => price.product === productsWithPrices[i].id);
      if (matchingPrice[0] === undefined) {
        matchingPrice[0] = { unit_amount: null };
      }
      console.log('match', i, matchingPrice[0].unit_amount);
      productsWithPrices[i].price = matchingPrice[0].unit_amount;
      console.log('sucess', productsWithPrices[i].price);
    }
  }
  integratePrice();

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

  function integratePrice() {
    for (let i = 0; i < productsWithPrices.length; i++) {
      const matchingPrice = prices.filter((price) => price.product === productsWithPrices[i].id);
      if (matchingPrice[0] === undefined) {
        matchingPrice[0] = { unit_amount: null };
      }
      productsWithPrices[i].price = matchingPrice[0].unit_amount;
    }
  }
  integratePrice();

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

const ProductItem = ({ productsWithPrices, products }) => {
  const numberOfProducts = productsWithPrices.length;
  const router = useRouter();
  const productArray = productsWithPrices.map((x) => x);
  const { name, id } = router.query; // Destructuring our router object

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
        {formatter.format(`${activeProd[0].price}`)}
      </h2>
    </div>
  );
};

ProductItem.propTypes = propTypes;
export default ProductItem;
