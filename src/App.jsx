import {Routes,Route, Link} from 'react-router-dom'
import Home from './Components/Home'
import Restaurant from './Components/Restaurant'
import Error from './Components/Error'
import SliderItemData from './Components/SliderItemData'
import { useGlobalContext } from './Utils/Contex/ApiContext'
import Menu from './Components/Menu'
import SearchItem from './Components/SearchItem'
const App = () => {
   const{setLat, setLong} = useGlobalContext()


    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords?.latitude
        const long = position.coords?.longitude

        setLat(lat)
        setLong(long)
    })
  return (
    <>
  
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element={<SearchItem/>}/>
        <Route path='/restaurants' element={<Restaurant/>}/>
        <Route path="/slider-data/:itemId/:text" element={<SliderItemData/>}/>
        <Route path="/menu/:itemId" element={<Menu/>}/>
        <Route path='*' element={<Error/>}/>

      </Routes>
    </div>
    
    </>
  )
}

export default App