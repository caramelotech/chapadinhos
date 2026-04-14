# Chapadinhos — Product Spec

**Version:** 0.1 (Draft)  
**Status:** In Review  
**Last Updated:** 2026-04-14

## 1. Overview

Chapadinhos is an open-source, web-native platform que incentiva a prática regular de atividade física — tanto no tracking pessoal quanto em desafios coletivos entre amigos. O usuário pode registrar atividades livremente para acompanhar seus próprios hábitos, e opcionalmente participar de desafios com regras e dinâmicas configuráveis.

A plataforma é inspirada no Gym Rats, mas projetada nativamente para a web (PWA) — sem necessidade de app store, acessível de qualquer dispositivo.

## 2. Problem Statement

Manter consistência nos exercícios é difícil sozinho. A responsabilidade social — saber que seus amigos acompanham seu progresso — melhora significativamente a aderência. As soluções existentes exigem instalação de app nativo, são genéricas demais ou não suportam configurações flexíveis para grupos informais.

**Chapadinhos resolve isso:**

- Sendo zero-fricção para entrar (link web, sem instalação)
- Permitindo tracking pessoal independente de desafios
- Suportando múltiplas dinâmicas de desafio (competitivo ou incentivo leve)
- Sendo gratuito e open-source

## 3. Target Users

**Primário:** Grupos informais de amigos (3–20 pessoas) que querem se exercitar mais juntos.

| Arquétipo             | Descrição                                                                            |
| --------------------- | ------------------------------------------------------------------------------------ |
| **O Organizador**     | Cria e gerencia desafios, convida amigos, define as regras                           |
| **O Participante**    | Entra em desafios, lança atividades, acompanha o progresso do grupo                  |
| **O Tracker Pessoal** | Usa a plataforma apenas para registrar seus próprios hábitos, sem entrar em desafios |

## 4. Goals & Non-Goals

### Goals

- Permitir tracking de atividades físicas independente de desafios
- Permitir criação de desafios públicos ou fechados, com configurações ricas
- Feed social compartilhado por desafio, com reações e comentários
- Suporte a múltiplos modos de desafio (competitivo e casual)
- Lançamentos pessoais podem ser aproveitados nos desafios ativos (com confirmação do usuário)
- Ser funcional como PWA (instalável, offline para views básicas)

### Non-Goals (v1)

- Apps nativos iOS/Android
- Monetização ou tiers pagos
- Desafios em equipe (apenas individual no v1)
- Integração com wearables/apps externos (Fase 2)
- Recomendações de treino por IA

## 5. Core Concepts

### 5.1 Tracking Pessoal

Todo usuário tem um diário pessoal de atividades físicas, independente de qualquer desafio. Ele pode registrar qualquer tipo de atividade (caminhada, musculação, pilates, natação, ciclismo, yoga, etc.) com duração e notas opcionais.

Quando o usuário registra uma atividade e possui desafios ativos, o sistema pergunta se ele deseja aplicar aquele registro a um ou mais desses desafios.

### 5.2 Desafio

O desafio é a entidade central da experiência social. Configurado pelo organizador no momento da criação.

| Campo           | Descrição                                                                          |
| --------------- | ---------------------------------------------------------------------------------- |
| `name`          | Nome do desafio                                                                    |
| `description`   | Regras ou contexto adicional                                                       |
| `visibility`    | `public` (qualquer um pode entrar) ou `private` (convite/username)                 |
| `start_date`    | Início da contagem de pontos                                                       |
| `end_date`      | Fim do desafio — definido por duração preset (1 mês, 6 meses, 1 ano) ou data exata |
| `mode`          | `competitive` ou `casual` (ver §5.3)                                               |
| `scoring_rule`  | Como os pontos são calculados (ver §5.4)                                           |
| `win_condition` | Como o vencedor é determinado (ver §5.5)                                           |
| `status`        | `draft` → `active` → `finished`                                                    |

### 5.3 Modos de Desafio

**Modo Competitivo (`competitive`) — "Modo Insano":**
Foco em maximizar atividades. Vence quem fizer mais dentro das regras definidas. Não há meta semanal; os pontos acumulam livremente conforme a regra de pontuação configurada.

**Modo Casual (`casual`) — "Modo Leve":**
Foco em incentivo e consistência. O organizador define uma meta recorrente semanal (ex: "3 atividades por semana"). O sistema acompanha semanas completas:

- Semana em que o usuário **atinge a meta** → ganha 1 ponto de semana e mantém o streak
- Semana em que **não atinge** → **perde o streak** e não acumula ponto naquela semana

O modo casual ainda possui leaderboard, ordenado por pontos de semana acumulados.

### 5.4 Regras de Pontuação (`scoring_rule`)

| Regra          | Descrição                                             | Modo        |
| -------------- | ----------------------------------------------------- | ----------- |
| `daily_cap_1`  | Máximo 1 atividade contada por dia                    | Ambos       |
| `daily_cap_n`  | Máximo N atividades contadas por dia (N configurável) | Competitivo |
| `unlimited`    | Todas as atividades do dia contam                     | Competitivo |
| `target_count` | Vence quem atingir X atividades no total primeiro     | Competitivo |
| `weekly_goal`  | Meta de N atividades por semana                       | Casual      |

Duração mínima por atividade para contar: configurável pelo organizador (padrão: 30 minutos).

### 5.5 Condições de Vitória (`win_condition`)

| Condição             | Descrição                                                          |
| -------------------- | ------------------------------------------------------------------ |
| `most_points`        | Quem tiver mais pontos ao final vence (único vencedor)             |
| `first_to_goal`      | Primeiro a atingir N pontos vence                                  |
| `all_who_reach_goal` | Todos que atingirem N pontos vencem                                |
| `top_n`              | Top N participantes ao final vencem                                |
| `streak_champion`    | Quem mantiver maior streak semanal consecutiva vence (modo casual) |

### 5.6 Acesso ao Desafio

| Tipo        | Como entrar                                                             |
| ----------- | ----------------------------------------------------------------------- |
| **Público** | Listado publicamente; qualquer usuário com conta pode entrar            |
| **Privado** | Organizador adiciona por `@username` **ou** envia link de convite único |

### 5.7 Atividade Física

O sistema não restringe tipo de atividade — qualquer exercício conta. O usuário seleciona de uma lista pré-definida ou digita livremente.

Categorias sugeridas: Musculação, Caminhada, Corrida, Ciclismo, Natação, Pilates, Yoga, Funcional, Artes Marciais, Esportes Coletivos, Outro.

Campos de um registro de atividade:

| Campo                   | Descrição                                                                   |
| ----------------------- | --------------------------------------------------------------------------- |
| `date`                  | Data da atividade                                                           |
| `activity_type`         | Tipo (da lista ou livre)                                                    |
| `duration_minutes`      | Duração em minutos                                                          |
| `notes`                 | Texto livre opcional                                                        |
| `source`                | `manual` \| `strava` \| `apple_health` \| `google_fit` \| `garmin` (Fase 2) |
| `applied_to_challenges` | Lista de desafios onde este registro foi contabilizado                      |

### 5.8 Feed

O feed é o coração da experiência social. Existem dois contextos de feed:

**Feed de Desafio:** Feed cronológico compartilhado entre todos os membros de um desafio específico, exibindo todos os registros de atividade aplicados àquele desafio.

**Feed Pessoal:** Agrega os próprios lançamentos do usuário e os registros de todos os desafios em que ele participa, em ordem cronológica reversa.

Interações suportadas por item do feed:

- **Reações** com emoji (set pré-definido ou emoji livre)
- **Comentários** em texto — qualquer membro do desafio pode comentar
- Usuário pode deletar seus próprios comentários e reações

## 6. User Stories

### Conta & Perfil

- Como usuário, posso criar uma conta com e-mail ou Google OAuth
- Como usuário, defino um `@username` único no cadastro, usado por outros para me convidar
- Como usuário, posso editar meu perfil (nome, foto, bio curta)

### Tracking Pessoal

- Como usuário, posso registrar uma atividade física a qualquer momento, mesmo sem estar em desafio algum
- Como usuário, vejo meu histórico pessoal em uma view de calendário ou lista
- Como usuário, ao registrar uma atividade com desafios ativos, sou perguntado se desejo aplicá-la a algum deles
- Como usuário, posso selecionar múltiplos desafios para aplicar o mesmo registro
- Como usuário, posso editar ou deletar um registro do dia atual

### Desafios — Criação

- Como organizador, posso criar um desafio definindo: nome, visibilidade, duração (preset ou data), modo, regra de pontuação, condição de vitória e duração mínima de atividade
- Como organizador, posso adicionar participantes por `@username` ou gerar um link de convite
- Como organizador, posso encerrar um desafio antecipadamente
- Como organizador, posso editar as configurações enquanto o desafio está em `draft`

### Desafios — Participação

- Como usuário, posso buscar e entrar em desafios públicos
- Como usuário, posso entrar em um desafio privado via link de convite ou ser adicionado por `@username`
- Como participante, vejo todos os desafios ativos e passados em que estou inscrito
- Como participante, posso sair de um desafio antes de ele começar

### Pontuação & Progresso

- Como participante, vejo o leaderboard em tempo real do desafio
- Como participante (modo casual), vejo meu streak semanal atual e histórico
- Como participante, vejo um calendário com os dias em que registrei atividade dentro do desafio
- Como qualquer usuário, posso ver os resultados finais de um desafio encerrado

### Feed Social

- Como participante, vejo o feed do desafio com os registros de todos os membros em ordem cronológica
- Como usuário, tenho um feed pessoal que agrega meus lançamentos e os dos desafios em que participo
- Como usuário, posso reagir com emoji a qualquer item do feed
- Como usuário, posso comentar em qualquer item do feed
- Como usuário, posso deletar meus próprios comentários e reações

### Notificações

- Como participante, posso ativar notificações push (PWA) para lembrar de registrar atividade
- Como participante, recebo notificação quando um desafio encerra e os resultados estão disponíveis
- Como usuário, recebo notificação quando alguém reage ou comenta em um meu registro

## 7. Feature Scope por Fase

### Fase 1 — Foundation (MVP)

- Auth (e-mail + Google OAuth) com `@username`
- Tracking pessoal de atividades
- Criação de desafios (público e privado) com todos os modos e condições
- Convite por `@username` e link
- Aplicação de registro pessoal a desafios ativos (com confirmação)
- Leaderboard em tempo real
- Feed por desafio com reações e comentários
- Feed pessoal agregado
- Ciclo de vida do desafio (`draft` → `active` → `finished`)
- PWA manifest + cache offline básico

### Fase 2 — Integrações

- Strava OAuth
- Apple Health (HealthKit Web API)
- Google Fit / Health Connect
- Garmin Connect
- Deduplicação de registros (manual vs. importado)

### Fase 3 — Polish & Engajamento

- Notificações push (PWA)
- Visualização de streak e calendário aprimorado
- Dashboard de histórico pessoal e estatísticas
- Card de resultados compartilhável (export de imagem)
- Página de discovery de desafios públicos

## 8. Data Model (Conceitual)

```
User
  id, username (único), name, email, avatar_url
  timezone, created_at

Challenge
  id, name, description
  organizer_id (→ User)
  visibility (public|private)
  start_date, end_date
  mode (competitive|casual)
  scoring_rule (daily_cap_1|daily_cap_n|unlimited|target_count|weekly_goal)
  daily_cap            -- usado quando scoring_rule = daily_cap_n
  weekly_goal_count    -- usado quando scoring_rule = weekly_goal
  target_count         -- usado quando win_condition = first_to_goal ou target_count
  min_activity_duration_minutes (default: 30)
  win_condition (most_points|first_to_goal|all_who_reach_goal|top_n|streak_champion)
  goal_points          -- usado em all_who_reach_goal e first_to_goal
  top_n_count          -- usado em top_n
  invite_code (único, para privados)
  status (draft|active|finished)
  created_at

ChallengeParticipant
  challenge_id (→ Challenge), user_id (→ User)
  joined_at
  points               -- derivado
  current_streak_weeks -- derivado, modo casual
  is_winner            -- computado ao encerrar

ActivityLog
  id, user_id (→ User)
  date (DATE), activity_type, duration_minutes
  notes, source (manual|strava|...), external_id
  created_at

ChallengeActivityLog   -- junção: um registro pode ser aplicado a N desafios
  activity_log_id (→ ActivityLog)
  challenge_id (→ Challenge)
  counted_points       -- pontos que este registro gerou neste desafio

FeedItem
  id, user_id (→ User)
  challenge_id (→ Challenge, nullable -- null = lançamento pessoal puro)
  activity_log_id (→ ActivityLog)
  created_at

Reaction
  id, feed_item_id (→ FeedItem), user_id (→ User)
  emoji, created_at

Comment
  id, feed_item_id (→ FeedItem), user_id (→ User)
  body, created_at, deleted_at

Integration            -- Fase 2
  id, user_id (→ User)
  provider (strava|apple_health|google_fit|garmin)
  access_token, refresh_token, expires_at, last_synced_at
```

**Constraints importantes:**

- `username` é único globalmente
- `(user_id, provider, external_id)` único → evita duplicação de importações
- Pontos são sempre **derivados** de `ChallengeActivityLog`, nunca armazenados diretamente
- Um `ActivityLog` pode existir sem estar vinculado a nenhum desafio (tracking pessoal puro)
- Streak semanal é recalculado a cada semana fechada no modo casual

## 9. Decisões Técnicas (Recomendadas)

| Preocupação    | Recomendação               | Justificativa                              |
| -------------- | -------------------------- | ------------------------------------------ |
| Frontend       | Next.js (App Router)       | SSR, PWA, ótimo DX                         |
| Estilização    | Tailwind CSS               | Rápido, consistente                        |
| Backend        | Next.js API Routes ou Hono | Stack mínima para OSS                      |
| Banco de dados | PostgreSQL via Supabase    | Modelo relacional, auth + realtime incluso |
| Auth           | Supabase Auth              | Google OAuth + magic link out-of-the-box   |
| Realtime       | Supabase Realtime          | Feed e leaderboard ao vivo                 |
| Hosting        | Vercel + Supabase          | Free tier generoso para OSS                |
| PWA            | Serwist                    | Service worker + manifest                  |

## 10. UX Flow (Happy Path)

```
1. Usuário cria conta → define @username
2. Registra sua primeira atividade (tracking pessoal)
   → Sistema pergunta: "Aplicar a algum desafio ativo?" → Nenhum ainda; segue
3. Cria um desafio:
   - Nome: "Abril Chapado"
   - Visibilidade: Privado
   - Duração: 1 mês (1 abr → 30 abr)
   - Modo: Casual
   - Meta semanal: 3 atividades/semana
   - Win condition: streak_champion
4. Adiciona amigos por @username + envia link de convite
5. Amigos entram → desafio inicia em 1 abr
6. Cada dia, participantes registram atividades
   → Se já registraram no tracking pessoal naquele dia, confirmam aplicação ao desafio
   → Feed do desafio atualiza em tempo real; membros reagem e comentam
7. Ao fim de cada semana: quem bateu 3 atividades ganha 1 ponto e mantém streak
   quem não bateu perde streak e não pontua naquela semana
8. Em 30 abr: desafio encerra → resultados exibidos → quem tem maior streak vence
```

## 11. Open Questions

| #   | Questão                                                                                                       | Prioridade |
| --- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| 1   | Um registro editado (duração, tipo) após ser aplicado a um desafio deve recalcular os pontos automaticamente? | Alta       |
| 2   | Participantes podem lançar atividades retroativas para dias passados? Há limite de tempo (ex: até 48h atrás)? | Alta       |
| 3   | No modo casual, a semana começa em domingo ou segunda? É configurável pelo organizador?                       | Média      |
| 4   | Desafios públicos são listados em alguma página de discovery? Há moderação mínima de conteúdo?                | Média      |
| 5   | O organizador pode remover um participante de um desafio ativo?                                               | Média      |
| 6   | Como tratar fusos horários diferentes entre participantes do mesmo desafio?                                   | Média      |
| 7   | Comentários suportam menções (@username) com notificação?                                                     | Baixa      |
| 8   | Há limite de participantes por desafio?                                                                       | Baixa      |

## 12. Métricas de Sucesso (v1)

| Métrica                                            | Meta                                                       |
| -------------------------------------------------- | ---------------------------------------------------------- |
| Taxa de conclusão de desafio                       | ≥ 60% dos participantes atingem a meta no primeiro desafio |
| Retenção D1→D7                                     | ≥ 70% registram ao menos 1 atividade na primeira semana    |
| Média de registros diários por usuário ativo       | ≥ 0.7 (≈ 5 dias/semana)                                    |
| Tempo até primeiro registro após entrar em desafio | < 24h para ≥ 50% dos participantes                         |
| Engajamento no feed                                | ≥ 1 reação ou comentário por usuário ativo por semana      |

## 13. Fora do Escopo (explicitamente)

- Pagamentos ou tiers pagos
- Apps nativos (iOS/Android)
- Desafios em equipe (v1)
- Funcionalidades de IA
- Integração com wearables (Fase 2, não v1)
- Moderação de conteúdo público

---

_Este spec é um documento vivo. Abra uma issue ou PR no repositório para propor alterações._
