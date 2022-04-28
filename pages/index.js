import React from "react";
import { client } from "../lib/client";

import { Product, HeroBanner, FooterBanner } from "../components";

const Home = ({ products, banner }) => {
  return (
    <>
      <HeroBanner heroBanner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banner && banner[1]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const productsData = await client.fetch(productsQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products: productsData,
      banner: bannerData,
    },
  };
};

export default Home;
