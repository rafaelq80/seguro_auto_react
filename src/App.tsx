import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import DeletarCliente from "./components/clientes/deletarcliente/DeletarCliente"
import FormCliente from "./components/clientes/formcliente/FormCliente"
import ListaClientes from "./components/clientes/listaclientes/ListaClientes"
import ListaDashboard from "./components/dashboard/listadashboard/ListaDashboard"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import DeletarSeguro from "./components/seguros/deletarseguro/DeletarSeguro"
import FormSeguro from "./components/seguros/formseguro/FormSeguro"
import ListaSeguros from "./components/seguros/listaseguros/ListaSeguros"
import { AuthProvider } from "./contexts/AuthContext"
import Cadastro from "./pages/cadastro/Cadastro"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Perfil from "./pages/perfil/Perfil"


function App() {
  return (
     <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Cadastro" element={<Cadastro />} />
              <Route path="/clientes" element={<ListaClientes />} />
              <Route path="/cadastrarcliente" element={<FormCliente />} />
              <Route path="/atualizarcliente/:id" element={<FormCliente />} />
              <Route path="/deletarcliente/:id" element={<DeletarCliente />} />
              <Route path="/apolices" element={<ListaSeguros />} />
              <Route path="/cadastrarseguro" element={<FormSeguro />} />
              <Route path="/atualizarseguro/:id" element={<FormSeguro />} />
              <Route path="/deletarseguro/:id" element={<DeletarSeguro />} />
              <Route path="/dashboard" element={<ListaDashboard />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
