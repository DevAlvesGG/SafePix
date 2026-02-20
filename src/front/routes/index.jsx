import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Denuncia from '../pages/Denuncia';
import Verificar from '../pages/Verificar';
import Duvidas from '../pages/Duvidas';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/denuncia" element={<Denuncia />} />
                <Route path="/verificar" element={<Verificar />} />
                <Route path="/duvidas" element={<Duvidas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
