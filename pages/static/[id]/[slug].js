import React from "react";
import axios from "axios";
import Image from "next/Image";
import { slug } from "../../../helpers";

const cocktailDetail = ({ drinks }) => {
  return (
    <main>
      <h1>detail of alcoholic Cocktail</h1>
      <section>
        {drinks.length > 0 &&
          drinks.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <aside className="card" key={idDrink}>
              <div className="cocktailWrapper">
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
              </div>
            </aside>
          ))}
      </section>
    </main>
  );
};

export default cocktailDetail;

export const getStaticProps = async (req) => {
  const {
    params: { id, slug },
  } = req;
  const { data: drinks } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
  );
  return {
    props: {
      drinks,
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
