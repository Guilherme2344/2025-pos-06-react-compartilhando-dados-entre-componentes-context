# Notas de aula (Atividade) - React - Compartilhando dados entre componentes usando Context

## Informações gerais
- **Objetivo**: mostrar o compartilhamento de dados entre componentes usando context
- **Público alvo**: alunos da disciplina de POS (Programação Orientada a Serviços) do curso de Infoweb (Técnico Integrado em Informática para Internet) no CNAT-IFRN (Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte - Campus Natal-Central)
- **Professor**: [L A Minora](https://github.com/leonardo-minora/)
- **Aluno**: [Guilherme Cristiano Medeiros Silva](https://github.com/Guilherme2344/)

---
## Sumário

1. Links
2. Pré-requisitos
3. Tarefas

## 1. Links

- [Notas de aula sobre context](https://github.com/infoweb-pos/2025-pos-react-compartilhando-dados-entre-componentes-exemplo-context)
- [React](https://react.dev/learn)
  - [context](https://react.dev/learn/passing-data-deeply-with-context)
- [Next](https://nextjs.org/docs)
  - [routing](https://nextjs.org/docs/app/building-your-application/routing)
- Heroicons [lista de icones](https://heroicons.com/) [docs](https://github.com/tailwindlabs/heroicons)

---

## 2. Pré-requisitos

1. Ter finalizado as **atividades** [Compartilhando dados entre componentes e introdução a Tailwindcss](https://github.com/infoweb-pos/2025-pos-03-react-compartilhando-dados-entre-componentes) e [Usando axios para acessar API](https://github.com/infoweb-pos/2025-pos-04-react-api-requisicao-axios)

---

## 3. Tarefas

1. Fork desse repositório e colocar o nome/link na linha 7 deste arquivo leia-me
2. Copiar o projeto das atividades passadas para este repositório
   - Pode codar num computador local, usando a instalação do node, ou remotamente, usando o [code spaces](https://github.com/features/codespaces)
4. Codar segundo a estrutura do projeto abaixo
   - `src` contendo todos os códigos-fonte
   - `src/components` para os componentes react para compor a UI. Além do arquivo abaixo, você pode usar para os componentes que construiu.
     - `src/components/Navbar.tsx` contendo o componente `Navbar` que comporá o `layout` da aplicação
   - `src/data` para os recursos e dados compartilhados na aplicação, nesta atividade, para o contexto de tarefas
     - `src/data/ContextTarefa.tsx` contendo os recursos para o provedor de contexto de tarefas
   - `src/app` para as páginas
      - `src/app/page.tsx` contendo a página de home
      - `src/app/layout.tsx` contendo o layout da aplicação
      - `src/app/tarefas/page.tsx` contendo a lista de tarefas. Lembrar de:
        - se ainda vai iniciar a tela, usar diretamente os dados no jsx e depois mudar para uso de constante
        - por fim, se já aproveitou o componente do projeto anterior é só mudar de `useState` para `useContext`, usar contexto
      - `src/app/tarefas/nova/page.tsx` com um formulário para preencher e confirma a adição de tarefa nova
   - `src/types` para os tipos utilizados na aplicação
      - `src/types/tarefa.ts` contendo os diversos tipos referente a tarefa e lista de tarefas
5. Lembrar que as atividades devem ser inicialmente carregadas de https://dummyjson.com/docs/todos
