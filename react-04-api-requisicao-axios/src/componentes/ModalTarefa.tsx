"use client";

import React, { useState } from "react";

interface ModalTarefaProps {
  adicionarTarefa: (titulo: string) => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ adicionarTarefa }) => {
  const [titulo, setTitulo] = useState("");

  const handleAdicionar = () => {
    if (titulo.trim()) {
      adicionarTarefa(titulo.trim());
      setTitulo(""); // limpa o campo
    }
  };

  return (
    <div className="my-6 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Nova Tarefa</h2>
      <input
        className="w-full border p-2 rounded mb-2"
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Digite a tarefa"
      />
      <button
        onClick={handleAdicionar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Adicionar Tarefa
      </button>
    </div>
  );
};

export default ModalTarefa;