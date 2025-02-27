export async function getAllLaunches() {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/launches`)
        return await res.json();
    } catch (err) {
        console.error("Error fetching Launches:", err);
        throw new Error("Failed to fetch Launches from the API");
    }
}

export async function getLaunchById(LaunchId: string) {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/launches/${LaunchId}`)
        return await res.json();
    } catch (err) {
        console.error(`Error fetching Launch with id ${LaunchId}:`, err);
        throw err;
    }
}