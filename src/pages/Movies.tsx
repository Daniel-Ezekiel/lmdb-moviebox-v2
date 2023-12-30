import { MovieProps, TVProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getByURL } from "../../api/allFetches";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import SkeletonCard from "../components/global/SkeletonCard";
import MovieTvCard from "../components/global/MovieTvCard";
import { useState } from "react";

const Movies = () => {
  const { category } = useParams();
  const [currPage, setCurrPage] = useState(1);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: () => getByURL("movie", category?.split("-").join("_")),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  console.log(!isFetching && data);

  // const movies: React.ReactNode[] = data?.results.map(
  //   (movieOrTv: MovieProps | TVProps) => (
  //     <MovieTvCard key={movieOrTv.id} type='movie' movieOrTv={movieOrTv} />
  //   )
  // );

  return (
    <></>
    // <MainLayout showHeader={true} activePage='movies' showFooter={true}>
    //   <section className='max-w-[124rem] mx-auto p-3 pt-6 md:pt-[5rem]'>
    //     <h1 className='flex gap-2 font-semibold text-4xl'>
    //       Movies{" "}
    //       <span className='w-fit font-normal text-sm text-rose'>
    //         {category?.split("-").join(" ")}
    //       </span>
    //     </h1>
    //   </section>

    //   <section className='max-w-[124rem] mx-auto p-3 grid justify-center xsm:grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
    //     {isError && (
    //       <div className='col-span-full max-w-[124rem] mx-auto p-3'>
    //         Error! Could not fetch {category?.split("-").join(" ")} movies
    //       </div>
    //     )}

    //     {isLoading &&
    //       Array(20)
    //         .fill("")
    //         .map((_, i) => <SkeletonCard key={i} />)}

    //     {!isLoading && movies}
    //   </section>
    // </MainLayout>
  );
};

export default Movies;
