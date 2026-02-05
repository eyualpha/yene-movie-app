import { Client, Databases, Query, ID } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie?: Movie) => {
  if (!query || !movie) return;

  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", query)]
    );

    // If search term already exists → increment count
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        {
          count: (doc.count ?? 0) + 1,
          movie_id: movie.id,
          title: movie.title,
          poster_url: movie.poster_path,
        }
      );
    } else {
      // Otherwise → create new search record
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          count: 1,
          movie_id: movie.id,
          title: movie.title,
          poster_url: movie.poster_path,
        }
      );
    }
  } catch (error) {
    console.error("Failed to update search count:", error);
  }
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(30),
    ]);

    return result.documents.map((doc: any) => ({
      id: doc.movie_id,
      title: doc.title,
      adult: false,
      backdrop_path: doc.poster_url ?? "",
      genre_ids: [],
      original_language: "en",
      original_title: doc.title,
      overview: "",
      popularity: doc.count ?? 0,
      poster_path: doc.poster_url ?? "",
      release_date: "",
      video: false,
      vote_average: 0,
      vote_count: doc.count ?? 0,
      isFavorite: false,
    }));
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return [];
  }
};
