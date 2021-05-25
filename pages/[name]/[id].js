import { data } from "autoprefixer";
import PropTypes, { element, number } from "prop-types";
import { useRouter } from "next/router";
import { lte } from "lodash";
import stripeClient from "../../client";

export async function getStaticProps() {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });
  const { data: prices } = await stripeClient.prices.list({
    active: true,
  });

  const productsWithPrices = products.map((prod) => {
    const matchingPrice = prices.find((price) => price.product === prod.id);
    if (matchingPrice) {
      return {
        id: prod.id,
        images: prod.images,
        description: prod.description,
        name: prod.name,
        price: matchingPrice.unit_amount,
      };
    }
    return {
      id: prod.id,
      images: prod.images,
      description: prod.description,
      name: prod.name,
      price: 0,
    };
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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const propTypes = {
  productsWithPrices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ProductItem = ({ productsWithPrices }) => {
  const router = useRouter();
  const productArray = productsWithPrices.map((x) => x);
  const { name, id } = router.query; // Destructuring our router object

  const activeProd = productArray.find((prod) => prod.id === id);

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center shadow-lg mt-5">
        <div className="h-full w-full rounded-md object-cover max-w-lg mx-auto">
          <img
            className="max-w-md max-h-336px p-4 float-left"
            src={activeProd.images}
            alt=""
          />
        </div>
        <div className="p-5 w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h1 className="font-bold text-xl mb-2">{name}</h1>
          <h2>
            <b>Description: </b>
            {activeProd.description}
          </h2>

          <h2>
            <b>Price:</b>
            {formatter.format(`${activeProd.price}`)}
          </h2>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = propTypes;
export default ProductItem;
