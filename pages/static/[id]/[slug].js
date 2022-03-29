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
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
  },
}) => {
  return (
    <main>
      <h1>detail of {strDrink}</h1>
      <section>
        <aside className="detailAside">
          <div className="imgWrapperDetail">
            <Image
              src={strDrinkThumb}
              alt={strDrink}
              width={300}
              height={450}
              layout={"responsive"}
              priority
            />
          </div>
          <h2>{strDrink}</h2>
          <p>
            Kind of glass:
            <br /> <span>{strGlass}</span>
          </p>
          <p>
            Ingredients:
            <br />
            {strIngredient1 ? (
              <>
                <span>
                  {strMeasure1} - {strIngredient1}
                </span>
                <br />
              </>
            ) : null}
            {strIngredient2 ? (
              <>
                <span>
                  {strMeasure2} - {strIngredient2}
                </span>
                <br />
              </>
            ) : null}
            {strIngredient3 ? (
              <>
                <span>
                  {strMeasure3} - {strIngredient3}
                </span>
                <br />
              </>
            ) : null}
            {strIngredient4 ? (
              <>
                <span>
                  {strMeasure4} - {strIngredient4}
                </span>
                <br />
              </>
            ) : null}
          </p>
          <p>
            Instructions:
            <br />
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
    props: { drink: drink.drinks[0] },
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
