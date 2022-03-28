import React from "react";
import axios from "axios";
import Image from "next/Image";
import { slug } from "../../../helpers";

const cocktailDetail = ({ drink: { strDrink, strDrinkThumb } }) => {
  return (
    <main>
      <h1>detail of {strDrink}</h1>

      <div className="imgWrapper">
        <Image
          src={strDrinkThumb}
          alt=""
          width={300}
          height={450}
          layout={"responsive"}
        />
      </div>
      <h2>{strDrink}</h2>
    </main>
  );
};

export default cocktailDetail;

export const getStaticProps = async (req) => {
  const {
    params: { id, slug },
  } = req;
  const { data: drink } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
  );
  return {
    props: {
      drink,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const {
    data: { drinks },
  } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
  );
  return {
    paths: [
      drinks.map(({ idDrink, strDrink }) => ({
        params: { id: idDrink, slug: slug(strDrink) },
      })),
    ],
    fallback: "blocking",
  };
};
