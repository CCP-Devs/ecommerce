import Link from 'next/link';
import PropTypes from 'prop-types';
import Head from 'next/head';
import stripeClient from '../client';

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

const Home = ({ products }) => {
  const numberOfProducts = products.length;
  // eslint-disable-next-line no-console
  console.log(products);
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
          {products.map((obj) => {
            // eslint-disable-next-line no-console
            console.info('Product Objects from Stripe: ', obj);
            return (
              <li className=" p-4 max-w-sm rounded overflow-hidden shadow-lg border-t">
                <Link href="/product" props={products}>
                  <div>
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
                  </div>
                </Link>
              </li>
            );
          })}
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
