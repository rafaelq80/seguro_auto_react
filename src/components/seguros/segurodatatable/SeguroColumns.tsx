import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import type Seguro from "../../../models/Seguro";
import { formatarMoeda } from "../../../utils/FormatarMoeda";

const columnHelper = createColumnHelper<Seguro>();

export function createSeguroColumns() {
  const navigate = useNavigate();

  return [
    columnHelper.accessor("placa", {
      header: "Placa",
      cell: (info) => (
        <span className="font-semibold text-gray-800">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("fabricante", {
      header: "Fabricante",
      cell: (info) => (
        <span className="text-gray-800">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("modelo", {
      header: "Modelo",
      cell: (info) => (
        <span className="text-gray-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("valorFinal", {
      header: "Valor Final",
      cell: (info) => {
        const valor = info.getValue();
        return (
          <span className="font-semibold text-green-800">
            {formatarMoeda(valor)}
          </span>
        );
      },
    }),
    columnHelper.accessor("cliente.nome", {
      header: "Proprietário",
      cell: (info) => (
        <span className="text-gray-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("usuario.nome", {
      header: "Corretor",
      cell: (info) => (
        <span className="text-gray-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: (info) => {
        const id = info.row.original.id;
        return (
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => navigate(`/atualizarseguro/${id}`)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
              aria-label="Editar seguro"
            >
              <PencilIcon 
                size={20} 
                className="text-blue-500 group-hover:text-blue-700 transition-colors" 
              />
            </button>

            <button 
              onClick={() => navigate(`/deletarseguro/${id}`)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
              aria-label="Excluir seguro"
            >
              <TrashIcon 
                size={20} 
                className="text-red-500 group-hover:text-red-700 transition-colors" 
              />
            </button>
          </div>
        );
      },
    }),
  ];
}