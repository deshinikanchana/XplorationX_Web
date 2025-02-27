export async function getAllLaunchPads() {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/launchpads`)
        return await res.json();
    } catch (err) {
        console.error("Error fetching LaunchPads:", err);
        throw new Error("Failed to fetch LaunchPads from the API");
    }
}

export async function getLaunchPadById(LaunchPadId: string) {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${LaunchPadId}`)
        return await res.json();
    } catch (err) {
        console.error(`Error fetching LaunchPad with id ${LaunchPadId}:`, err);
        throw err;
    }
}