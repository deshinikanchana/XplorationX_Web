
export async function getAllCrew() {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/crew`)
        return await res.json();
    } catch (err) {
        console.error("Error fetching Crew:", err);
        throw new Error("Failed to fetch Crew from the API");
    }
}

export async function getCrewMemberById(CrewId: string) {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/crew/${CrewId}`)
       return await res.json();
    } catch (err) {
        console.error(`Error fetching Crew Member with id ${CrewId}:`, err);
        throw err;
    }
}