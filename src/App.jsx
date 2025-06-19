import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Restaurant from './Components/Restaurant'
import Error from './Components/Error'
const App = () => {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/restaurants' element={<Restaurant/>}/>
        <Route path='*' element={<Error/>}/>

      </Routes>
    </div>
    
    </>
  )
}

export default App