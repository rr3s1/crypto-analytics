
import qs from "query-string";

// Retrieve environment variables for API configuration
const BASE_URL = process.env.COINGECKO_BASE_URL as string;
const API_KEY = process.env.COINGECKO_API_KEY as string;

// Validate that essential configuration exists before proceeding
if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

// Generic fetcher function to handle API requests with type safety
export async function fetcher<T>(
    endpoint: string,
    params?: QueryParams,
    revalidate = 60, // Default cache revalidation set to 60 seconds
): Promise<T> {
    // Construct the full URL with query parameters
    const url = qs.stringifyUrl(
        {
            url: `${BASE_URL}/${endpoint}`,
            query: params,
        },
        { skipEmptyString: true, skipNull: true },
    );

    // Perform the fetch request with the appropriate authentication header
    const isPro = BASE_URL.includes('pro-api');
    const response = await fetch(url, {
        headers: {
            [isPro ? 'x-cg-pro-api-key' : 'x-cg-demo-api-key']: API_KEY,
            'Content-Type': 'application/json',
        } as Record<string, string>,
        next: { revalidate },
    });

    // Handle HTTP errors by throwing a descriptive message
    if (!response.ok) {
        const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status}: ${errorBody.error || JSON.stringify(errorBody)} `);
    }

    // Return the parsed JSON data
    return response.json();
}
