import * as util from "./utils";
import { JsonResponse, TrackMetaData } from "./sharedTypes";

/**
 * Fetch JSON data from the music search API.
 *
 * @param query - The search query.
 * @returns A Promise that resolves to a JSON response.
 * @throws An error if the network request fails.
 */

export const getJSON = async (query: string): Promise<JsonResponse> => {
	// limits the search to 5 entries, no next support for now
	const apiEndpoint =
		"https://jiosaavn-api-privatecvc2.vercel.app/search/songs?limit=5&query=";
	const apiURL = apiEndpoint + query;

	try {
		const result = await fetch(apiURL, { mode: "cors" });

		if (!result.ok)
			throw new Error(
				`Network response: ${result.status} - ${result.statusText}`,
			);

		return result.json();
	} catch (error) {
		console.error("Error fetching data:", error);
		throw new Error("Failed to fetch data.");
	}
};

/**
 * Get metadata for a track.
 *
 * @param track - The track metadata.
 * @returns Transformed track metadata.
 */

export const getMetaData = (track: TrackMetaData): TrackMetaData => {
	const { name, primaryArtists, album, year, duration, image, downloadUrl } =
		track;
	const albumName = typeof album === "object" ? album.name : album;

	return {
		album: util.textAbstract(albumName || "", 20),
		primaryArtists: util.textAbstract(primaryArtists || "", 30),
		name: util.textAbstract(name || "", 25),
		year: year || 0,
		duration: duration || 0,
		image: image[1]?.link || "",
		downloadUrl: downloadUrl[2]?.link || "",
	};
};

/**
 * Search for tracks based on a query.
 *
 * @param searchQuery - The search query (default: "altaf raja").
 * @returns A Promise that resolves to an array of track metadata.
 */

export const getSearcResult = async (
	searchQuery = "altaf raja",
) => {
	const result: JsonResponse = await getJSON(searchQuery);
	const json: TrackMetaData[] = result.data.results;
	const data: TrackMetaData[] = json.map((track) => getMetaData(track));

	return data;
};
