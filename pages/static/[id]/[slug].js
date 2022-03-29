import React from "react";
import axios from "axios";
import Image from "next/Image";
import { slug } from "../../../helpers";

const cocktailDetail = ({
  drink: {
    strDrink,
    strDrinkThumb,
    strGlass,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    trMeasure1,
    trMeasure2,
    trMeasure3,
    trMeasure4,
  },
}) => {
  return (
    <main>
      <h1>detail of {strDrink}</h1>
      <section>
        <aside>
          <div className="imgWrapper">
            {/* <Image
              src={strDrinkThumb}
              alt={strDrink}
              width={300}
              height={450}
              layout={"responsive"}
            /> */}
          </div>
          <h2>{strDrink}</h2>
          <p>Kind of glass: {strGlass}</p>
          <p>
            Ingredients:
            {strIngredient1 ? (
              <span>
                {trMeasure1} - {strIngredient1}
              </span>
            ) : null}
            {strIngredient2 ? (
              <span>
                {trMeasure2} - {strIngredient2}
              </span>
            ) : null}
            {strIngredient3 ? (
              <span>
                {trMeasure3} - {strIngredient3}
              </span>
            ) : null}
            {strIngredient4 ? (
              <span>
                {trMeasure4} - {strIngredient4}
              </span>
            ) : null}
          </p>
          <p>
            Instructions:
            <span>{strInstructions}</span>
          </p>
        </aside>
      </section>
    </main>
  );
};

export default cocktailDetail;

export const getStaticProps = async (req) => {
  const {
    params: { id },
  } = req;
  const { data: drink } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  return {
    props: { drink },
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
    paths: drinks.map(({ idDrink, strDrink }) => ({
      params: { id: idDrink, slug: slug(strDrink) },
    })),

    fallback: "blocking",
  };
};
