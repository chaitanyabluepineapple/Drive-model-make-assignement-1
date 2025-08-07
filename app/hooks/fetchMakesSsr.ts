export async function fetchMakesServerSide() {
  try {
    const res = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");

    if (!res.ok) {
      throw new Error("Failed to fetch vehicle makes");
    }

    const data = await res.json();
    return data.Results || [];
  }
  catch {
    return [];
  }
}
