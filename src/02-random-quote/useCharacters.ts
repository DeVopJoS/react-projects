import { useEffect, useState } from "react";
import type {
  Character,
  CharacterResponse,
} from "./interfaces/CharacterInterface";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[] | []>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character",
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
  }, []);

  return {
    characters,
    isLoading,
    error,
  };
};

export default useCharacters;
