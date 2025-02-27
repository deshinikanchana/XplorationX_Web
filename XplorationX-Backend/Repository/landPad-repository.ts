export async function getAllLandPads() {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/landpads`)
        return await res.json();
    } catch (err) {
        console.error("Error fetching LandPads:", err);
        throw new Error("Failed to fetch LandPads from the API");
    }
}

export async function getLandPadById(landPadId: string) {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/landpads/${landPadId}`)
       return await res.json();
    } catch (err) {
        console.error(`Error fetching LandPad with id ${landPadId}:`, err);
        throw err;
    }
}