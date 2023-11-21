import { Link } from "react-router-dom";
import { MovieProps } from "../../../@types";

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  const formatDate: (inputDate: string | undefined) => string = (
    inputDate: string | undefined
  ) => {
    const date = new Date(inputDate || "");
    return new Intl.DateTimeFormat("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div
      key={movie.id}
      className='min-w-[15rem] min-h-[32rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden'
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className='min-h-[27.8rem] object-cover'
        />
      </Link>
      <div className='p-2 text-base'>
        <Link to={`/movie/${movie.id}`}>
          <h3 className='font-semibold'>{movie.title}</h3>
        </Link>
        <span>{formatDate(movie.release_date)}</span>
      </div>
    </div>
  );
};

export default MovieCard;
