import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetId = () => {
  const [id, setId] = useState('')

  useEffect(() => {
    const getid = async () => {
      const { data } = await axios.get('/api/generate_id')
      setId(data.id)
    }

    getid()
  }, [])

  return id
}

export default useGetId
