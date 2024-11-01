import { useQuery } from "@apollo/client";
import { FAVORITE_BOOKS } from "../queries";

const Favourties = ({ show }) => {
  const res = useQuery(FAVORITE_BOOKS);

  if (!show) return null;

  if (res.loading) return <div>loading...</div>;

  const books = res.data.favoriteBooks.books;
  const genre = res.data.favoriteBooks.genre;

  return (
    <div>
      <h2>favorite books</h2>
      <p>
        Books in your favorite category <b>{genre}</b>
      </p>
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
    </div>
  );
};

export default Favourties;
