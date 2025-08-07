import ClientSideMakes from "./components/ClientSideMakes";
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* SSR Button */}
      <div className="flex justify-center">
        <Link
          href="/makes"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View Makes (SSR Page)
        </Link></div>

      <ClientSideMakes label="CSR: Vehicle Make & Model Viewer" />
    </>
  )
}
