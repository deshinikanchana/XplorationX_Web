export async function getAboutCompany() {
    try {
        const res = await fetch(`https://api.spacexdata.com/v4/company`)
        return await res.json();
    } catch (err) {
        console.error("Error fetching Company Data:", err);
        throw new Error("Failed to fetch Company Data from the API");
    }
}
