import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "@yene_movie_favorites";

type FavoritesContextValue = {
  favorites: Movie[];
  ready: boolean;
  isFavorite: (movieId: number) => boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const withFavoriteFlag = (movie: Movie): Movie => ({
  ...movie,
  isFavorite: true,
});

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [ready, setReady] = useState(false);
  const loadingRef = useRef(false);

  const persistFavorites = useCallback(async (next: Movie[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.error("Failed to persist favorites", error);
    }
  }, []);

  const updateFavorites = useCallback(
    (updater: (prev: Movie[]) => Movie[]) => {
      setFavorites((prev) => {
        const next = updater(prev);
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites],
  );

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Movie[] = JSON.parse(stored);
          setFavorites(parsed.map(withFavoriteFlag));
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
      } finally {
        setReady(true);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = useCallback(
    (movie: Movie) => {
      if (!ready) return;
      updateFavorites((prev) => {
        if (prev.some((item) => item.id === movie.id)) return prev;
        return [...prev, withFavoriteFlag(movie)];
      });
    },
    [updateFavorites, ready],
  );

  const removeFavorite = useCallback(
    (movieId: number) => {
      if (!ready) return;
      updateFavorites((prev) => prev.filter((item) => item.id !== movieId));
    },
    [updateFavorites, ready],
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (!ready) return;
      updateFavorites((prev) => {
        const exists = prev.some((item) => item.id === movie.id);
        if (exists) {
          return prev.filter((item) => item.id !== movie.id);
        }
        return [...prev, withFavoriteFlag(movie)];
      });
    },
    [updateFavorites, ready],
  );

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((movie) => movie.id === movieId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      ready,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, ready, isFavorite, addFavorite, removeFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export default FavoritesProvider;
