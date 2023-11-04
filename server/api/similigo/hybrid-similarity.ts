export default defineEventHandler(async event => {
    const body = await readBody(event)
    const data = await getCalculateHybrid(body)
    return {
        similarityScore: data.result
    }
})

export const getCalculateHybrid = async (body: any) => {
    const baseURL = process.env.SIMILIGO_API_URL
    try {
        const response = await fetch(`${baseURL}/calculateHybridSimilarity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error) {
            throw new Error(`getCalculateHybrid calling endpoint: ${error}`);
        }
    }
}