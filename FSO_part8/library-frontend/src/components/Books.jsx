import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const { data, loading, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  useEffect(() => {
    refetch();
  }, [genre, refetch]);
  if (!props.show) {
    return null;
  }
  if (loading) return <div>Loading...</div>;
  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre("horror")}>horror</button>
        <button onClick={() => setGenre("romance")}>romance</button>
        <button onClick={() => setGenre("factual")}>factual</button>
        <button onClick={() => setGenre(null)}>All</button>
      </div>
    </div>
  );
};

export default Books;
