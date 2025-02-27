export async function getAllPayLoads() {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/payloads`)
        return await res.json();
    } catch (err) {
        console.error("Error fetching PayLoads:", err);
        throw new Error("Failed to fetch Payloads from the API");
    }
}

export async function getPayloadById(PayloadId: string) {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/payloads/${PayloadId}`)
        return await res.json();
    } catch (err) {
        console.error(`Error fetching Payload with id ${PayloadId}:`, err);
        throw err;
    }
}