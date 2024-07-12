"use server";
import Image from "next/image";

const GET_PASSENGERS = `
 query getPassangers{
  titanics(pagination:{pageSize:200}) {
    meta{
      pagination{
        total
      }
    }
    data{
      id
       attributes{
        name
        age
        survived
        pClass
        Gender
      }
    }
  }
}
`;

export default async function Home() {
  const data = await fetch("http://localhost:1337/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: GET_PASSENGERS,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${process.env.API_KEY}` ,
    },
  }).then((res) => res.json());
  // console.log(data?.data?.titanics?.data);

  return (
    <main>
      <h3>Server Component</h3>
      <br />
      <div>
        <ul>
          {data?.data?.titanics?.data?.map((item: any, index: number) => (
            <li key={item.attributes?.name}>
              {index + 1}. {item.attributes?.name} -{" "}
              {item?.attributes?.survived ? "Survived" : "Not Survived"}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
