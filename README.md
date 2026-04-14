# Chapadinhos

Plataforma web-native open-source para desafios de atividade física entre amigos. Participantes registram atividades diárias, acumulam pontos e competem em leaderboards em tempo real.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Estado:** TanStack Query
- **Validação:** Zod
- **Qualidade:** Biome + Vitest + Playwright

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
└── specs/                 - Documentação técnica e especificações
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
