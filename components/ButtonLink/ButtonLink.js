import Link from "next/link"

export default function ButtonLink({ destination, label }) {
  return (
    <Link href={destination} className="btn">
      {label}
    </Link>
  )
}
