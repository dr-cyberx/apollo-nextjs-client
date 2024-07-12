"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_PASSENGERS = gql`
  query getPassangers {
    titanics(pagination: { pageSize: 200 }) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
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

const Page: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PASSENGERS);
  // attributes

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Failed to fetch </>
  }

  return (
    <>
      <h3>Client Component</h3>
      <br />
      <ul>
        {data?.titanics?.data.map((item: any, index: number) => (
          <li key={item.attributes?.name}>
            {index + 1}. {item.attributes?.name} -{" "}
            {item?.attributes?.survived ? "Survived" : "Not Survived"}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
