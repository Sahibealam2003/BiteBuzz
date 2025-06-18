import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Restaurant from './Components/Restaurant'
import Grocery from './Components/Grocery'
import Dineout from './Components/Dineout'
import Genie from './Components/Genie'
const App = () => {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/restaurants' element={<Restaurant/>}/>
        <Route path='/grocery' element={<Grocery/>}/>
        <Route path='/dineout' element={<Dineout/>}/>
        <Route path='/genie' element={<Genie/>}/>
      </Routes>
    </div>
    
    </>
  )
}

export default App