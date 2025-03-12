import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchHouses = async () => {
    try{
      setLoading(true)
      const res = await fetch("/api/houses");
      const data = await res.json()
      if(!data) throw new Error("Data not recieved")
      if(data.error) throw new Error(data.error)
      setHouses(data)
    }catch(e){
      setError(e instanceof Error ? e.message : "Unknown error")
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHouses()
  }, [])

  if(error) return <div>Error: {error}</div>
  return (
    <>
      {
        loading
        ?
        <h1>Loading</h1>
        :
        houses?.map(house => <div key={house.id}>{house.name}</div>)
      }
    </>
  )
}

export default App
