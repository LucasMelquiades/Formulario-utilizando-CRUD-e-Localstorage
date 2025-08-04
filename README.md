# Formulário com CRUD - Teste Técnico SOC

Este projeto foi desenvolvido como parte de um teste técnico para a empresa **SOC**. O desafio consistia em criar um formulário simples utilizando a biblioteca **Materialize CSS** e implementar as funcionalidades básicas de **CRUD** (Create, Read, Update, Delete), utilizando **JavaScript** puro com persistência de dados via `localStorage`.

## 📝 Descrição

A aplicação permite que o usuário preencha um formulário com dados específicos (como nome, email, etc.). Após o envio, os dados são exibidos em uma tabela logo abaixo do formulário. A tabela também oferece botões de **edição** e **exclusão** para cada registro, permitindo alterar ou remover os dados cadastrados.

Todos os dados são armazenados no `localStorage` do navegador, garantindo que permaneçam disponíveis mesmo após recarregar a página.

## 🎯 Funcionalidades

- ✅ Cadastro de informações via formulário
- ✅ Exibição dos dados cadastrados em tabela dinâmica
- ✅ Edição de registros já cadastrados
- ✅ Exclusão de registros
- ✅ Armazenamento local usando `localStorage`
- ✅ Estilização com Materialize CSS
- ✅ Consumo de API `Via CEP` para localizar endereço a partir do preenchimento do CEP

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com [Materialize CSS](https://materializecss.com/))
- JavaScript (ES6)
- `localStorage` para persistência
- Organização de Tabelas com [DataTables](https://datatables.net/)
- Pesquisa de CEP e preenchimento automatico de endereço utilizando [Via CEP](https://viacep.com.br/)

## 💻 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/LucasMelquiades/Formulario-utilizando-CRUD-e-Localstorage.git

2. Clone o repositório:
   ```bash
   cd Formulario-utilizando-CRUD-e-Localstorage

3. Abra o arquivo `index.html` no navegador:
 - Clique duas vezes no arquivo, ou use um servidor local como o Live Server (VSCode) para melhor experiência


## 🧠 Conceitos Aplicados
- Manipulação do DOM com JavaScript

- CRUD básico sem backend

- Uso de eventos para interatividade

- Armazenamento local com `localStorage`

- Uso do framework CSS Materialize para layout e estilo

- Preenchimento automatizado de endereço a partir do CEP 

## 👨‍💻 Autor

Desenvolvido por [Lucas Melquiades](https://www.linkedin.com/in/lucas-melquiades-de-menezes-oliveira-74486272/)
