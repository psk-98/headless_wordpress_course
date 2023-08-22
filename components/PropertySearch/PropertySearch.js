import { useRouter } from "next/router"
import queryString from "query-string"
import { useEffect, useState } from "react"
import Filters from "./Filters/Filters"
import Pagination from "./Pagination/Pagination"
import Results from "./Results/Results"

export default function PropertySearch() {
  const [properties, setProperties] = useState([])
  const [total, setTotal] = useState(0)
  const pageSize = 3
  const router = useRouter()

  const search = async () => {
    const { page, minPrice, maxPrice, hasParking, petFriendly } =
      queryString.parse(window.location.search)
    const filters = {}
    if (minPrice) filters.minPrice = parseInt(minPrice)
    if (maxPrice) filters.maxPrice = parseInt(maxPrice)
    if (hasParking === "true") filters.hasParking = true
    if (petFriendly === "true") filters.petFriendly = true

    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({ page: parseInt(page || "1"), ...filters }),
    })
    const data = await response.json()
    console.log(data)
    setProperties(data.properties)
    setTotal(data.total)
  }

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    )

    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=${pageNumber}&petFriendly=${petFriendly}&minPrice=${minPrice}&maxPrice=${maxPrice}&hasParking=${hasParking}`,
      null,
      { shallow: true }
    )
    search()
  }

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=1&petFriendly=${petFriendly}&minPrice=${minPrice}&maxPrice=${maxPrice}&hasParking=${hasParking}`,
      null,
      { shallow: true }
    )
    search()
  }

  useEffect(() => {
    search()
  }, [])
  return (
    <>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        totalPages={Math.ceil(total / pageSize)}
        onPageClick={handlePageClick}
      />
    </>
  )
}
