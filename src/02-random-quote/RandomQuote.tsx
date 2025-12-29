import { Skeleton } from "@/components/ui/skeleton";
import useCharacters from "./useCharacters";
import CharacterCard from "./components/CharacterCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CharactersLoading = () => {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-80 w-full rounded-xl" />
          <div className="space-y-2 flex flex-row justify-evenly">
            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
      ))}
    </section>
  );
};

const RandomQuote = () => {
  const {
    characters,
    currentPage,
    error,
    isLoading,
    pages,
    totalPages,

    setCurrentPage,
    handlePrev,
    handleNext,
  } = useCharacters();

  if (error) {
    return (
      <div>
        <h1 className="text-2xl">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E3239] p-8">
      <header className="mb-10 text-center">
        {isLoading ? (
          <Skeleton className="text-4xl font-bold text-white" />
        ) : (
          <h1 className="text-4xl font-bold text-white">Rick and Morty</h1>
        )}
      </header>

      {isLoading ? (
        <CharactersLoading />
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((item) => (
            <CharacterCard key={item.id} character={item} />
          ))}
        </section>
      )}

      <Pagination className="text-white">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RandomQuote;
