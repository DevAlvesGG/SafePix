
# Projeto SafePix

## Integrantes do Grupo

- **Gabriel Cosmo de Lima** – RA: 824135713  
- **Gabriel Mantoani Sobral** – RA: 824122236  
- **Gustavo Alves Garcia** – RA: 824114167  
- **Lucas Rodrigues de Laia** – RA: 824140963  
- **Rychard Alves da Silva** – RA: 824148212  
   

---

## Sobre o projeto

SafePix é um sistema acadêmico desenvolvido por mim durante um projeto de curso. A aplicação permite o envio e verificação de denúncias via interface web, simulando um serviço de pixelização seguro. O foco principal é demonstrar conhecimentos de frontend e backend em um ambiente Node.js/React.

## Stack utilizada

- **Frontend:** React (Vite) com JSX, CSS módulos
- **Backend:** Node.js com Express
- **Banco de dados:** MongoDB – configuração em `src/back/config/database.js` e `db/connection.js`
- **Ferramentas:** NPM, Vite para bundling, Git para controle de versão

## Como executar

1. **Instalar dependências**
   ```bash
   npm install
   # ou yarn install
   ```

2. **Rodar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Esse comando inicializa tanto o frontend; 

   **Rodar o backend**
   ```bash
   npm run back
   ```
3. **Banco de dados**
   Certifique-se de que o serviço de banco esteja ativo e as variáveis de ambiente (URI etc.) estejam corretamente configuradas no arquivo de configuração ou `.env` (não versionado).

## Estrutura do projeto

```
src/
  back/          # código do servidor Express
  front/         # aplicativo React (páginas, componentes, serviços)
DB/
  connection.js  # inicialização do banco
index.html       # página principal usada pelo Vite
package.json     # dependências e scripts
```

## Observações

- Este é um trabalho acadêmico; a intenção é demonstrar funcionalidades básicas e boas práticas de organização
- Qualquer dúvida ou melhoria pode ser discutida nos comentários do repositório

---

*Criado por Gustavo Alves Garcia*






