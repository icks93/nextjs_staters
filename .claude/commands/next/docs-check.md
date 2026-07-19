---
description: '라우팅/데이터페칭/미들웨어/이미지/캐싱을 건드리기 전에 Next.js 16 브레이킹 체인지 문서를 확인합니다'
argument-hint: '[topic]'
allowed-tools: ['Read', 'Glob', 'Grep']
---

# Claude 명령어: Next Docs Check

이 저장소는 **Next.js 16.2.10**으로 고정되어 있고, 학습 데이터 기준의 Next.js와 다른 브레이킹 체인지가 있습니다.
라우팅, 데이터 페칭, 미들웨어, 이미지, 캐싱을 건드리기 전에 `node_modules/next/dist/docs/01-app/` 아래 관련 문서부터 확인하세요.

## 사용법

```
/next:docs-check [topic]
```

`topic`이 없으면 지금 대화에서 다루고 있는 파일/변경사항을 보고 관련 주제(라우팅, 데이터 페칭, 미들웨어, 이미지, 캐싱 등)를 스스로 판단합니다.

인자: $ARGUMENTS

## 프로세스

1. `topic`(또는 판단한 주제)과 관련된 문서를 `node_modules/next/dist/docs/01-app/` 아래에서 Glob/Grep으로 찾는다.
2. 찾은 문서를 읽고, 이 저장소 `AGENTS.md`/`CLAUDE.md`에 이미 정리된 브레이킹 체인지와 대조한다:
   - `middleware.ts`는 사라졌고 `proxy.ts`(Node.js 런타임 전용, `middleware` export → `proxy`)를 사용해야 함
   - `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`는 완전히 비동기 전용 — 동기 접근 호환 시프트 없음
   - 루트 레이아웃 단계 오류는 `global-error.tsx`에서만 잡히며 자체 `<html>/<body>`가 필요하고 `metadata`는 사용 불가. 라우트 단위 `error.tsx`는 `reset()`과 함께 `unstable_retry()`도 받을 수 있음
   - `next/image`: `priority` → `preload`, `images.domains` → `images.remotePatterns`
3. 지금 작업 중이거나 작업 예정인 코드가 구식 관례(동기 `params` 접근, `middleware.ts`, `images.domains`, `priority` prop 등)를 쓰고 있지 않은지 점검한다.
4. 점검 결과를 체크리스트 형태로 요약해서 보고한다. **코드는 직접 수정하지 않는다** — 수정이 필요하면 그 사실만 보고하고 별도 요청을 기다린다.

## 참고

- `EXAMPLES/01-nextjs16-api/`에 이 브레이킹 체인지들을 실제로 동작하는 코드로 보여주는 참고 예제(`proxy.ts`, `dynamic-route-page.tsx`, `error-with-retry.tsx`, `global-error.tsx`)가 있으니 비교 기준으로 활용할 수 있다.
