import Link from 'next/link';
import PropTypes from 'prop-types';
import Head from 'next/head';
import stripeClient from '../client';

export async function getStaticProps() {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });
  const { data: prices } = await stripeClient.prices.list({
    active: true,
  });
    // we want the unit_amount and .product
    // isolate unit_amount from prices array, splice it into the product array
  // prices.filter(product => product.id === "such and such")
  const productsWithPrices = products.map((prod) => ({
    id: prod.id,
    images: prod.images,
    description: prod.description,
    name: prod.name,
    price: 'Ill fix this later'
  }
  ));
  return {
    props: {
      productsWithPrices,
      products
    },
  };
}

const propTypes = {
  productsWithPrices: PropTypes.arrayOf(PropTypes.object).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Home = ({ products, prices, productsWithPrices }) => {
  const numberOfProducts = products.length;
  // // eslint-disable-next-line no-console
  // console.log('prod', products);
  // // eslint-disable-next-line no-console
  // console.log('Price', prices);
  // eslint-disable-next-line no-console
  console.log(productsWithPrices);
  return (
    <div className="container mx-auto w-full">
      <Head>
        <title>NextJS and Tailwind Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-gray-200">
        <h1 className="title text-2xl w-full text-center">
          NextJS and Tailwind Starter
        </h1>
      </header>
      <main className="my-5 flex flex-col justify-center items-center">
        {/* "my-5 flex flex-col justify-center items-center" */}
        <span>
          Number of total Products from stripe:
          {numberOfProducts}
        </span>
        <ul className="items-bottom min-h-full p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
          {products.map((obj) => (
            <li key={obj.id} className=" p-4 max-w-sm rounded overflow-hidden shadow-lg border-t">
              <Link href={`/${obj.name}/${obj.id}`}>
                <a>
                  <img className="w-full " src={obj.images} alt="" />
                  <h1 className="text-center font-bold text-xl mb-2">
                    {obj.name}
                  </h1>
                  <h2>
                    <b>Description: </b>
                    {obj.description}
                  </h2>

                  <h2>
                    <b>Price:</b>
                    {obj.data}
                  </h2>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className=" bg-gray-200 mt-5 w-full flex flex-col justify-center items-center">
        <p>this is the footer</p>
      </footer>
    </div>
  );
};

Home.propTypes = propTypes;
export default Home;
