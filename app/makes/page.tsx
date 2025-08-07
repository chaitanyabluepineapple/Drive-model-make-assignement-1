import { fetchMakesServerSide } from "../hooks/fetchMakesSsr";
import SSRMakesClient from "../components/SSRMakeDropdown";

export const dynamic = "force-dynamic";

export default async function SSRMakesPage() {
    const makes = await fetchMakesServerSide();

    return (
        <SSRMakesClient initialMakes={makes} />
    );
}
