# Sistema de Gerenciamento de Produtos

Sistema fullstack para gerenciamento de produtos com upload de imagens, desenvolvido com NestJS (API) e Angular (Frontend).

## 📋 Funcionalidades

- ✅ Listagem de produtos
- ✅ Detalhes do produto
- ✅ Criação de produtos com upload de imagem
- ✅ Upload de imagens salvas localmente
- ✅ Interface responsiva com Angular Material
- ✅ API REST com Swagger documentation

## 🏗️ Arquitetura

```
desafio-fullstack/
├── products-api/          # Backend (NestJS + PostgreSQL)
│   ├── src/
│   │   ├── products/      # Módulo de produtos
│   │   └── main.ts        # Configuração da aplicação
│   ├── uploads/           # Pasta para imagens
│   └── docker-compose.yml # Banco PostgreSQL
└── products-frontend/     # Frontend (Angular)
    ├── src/
    │   └── app/
    │       └── products/  # Componentes de produtos
    └── package.json
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### 1. Configurar Banco de Dados

```bash
cd products-api
docker-compose up -d
```

Isso iniciará um container PostgreSQL na porta 5432.

### 2. Configurar e Executar a API

```bash
cd products-api
npm install
npm run start:dev
```

A API estará disponível em: `http://localhost:3000`

- Swagger UI: `http://localhost:3000/api`

### 3. Configurar e Executar o Frontend

```bash
cd products-frontend
npm install
ng serve
```

O frontend estará disponível em: `http://localhost:4200`

## 📡 API Endpoints

### Produtos

| Método | Endpoint        | Descrição                                |
| ------ | --------------- | ---------------------------------------- |
| GET    | `/products`     | Lista todos os produtos                  |
| GET    | `/products/:id` | Busca produto por ID                     |
| POST   | `/products`     | Cria novo produto (com upload de imagem) |

### Upload de Imagens

- **Endpoint**: `POST /products`
- **Content-Type**: `multipart/form-data`
- **Campos**:
  - `nome` (string): Nome do produto
  - `descricao` (string): Descrição do produto
  - `preco` (number): Preço do produto
  - `categoria` (string): Categoria do produto
  - `imagem` (file): Arquivo de imagem (JPG, PNG, GIF)

### Exemplo de Uso (curl)

```bash
curl -X POST http://localhost:3000/products \
  -F "nome=Produto Teste" \
  -F "descricao=Descrição do produto" \
  -F "preco=123.45" \
  -F "categoria=Eletrônicos" \
  -F "imagem=@/caminho/para/imagem.jpg"
```

## 🎨 Frontend

### Componentes

- **ProductListComponent**: Lista todos os produtos em cards
- **ProductDetailComponent**: Exibe detalhes de um produto específico
- **ProductCardComponent**: Card individual do produto

### Rotas

- `/` - Lista de produtos
- `/produto/:id` - Detalhes do produto

### Tecnologias

- Angular 18 (Standalone Components)
- Angular Material
- RxJS para requisições HTTP

## 🗄️ Banco de Dados

### Tabela: products

| Campo     | Tipo               | Descrição                 |
| --------- | ------------------ | ------------------------- |
| id        | SERIAL PRIMARY KEY | ID único do produto       |
| nome      | VARCHAR            | Nome do produto           |
| descricao | TEXT               | Descrição do produto      |
| preco     | DECIMAL(10,2)      | Preço do produto          |
| categoria | VARCHAR            | Categoria do produto      |
| imagem    | VARCHAR            | Nome do arquivo da imagem |
| createdAt | TIMESTAMP          | Data de criação           |
| updatedAt | TIMESTAMP          | Data de atualização       |

## 📁 Estrutura de Arquivos

### API (products-api/)

```
src/
├── main.ts                    # Configuração principal
├── app.module.ts             # Módulo raiz
└── products/
    ├── products.controller.ts # Controller dos produtos
    ├── products.module.ts     # Módulo dos produtos
    ├── products.service.ts    # Service dos produtos
    ├── dto/
    │   └── create-product.dto.ts # DTO de criação
    └── entities/
        └── product.entity.ts     # Entidade do produto
```

### Frontend (products-frontend/)

```
src/app/
├── app.ts                    # Componente raiz
├── app.html                  # Template raiz
├── app.config.ts             # Configuração da aplicação
├── app.routes.ts             # Configuração de rotas
└── products/
    ├── products.module.ts    # Módulo de produtos
    ├── products.service.ts   # Service de produtos
    ├── product-list/         # Componente de lista
    ├── product-detail/       # Componente de detalhes
    └── product-card/         # Componente de card
```

## 🔧 Configurações Importantes

### API

- **Porta**: 3000
- **CORS**: Habilitado
- **Upload**: Máximo 5MB por arquivo
- **Tipos de imagem**: JPG, JPEG, PNG, GIF
- **Pasta de uploads**: `./uploads` (servida em `/uploads/`)

### Frontend

- **Porta**: 4200
- **Standalone Components**: Habilitado
- **Angular Material**: Configurado
- **Lazy Loading**: Habilitado para módulo de produtos

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**:

   ```bash
   cd products-api
   docker-compose down
   docker-compose up -d
   ```

2. **Arquivo não encontrado**:

   - Verifique se a pasta `uploads` existe na API
   - Confirme se a API está rodando na porta 3000

3. **Erro de CORS**:

   - Verifique se a API tem `app.enableCors()` no main.ts

4. **Imagens não carregam**:
   - Confirme se a pasta `uploads` está sendo servida estaticamente
   - Verifique se o arquivo existe na pasta `uploads`

## 📝 Logs

A API possui logs informativos:

- Criação de produtos
- Remoção de arquivos em caso de erro
- Erros de validação

## 🚀 Deploy

Para produção, considere:

- Configurar variáveis de ambiente
- Usar um serviço de armazenamento de arquivos (AWS S3, etc.)
- Configurar proxy reverso (Nginx)
- Habilitar HTTPS
- Configurar logs estruturados

## 📄 Licença

Este projeto é apenas para fins educacionais/demonstração.
