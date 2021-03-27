import PropTypes from "prop-types";
import Head from "next/head";
import stripeClient from "../client";

export const getStaticProps = async () => {
  const { data: products } = await stripeClient.products.list({
    active: true,
  });

  return {
    props: {
      products,
    },
  };
};

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
      <header>
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
        <div className=" p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
          {products.map((obj) => {
            // eslint-disable-next-line no-console
            console.info("Product Objects from Stripe: ", obj);
            return (
              <ul className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src={`${obj.images}`} alt="" />
                <li className="text-center font-bold text-xl mb-2">{` ${obj.name}`}</li>
                <li>
                  <b>Description:</b>
                  {` ${obj.description}`}
                </li>
                <li>
                  <b>Price:</b>
                  {` ${obj.data}`}
                </li>
              </ul>
            );
          })}
        </div>
      </main>
      <footer className="mt-5 w-full flex flex-col justify-center items-center">
        <p>this is the footer</p>
      </footer>
    </div>
  );
};

Home.propTypes = propTypes;
export default Home;
