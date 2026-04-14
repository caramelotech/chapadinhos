# Chapadinhos

Tech Stack Spec

## 1. Introdução

Este documento especifica e justifica cada tecnologia adotada no projeto Chapadinhos - uma plataforma web-native open-source para desafios de atividade física entre amigos.

As escolhas foram orientadas por três princípios:

- Mínimo de dependências pagas - o projeto deve rodar com custo zero no tier gratuito das plataformas escolhidas.

- Stack acessível a contribuidores OSS - tecnologias amplamente conhecidas e bem documentadas.

- Escalabilidade progressiva - a arquitetura suporta crescimento sem reescritas, trocando componentes individuais quando necessário.

## 2. Resumo da Stack

Visão consolidada de todas as tecnologias adotadas por camada:

| **Camada**    | **Tecnologia escolhida**                           |
| ------------- | -------------------------------------------------- |
| **Frontend**  | Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui |
| **PWA**       | Serwist (service worker + manifest)                |
| **Banco**     | PostgreSQL via Supabase                            |
| **Auth**      | Supabase Auth (Google OAuth + Magic Link)          |
| **Realtime**  | Supabase Realtime (websockets)                     |
| **ORM**       | Drizzle ORM                                        |
| **Validação** | Zod                                                |
| **Estado**    | TanStack Query (React Query)                       |
| **API**       | Next.js Route Handlers → Hono (se escalar)         |
| **Qualidade** | Biome + Vitest + Playwright                        |
| **Hosting**   | Vercel (frontend) + Supabase (backend)             |

## 3. Frontend

### 3.1 Next.js 15 + TypeScript

Next.js é o framework React de referência para aplicações web modernas.
A escolha do App Router (introduzido no Next 13 e maduro no 15) traz benefícios diretos para o Chapadinhos:

- Server Components reduzem o JavaScript enviado ao cliente, melhorando performance em dispositivos móveis - o público-alvo principal.

- Rotas de servidor (Route Handlers) permitem criar a camada de API no mesmo repositório, sem precisar de um backend separado no MVP.

- SSR nativo garante que leaderboards e feeds públicos sejam indexáveis e carreguem rápido mesmo em conexões lentas.

- Suporte de primeira classe a PWA via plugin (Serwist), sem configuração manual de service worker.

TypeScript é inegociável em projetos open-source: os tipos servem como documentação viva, reduzem bugs em contribuições externas e melhoram o DX com autocomplete.

| **Frontend Framework** |                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **✅ Escolha:**        | Next.js 15 (App Router) + TypeScript                                                                                                               |
| **❌ Evitar:**         | Create React App, Vite SPA puro, Remix                                                                                                             |
| **💡 Motivo:**         | Next.js oferece SSR, PWA e API Routes no mesmo projeto. Remix seria alternativa válida, mas Next.js tem ecossistema e comunidade maiores para OSS. |

### 3.2 Tailwind CSS

Tailwind é um framework CSS utility-first que elimina a necessidade de escrever CSS customizado para a maioria dos componentes. Para um projeto OSS, isso é estratégico: qualquer contribuidor familiarizado com Tailwind (base enorme) pode modificar o visual sem entender uma arquitetura CSS proprietária.

- Classes utilitárias colocalizadas com o markup - o componente é a única fonte de verdade.

- Purge automático de CSS não utilizado em produção - bundle final mínimo.

- Sistema de design integrado (spacing, cores, tipografia) via arquivo de configuração - fácil de customizar o tema do Chapadinhos.

### 3.3 shadcn/ui

shadcn/ui não é uma biblioteca de componentes tradicional - é uma coleção de componentes que você copia para dentro do seu projeto. Isso tem implicações importantes para o Chapadinhos:

- Zero dependência de terceiro para UI crítica: os componentes vivem no repositório e podem ser modificados livremente.

- Construído sobre Radix UI (acessibilidade) + Tailwind (estilo) - duas tecnologias já adotadas no projeto.

- Visual limpo e moderno por padrão, sem parecer um template genérico.

Componentes prioritários para o Chapadinhos: Dialog (modais de criação de desafio), DropdownMenu, Avatar, Badge (status do desafio), Card (feed items), Tabs (leaderboard/feed).

| **UI Components** |                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **✅ Escolha:**   | shadcn/ui + Radix UI                                                                                                                                           |
| **❌ Evitar:**    | MUI (Material UI), Chakra UI, Ant Design                                                                                                                       |
| **💡 Motivo:**    | MUI e Chakra impõem um design system forte que exige sobrescrever muito para ter identidade própria. shadcn entrega componentes acessíveis sem lock-in visual. |

### 3.4 Serwist (PWA)

Serwist é o sucessor mantido ativamente do next-pwa, compatível com Next.js 15. Ele gera automaticamente o service worker e o manifesto necessários para o Chapadinhos ser instalável como PWA.

- Cache de páginas e assets estáticos para funcionamento offline básico (leaderboard e feed em cache).

- Push notifications via Web Push API - base para os lembretes de atividade diária (Fase 3).

- Ícone na tela inicial em iOS e Android sem instalação via app store.

## 4. Backend & Banco de Dados

### 4.1 Supabase (PostgreSQL + Auth + Realtime + Storage)

Supabase é a espinha dorsal do backend do Chapadinhos. Ele entrega quatro serviços em uma única plataforma, todos com free tier generoso e compatíveis com projetos OSS:

**PostgreSQL**

O modelo relacional do Chapadinhos - com entidades como Challenge, ChallengeParticipant, ActivityLog e ChallengeActivityLog - encaixa naturalmente em PostgreSQL. Queries de pontuação derivada, streak semanal e leaderboard são SQL puro, sem precisar de lógica em camada de aplicação.

Row Level Security (RLS) do PostgreSQL permite definir regras de acesso diretamente no banco: membros de um desafio privado só enxergam o feed daquele desafio, sem nenhuma verificação extra no servidor.

**Supabase Auth**

Autenticação pronta com Google OAuth e Magic Link (email sem senha).
O Magic Link é estratégico para o Chapadinhos: remove a fricção de criar senha, fundamental para conversão de usuários que chegam via link de convite.

A tabela de perfis (username, avatar, bio) é criada em extensão à tabela auth.users do Supabase, mantendo os dados de autenticação separados dos dados de negócio.

**Supabase Realtime**

O feed social e o leaderboard precisam atualizar em tempo real quando um participante registra uma atividade. Supabase Realtime usa websockets sobre o PostgreSQL (via logical replication) - sem necessidade de infraestrutura adicional como Redis Pub/Sub ou Pusher.

**Supabase Storage**

Armazenamento de avatars de usuários e futuros cards de resultado compartilhável (Fase 3). CDN integrada com URLs públicas ou privadas por bucket.

| **Plataforma de Backend** |                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **✅ Escolha:**           | Supabase (PostgreSQL + Auth + Realtime + Storage)                                                                                                                                      |
| **❌ Evitar:**            | Firebase, PlanetScale, Railway + servidor próprio                                                                                                                                      |
| **💡 Motivo:**            | Firebase usa modelo NoSQL que complica queries relacionais (leaderboard, streak). PlanetScale não tem Auth nem Realtime. Supabase entrega tudo integrado, open-source e com free tier. |

### 4.2 Drizzle ORM

Drizzle é um ORM TypeScript-first que gera queries SQL diretamente - sem abstração "mágica". Para o Chapadinhos, isso importa porque as queries de pontuação e streak são complexas e precisam de controle fino.

- Schema definido em TypeScript - tipos inferidos automaticamente, sem geração de código extra.

- Queries escritas em sintaxe próxima ao SQL - contribuidores com conhecimento de banco entram sem curva de aprendizado.

- Compatível com Supabase (usa o mesmo cliente pg por baixo).

- Migrações geradas automaticamente a partir do schema TypeScript.

| **ORM / Query Builder** |                                                                                                                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **✅ Escolha:**         | Drizzle ORM                                                                                                                                                                               |
| **❌ Evitar:**          | Prisma, Kysely                                                                                                                                                                            |
| **💡 Motivo:**          | Prisma gera um client pesado (~30MB) e tem fricção em edge runtimes. Drizzle é leve, SQL-first e mais adequado para Supabase. Kysely seria alternativa válida, mas Drizzle tem melhor DX. |

### 4.3 Next.js Route Handlers → Hono

No MVP, os Route Handlers do Next.js são suficientes para a camada de API - sem servidor separado, sem deploy adicional. O código de API vive no mesmo repositório do frontend.

Se o projeto crescer e precisar de um backend independente (ex: para Fase 2 com webhooks de integrações externas), Hono é a migração natural:

- Hono é extremamente leve (~14kB) e roda em qualquer edge runtime (Vercel Edge, Cloudflare Workers, Bun).

- API idêntica ao fetch nativo - zero surpresas para contribuidores.

- TypeScript-first com inferência de tipos nas rotas.

## 5. Estado & Validação

### 5.1 TanStack Query (React Query)

TanStack Query gerencia o estado do servidor no frontend - cache de dados, revalidação, estados de loading/error e sincronização em background.
Para o Chapadinhos, substitui completamente a necessidade de uma store global (Redux, Zustand):

- Cache automático de leaderboard e feed - a UI não precisa refetch a cada navegação entre abas.

- Invalidação granular: quando o usuário lança uma atividade, apenas a query do leaderboard e do feed são invalidadas.

- Integração nativa com Supabase Realtime: atualizações em tempo real podem ser injetadas diretamente no cache.

- Mutations com rollback otimista - o feed atualiza instantaneamente antes da confirmação do servidor.

| **Gerenciamento de Estado** |                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **✅ Escolha:**             | TanStack Query                                                                                                                                                      |
| **❌ Evitar:**              | Redux Toolkit, Zustand, SWR                                                                                                                                         |
| **💡 Motivo:**              | Redux é over-engineering para este caso. SWR não tem suporte a mutations com rollback otimista. TanStack Query cobre todos os casos do Chapadinhos sem boilerplate. |

### 5.2 Zod

Zod define schemas de validação em TypeScript que são reutilizados no frontend e no backend. Para o Chapadinhos:

- Schemas para criação de desafio, registro de atividade e perfil de usuário são definidos uma vez e compartilhados entre o formulário React e o Route Handler.

- Erros de validação tipados - o frontend sabe exatamente qual campo falhou sem parsing manual.

- Integração nativa com React Hook Form (se adotado) e com o cliente do Supabase.

## 6. Qualidade & DX

### 6.1 Biome

Biome substitui ESLint + Prettier em uma única ferramenta escrita em Rust - ordens de magnitude mais rápido que a combinação tradicional.
Para um projeto OSS:

- Configuração zero para começar - opinativo por padrão, sem debaterregras de lint.

- Velocidade: lint + format em <1s mesmo em projetos grandes, tornando o pre-commit hook instantâneo.

- Contribuidores não precisam configurar nada localmente - roda igual em todos os ambientes.

### 6.2 Vitest

Vitest é o runner de testes para o ecossistema Vite/Next.js. Testes unitários são essenciais para as regras de negócio críticas do Chapadinhos:

- Cálculo de pontuação por modo (competitive, casual).

- Lógica de streak semanal (ganho e perda de streak).

- Deduplicação de atividades (Fase 2).

- Condições de vitória (all_who_reach_goal, first_to_goal, etc.).

### 6.3 Playwright

Playwright cobre testes end-to-end dos fluxos críticos da aplicação,
rodando em Chromium, Firefox e WebKit:

- Criar conta → criar desafio → convidar participante.

- Registrar atividade → confirmar aplicação ao desafio → ver leaderboard atualizado.

- Fluxo de feed: reagir e comentar em um registro.

Testes E2E garantem que integrações entre Next.js, Supabase e o cliente React funcionem de ponta a ponta, especialmente após atualizações de dependências.

## 7. Hospedagem

### 7.1 Vercel

Vercel é a plataforma de deploy nativa do Next.js. Para o Chapadinhos:

- Deploy automático a cada push na branch principal - zero configuração de CI/CD para o MVP.

- Preview deployments para cada Pull Request - contribuidores podem revisar mudanças visualmente antes do merge.

- CDN global com edge caching - assets e páginas SSR servidos do datacenter mais próximo do usuário.

- Free tier: 100GB de bandwidth/mês, suficiente para os primeiros meses de um projeto OSS em crescimento.

### 7.2 Supabase (infraestrutura)

O free tier do Supabase inclui: 500MB de banco de dados, 1GB de storage, 50.000 MAUs de autenticação e 2 milhões de mensagens realtime por mês.
Mais que suficiente para o MVP e para os primeiros usuários do Chapadinhos.

Quando necessário, o upgrade para o plano Pro ($25/mês) escala todas as camadas simultaneamente - sem precisar migrar para outra plataforma.

## 8. O Que Evitar e Por Quê

Decisões de "não adotar" são tão importantes quanto as de adoção:

| **Tecnologia**        | **Por que parece atraente**       | **Por que não adotar**                                                                                                          |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Prisma**            | ORM popular, boa DX               | Client pesado (~30MB), fricção em edge runtimes, geração de código extra. Drizzle resolve o mesmo problema com mais leveza.     |
| **Firebase**          | Fácil de começar, Google          | Modelo NoSQL complica queries relacionais essenciais (leaderboard, streak). Vendor lock-in forte. Supabase é open-source.       |
| **Redux / Zustand**   | Gerenciamento de estado "correto" | Boilerplate desnecessário quando TanStack Query já gerencia o estado do servidor, que é 95% do estado do app.                   |
| **NextAuth.js**       | Auth completo para Next.js        | Redundante com Supabase Auth já no projeto. Duas soluções de auth criam complexidade desnecessária.                             |
| **ESLint + Prettier** | Padrão do mercado                 | Lento e requer configuração. Biome faz o mesmo em Rust, com zero config e 10-100x mais rápido.                                  |
| **MUI / Chakra UI**   | Componentes prontos               | Impõem design system forte, difícil de customizar sem sobrescrever muito CSS. shadcn/ui oferece componentes sem lock-in visual. |

## 9. Caminhos de Migração (Quando Escalar)

A stack foi escolhida para escalar progressivamente. Cada componente pode ser substituído de forma independente:

- **API:** Next.js Route Handlers → Hono

  Quando o volume de integrações externas (webhooks do Strava, Garmin) justificar um backend separado, Hono pode ser extraído para um serviço independente sem alterar o frontend.

- **Realtime:** Supabase Realtime → Ably ou Pusher

  Se o número de conexões simultâneas ultrapassar o limite do Supabase, Ably ou Pusher são drop-in replacements com API similar.

- **Banco de dados:** Supabase → PostgreSQL próprio

  Como o Supabase usa PostgreSQL padrão, a migração para uma instância própria (Railway, Render, AWS RDS) é possível sem alterar nenhuma query.

- **Hosting:** Vercel → Cloudflare Pages / AWS

  Next.js suporta múltiplos adapters de deploy. A migração do Vercel para outro provider não requer alterações no código.

---

_Este documento é parte do Spec do Chapadinhos e deve ser atualizado a
cada decisão técnica relevante._
