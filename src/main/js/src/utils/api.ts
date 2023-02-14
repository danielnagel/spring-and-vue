/**
 * GET request to backend
 *
 * @param relativeUrl to wanted endpoint
 * @returns expected result object or rejects with an error message
 */
export const getApi = async (
    relativeUrl: string,
): Promise<ApiGetRequest> => {
    if (relativeUrl.length > 0 && !relativeUrl.startsWith("/"))
        relativeUrl = "/" + relativeUrl;

    let response = null;
    try {
        response = await fetch(relativeUrl);
    } catch (e: unknown) {
        return Promise.reject(`Backend server is unreachable.`);
    }

    try {
        const json = await response.json();
        return Promise.resolve(json);
    } catch (e: unknown) {
        return Promise.reject(`Couldn't parse JSON data.`);
    }
};
