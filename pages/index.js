import Image from "next/image";
import Link from "next/link";
import react from "react";
import axios from "axios";
import { slug } from "../helpers";

export default function staticPage({ drinks }) {
  return (
    <main>
      <h1>List of alcoholic Cocktails</h1>
      <section>
        {drinks.length > 0 &&
          drinks.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <Link key={idDrink} href={`/static/${idDrink}/${slug(strDrink)}`}>
              <a>
                <aside className="card">
                  <div className="cocktailWrapper">
                    <h2>{strDrink}</h2>
                    <div className="imgWrapper">
                      <Image
                        src={strDrinkThumb}
                        alt=""
                        width={483}
                        height={483}
                        layout={"responsive"}
                        priority={true}
                      />
                    </div>
                  </div>
                </aside>
              </a>
            </Link>
          ))}
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const {
    data: { drinks },
  } = await axios(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
  );
  return {
    props: {
      drinks,
    },
    revalidate: 10, //ISRG
  };
}
