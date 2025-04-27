import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Denuncia from './pages/Denuncia';
import Verificar from './pages/Verificar';


function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home /> }></Route>
            <Route path='/sobre' element={<Sobre /> }></Route>
            <Route path='/denuncia' element={<Denuncia /> }></Route>
            <Route path='/verificar' element={<Verificar /> }></Route>
        </Routes>
        </BrowserRouter> 
    )

}
export default AppRoutes