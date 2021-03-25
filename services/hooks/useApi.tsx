import { useState } from "react"

const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  return [data, loading]
}

export default useApi