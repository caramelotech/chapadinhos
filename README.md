# Chapadinhos

Plataforma web-native open-source para desafios de atividade física entre amigos. Participantes registram atividades diárias, acumulam pontos e competem em leaderboards em tempo real.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilo:** Tailwind CSS (design system próprio - Kinetic Brutalism)
- **Backend:** Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Estado:** TanStack Query
- **Validação:** Zod
- **Qualidade:** Biome + Vitest + Playwright

## Design system

O projeto segue a diretriz visual **Kinetic Brutalism** - alto contraste, tipografia editorial e hierarquia por camadas de tom, sem bordas explícitas.

### Paleta de cores

| Token               | Valor     | Uso                                   |
| ------------------- | --------- | ------------------------------------- |
| `surface`           | `#121416` | Fundo base (nível 0)                  |
| `surface-low`       | `#1a1c1e` | Seções e header/sidebar (nível 1)     |
| `surface-container` | `#1e2022` | Cards e painéis (nível 2)             |
| `surface-high`      | `#282a2c` | Estado interativo/ativo (nível 3)     |
| `surface-lowest`    | `#0e1012` | Fundo de inputs                       |
| `primary-lime`      | `#caf300` | Acento elétrico - usar com parcimônia |
| `on-primary`        | `#121416` | Texto sobre fundo `primary-lime`      |
| `on-surface`        | `#e8eaed` | Texto principal                       |
| `on-surface-muted`  | `#9aa0a6` | Texto secundário, labels, metadados   |

**Regra "sem bordas":** separação de conteúdo é feita exclusivamente por mudanças de tom de fundo. Nunca usar bordas sólidas de 1px para seccionar.

### Tipografia

- **Display e títulos:** Space Grotesk (`font-display`) - autoridade e leitura em leaderboards
- **Corpo e labels:** Inter (`font-body`) - legibilidade em dados densos

Escala de tamanhos: `xs` · `sm` · `base` · `h6`→`h1` · `display-sm` · `display-md` · `display-lg` (3.5rem)

### Componentes

**Button** - três variantes:

- `primary` - fundo `primary-lime`, texto escuro
- `secondary` - ghost com contorno suave em lime (20% opacidade)
- `tertiary` - texto puro, sublinhado apenas no hover

**Input** - fundo `surface-lowest`, sem borda; focus acende um glow lime (inset box-shadow) em vez de trocar cor de borda.

**Utilitários CSS** (em `globals.css`):

- `.glass` - glassmorphism: `bg` 60% opacidade + `backdrop-blur: 20px`
- `.ghost-border` / `.ghost-border-hover` - contorno lime para botões secundários
- `.ambient-glow` - halo verde suave para elementos flutuantes
- `.input-focus` - glow de foco no input

## Banco de dados

### Aplicar a migração inicial

Execute o arquivo `supabase/migrations/001_auth_tables.sql` no SQL Editor do Supabase (ou via CLI):

```bash
supabase db push
```

A migração cria:

- **`public.profiles`** - perfil de cada usuário (estende `auth.users` via FK com cascade delete)
- **RLS** - qualquer pessoa pode ler; cada usuário só escreve no próprio perfil
- **Trigger `on_auth_user_created`** - cria o perfil automaticamente ao registrar, usando `display_name` dos metadados do signup
- **Trigger `profiles_set_updated_at`** - mantém `updated_at` atualizado

### Estrutura da tabela `profiles`

| Coluna         | Tipo          | Descrição                    |
| -------------- | ------------- | ---------------------------- |
| `id`           | `uuid` PK     | FK para `auth.users(id)`     |
| `display_name` | `text`        | Nome exibido publicamente    |
| `username`     | `text` unique | Identificador único opcional |
| `avatar_url`   | `text`        | URL do avatar                |
| `bio`          | `text`        | Descrição do perfil          |
| `created_at`   | `timestamptz` | Data de criação              |
| `updated_at`   | `timestamptz` | Última atualização           |

## Estrutura

```
chapadinhos/
├── src/
│   ├── app/               - Páginas e Route Handlers (Next.js App Router)
│   ├── components/        - Componentes React reutilizáveis
│   ├── lib/
│   │   ├── supabase/      - Clientes Supabase (browser, server, middleware)
│   │   └── query-client   - Provider do TanStack Query
│   ├── schemas/           - Schemas de validação Zod
│   ├── helpers/           - Utilitários
│   └── tests/             - Testes unitários (Vitest) e E2E (Playwright)
├── public/                - Assets estáticos
├── specs/                 - Documentação técnica e especificações
└── supabase/
    └── migrations/        - Migrações SQL do banco de dados
```

## Primeiros passos

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Preencha `.env.local` com as credenciais do seu projeto no [Supabase](https://supabase.com):

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev     # localhost:3000
```

## Scripts disponíveis

```bash
npm run dev         # Servidor de desenvolvimento
npm run build       # Build de produção
npm run start       # Servidor de produção
npm run lint        # Biome - verifica lint e formatação
npm run lint:fix    # Biome - corrige automaticamente
npm run format      # Biome - formata o código
npm run test        # Vitest - testes unitários
npm run test:e2e    # Playwright - testes end-to-end
```
