import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "../../../contexts/AuthContext";
import type Seguro from "../../../models/Seguro";
import { deletar, listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarSeguro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seguro, setSeguro] = useState<Seguro>({} as Seguro);

  const { usuario, handleLogout, isLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/seguros/${id}`, setSeguro, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info")
      }
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarSeguro() {
    setIsLoading(true);

    try {
      await deletar(`/seguros/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Seguro apagado com sucesso", 'sucesso');
    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
        } else {
            ToastAlerta('Erro ao deletar o Seguro!', 'erro')
        }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/apolices");
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl text-center my-4">
          Excluir Seguro
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Tem certeza que deseja remover este seguro?
          Esta ação não pode ser desfeita.
        </p>

        {/* Card do Seguro */}
        <div className="bg-linear-to-r from-zinc-600 to-zinc-700 rounded-lg p-6 mb-8">
          <p className="text-white text-sm font-semibold mb-2">
            Seguro a ser removido:
          </p>
          <p className="text-white text-2xl font-bold wrap-break-word">
            Placa: {seguro.placa || 'Carregando...'}
          </p>
          <p className="text-white text-2xl font-bold wrap-break-word">
            Modelo: {seguro.modelo || 'Carregando...'}
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={retornar}
            className="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition duration-200"
          >
            Não
          </button>

          <button
            type="button"
            onClick={deletarSeguro}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 h-12"
          >
            {isLoading ? (
              <ClipLoader
                color="#ffffff"
                size={24}
              />
            ) : (
              <span>Sim, Excluir</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarSeguro;