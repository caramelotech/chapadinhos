# chapadinhos - front

Interface web do Chapadinhos, construída com Next.js 14 (App Router), TypeScript e Tailwind CSS.

## Stack

- **Next.js 14** com App Router
- **TypeScript** com strict mode
- **Tailwind CSS** para estilização
- **ESLint** com configuração do Next.js

## Estrutura

```
src/
├── app/
│   ├── access/          - páginas de autenticação (login e cadastro)
│   ├── dashboard/       - página principal após login
│   ├── layout.tsx       - layout raiz da aplicação
│   └── globals.css      - estilos globais
├── components/
│   ├── AccessLayout.tsx - layout compartilhado das páginas de acesso
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── Logo.tsx
│   ├── MainLayout.tsx   - layout principal com menu lateral
│   └── SideMenu.tsx
└── helpers/
    └── validatePathname.js
```

O alias `@/*` mapeia para `src/*`.

## Comandos

```bash
npm run dev     # servidor de desenvolvimento (localhost:3000)
npm run build   # build de produção
npm run start   # inicia o servidor de produção
npm run lint    # ESLint
```
