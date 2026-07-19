# Next.js 16 신규 API 예제

`AGENTS.md` / `CLAUDE.md`에서 경고하는 것처럼 이 저장소는 Next.js 16으로 고정되어 있고,
학습 데이터 기준의 Next.js와 다른 브레이킹 체인지가 있습니다. 아래 파일들은 각 변경점을
실제로 동작하는 최소 예제로 보여줍니다.

| 파일 | 보여주는 것 | 실제 사용 시 위치 |
| --- | --- | --- |
| [`proxy.ts`](./proxy.ts) | `middleware.ts` → `proxy.ts` 전환, Node.js 런타임 | 프로젝트 루트 (`app/`과 같은 레벨) |
| [`dynamic-route-page.tsx`](./dynamic-route-page.tsx) | 완전 비동기인 `params` / `searchParams` | `app/blog/[slug]/page.tsx` 등 동적 라우트 |
| [`error-with-retry.tsx`](./error-with-retry.tsx) | 라우트 단위 `error.tsx`의 `unstable_retry()` | `app/(어떤 라우트)/error.tsx` |
| [`global-error.tsx`](./global-error.tsx) | 루트 레이아웃 오류를 잡는 `global-error.tsx` | `app/global-error.tsx` (프로젝트에 유일하게 하나만) |

## 핵심 요점

- `middleware` export는 더 이상 없습니다. `proxy` export를 사용하고, Edge가 아닌 Node.js 런타임만 지원합니다.
- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`는 동기 접근 호환 시프트가 전혀 없습니다.
  반드시 `await` 하거나 `use()` 훅으로 언래핑해야 합니다.
- `error.tsx`는 `reset()` 대신 `unstable_retry()`를 우선 사용하세요. `reset()`은 재요청 없이 상태만 초기화하고,
  `unstable_retry()`는 세그먼트를 다시 fetch/렌더링합니다.
- `global-error.tsx`는 자체 `<html>`/`<body>`를 정의해야 하며 `metadata`/`generateMetadata`를 사용할 수 없습니다.
