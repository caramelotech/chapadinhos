# chapadinhos - api

API do Chapadinhos, responsável pela lógica de negócio dos desafios de atividade física: criação de desafios, registro de atividades e contagem de pontos.

## Stack

- **TypeScript** (ES2016, CommonJS)
- **Jest** com `@swc/jest` para transpilação rápida nos testes
- **ESLint** + **Prettier** para qualidade e formatação de código

## Estrutura

```
src/
├── app.ts       - entrypoint da aplicação
└── *.spec.ts    - arquivos de teste (padrão reconhecido pelo Jest)
```

## Comandos

```bash
npm test              # executa os testes com cobertura (relatório HTML + texto)
npm run format        # verifica formatação com Prettier
npm run format:fix    # corrige formatação automaticamente
```

## Testes

Os testes usam Jest com `@swc/jest` como transformador. O Jest coleta cobertura automaticamente e gera relatórios em `coverage/`. Arquivos de teste devem seguir o padrão `**/*.spec.ts` ou estar dentro de pastas `__tests__/`.
