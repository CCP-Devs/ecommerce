import { data } from "autoprefixer";
import PropTypes, { number } from "prop-types";
import { useRouter } from "next/router";
import stripeClient from "../../client";

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
    price: "",
  }));
  productsWithPrices.forEach((prod) => {
prod.price = 20;
  });

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

const propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  productsWithPrices: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ProductItem = ({ productsWithPrices, products }) => {
  console.log("withprices", productsWithPrices, "products", products);
  // eslint-disable-next-line react/prop-types
  const numberOfProducts = productsWithPrices.length;
  const router = useRouter();
  const productArray = productsWithPrices.map((x) => x);
  const { name, id } = router.query; // Destructuring our router object
  // eslint-disable-next-line no-console
  console.log("Product Array: ", productArray);
  // eslint-disable-next-line no-console
  console.log('route id', 'prod id', productArray.id);
  // eslint-disable-next-line no-console
  console.log(numberOfProducts);
  // eslint-disable-next-line no-console
  console.log(productArray.length);

  productArray.forEach((prod) => console.log("shom", prod.id));

  const activeProd = productArray.filter((prod) => prod.id === id);
  // {
  //   for (let i = 0; i < prod.length; i + 1)
  //   { if (prod[i].id === id) return prod[i].id; }
  // });
  console.log(activeProd);

  return (
    <div>
      {console.log("active", activeProd)}
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
        {` $${activeProd[0].price}`}
      </h2>
    </div>
  );
};

ProductItem.propTypes = propTypes;
export default ProductItem;
