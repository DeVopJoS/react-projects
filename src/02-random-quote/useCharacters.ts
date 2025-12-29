import { useEffect, useState } from "react";
import type {
  Character,
  CharacterResponse,
} from "./interfaces/CharacterInterface";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[] | []>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Error fetching characters");
        }

        const data: CharacterResponse = await response.json();
        setCharacters(data.results);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setError("Error to load Characters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return {
    characters,
    isLoading,
    error,
    pages,
    currentPage,
    totalPages,

    handleNext,
    handlePrev,
    setCurrentPage,
  };
};

export default useCharacters;
