import { fetchMakesServerSide } from "../hooks/fetchMakesSsr";
import SSRMakesClient from "../components/SSRMakeDropdown";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SSR Vehicle Make & Model Viewer",
  description: "Explore vehicle makes and models with server-side rendering.",
};

export default async function SSRMakesPage() {
    const makes = await fetchMakesServerSide();

    return (
        <SSRMakesClient initialMakes={makes} />
    );
}
