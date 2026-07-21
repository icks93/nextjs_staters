# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 제공하는 가이드입니다.

@AGENTS.md

## ⚠️ 일반적인 Next.js가 아닙니다 — 코드 작성 전 문서부터 확인

이 저장소는 **Next.js 16.2.10**(App Router, 기본 컴파일러는 Turbopack)으로 고정되어 있으며, 학습 데이터 기준의 Next.js와 다른 브레이킹 체인지가 있습니다. 라우팅, 데이터 페칭, 미들웨어, 이미지, 캐싱을 건드리기 전에 `node_modules/next/dist/docs/01-app/` 아래 관련 문서를 먼저 읽으세요. `EXAMPLES/01-nextjs16-api/`에 이 브레이킹 체인지들(`proxy.ts`, 비동기 `params`/`searchParams`, `unstable_retry()`를 쓰는 `error.tsx`, `global-error.tsx`)의 실제 동작 예제가 있으니 참고하세요. `/next:docs-check` 슬래시 명령을 쓰면 이 문서 확인 과정을 대신 진행해줍니다. 여기서 특히 중요한 차이점:

- `middleware.ts`는 사라졌습니다 — 대신 `proxy.ts`를 사용합니다(`middleware` export가 `proxy`로 이름이 바뀌었고, Edge가 아닌 Node.js 런타임만 지원).
- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`는 **완전히 비동기 전용**입니다. 예전처럼 동기로 접근할 수 있는 호환 시프트는 더 이상 없습니다.
- 루트 레이아웃 단계의 오류는 `global-error.tsx`에서만 잡힙니다(자체 `<html>/<body>`를 정의해야 하며 `metadata`는 사용 불가). 라우트 단위 `error.tsx`는 `reset()`과 함께 `unstable_retry()`도 받을 수 있습니다.
- `next/image`: `priority` → `preload`, `images.domains` → `images.remotePatterns`로 변경되었습니다.

## 명령어

```bash
npm run dev     # Turbopack 기반 개발 서버 실행 (포트는 아래 "dev 서버 2개" 참고)
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 빌드 실행
npm run lint    # ESLint 검사 (eslint.config.mjs, flat config)
```

이 저장소에는 테스트 스크립트/테스트 파일이 없습니다(`test` 스크립트 없음) — 테스트가 존재한다고 가정하지 마세요.

### ⚠️ 이 컴퓨터에는 dev 서버가 2개 떠 있을 수 있습니다

이 컴퓨터에는 형제 프로젝트 `claude-nextjs-starterkit`(주의: **starter*kit***, 단수형)도 있고, 이 프로젝트가 `next dev`를 실행할 때 대개 3000번 포트를 먼저 선점합니다. 3000번 포트가 기대와 다르게 동작한다면(예: `/components`가 404를 반환하거나, 콘솔 오류 스택트레이스 경로가 `...starters\...`가 아니라 `...starterkit\...`을 가리키는 경우), 이 저장소의 dev 서버는 십중팔구 **3001번**(또는 다른 포트)으로 밀려난 상태입니다. "버그"를 진단하기 전에 이 저장소의 서버가 실제로 어느 포트에서 떠 있는지(`next dev` 터미널 출력 확인, 또는 리스닝 중인 프로세스의 PID/작업 디렉터리 대조 등으로) 먼저 확인하세요 — 3000번이 이 프로젝트라고 단정하지 마세요.

## 아키텍처

**스택**: Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4 + Base UI 기반 shadcn/ui(`@base-ui/react`, **Radix 아님**) + react-hook-form/zod + next-themes + sonner.

**라우트(단 2개)**: `/`(`app/page.tsx`, 랜딩 페이지)와 `/components`(`app/components/page.tsx`, 설치된 모든 shadcn/ui 프리미티브와 react-hook-form + zod 폼을 시연하는 `"use client"` 쇼케이스). `app/components/page.tsx`는 이 저장소에서 상호작용 표면적이 가장 넓은 파일이라, 인터랙티브 컴포넌트 관련 버그는 대부분 여기서 먼저 드러납니다.

**Provider 트리** (`app/layout.tsx`): `ThemeProvider`(next-themes, class 기반 다크모드, `defaultTheme="system"`) → `TooltipProvider`(Base UI, 앱 전체를 감싸서 어디서든 `Tooltip` 사용 가능) → `Header` / `{children}` / `Footer` / `Toaster`(sonner).

**shadcn/ui는 Radix가 아니라 Base UI 기반입니다** — `components/ui/`를 추가하거나 수정할 때 가장 먼저 기억해야 할 사항입니다. 실제로 문제가 되는 API 차이점:
- 폴리모픽 렌더링은 Radix의 `asChild` 대신 `render={<Component />}`(JSX 엘리먼트를 받는 prop)를 사용합니다.
- `Button`, `SheetClose`, dialog trigger/close 등 인터랙티브 프리미티브는 기본값이 `nativeButton={true}`라서 `render`로 지정한 엘리먼트가 네이티브 `<button>`이라고 가정합니다. `render`가 `next/link`의 `<Link>`처럼 다른 엘리먼트를 가리킨다면 `nativeButton={false}`를 명시하지 않으면 Base UI가 네이티브 버튼 시맨틱스가 없다는 콘솔 오류를 남깁니다. 패턴은 `app/page.tsx`와 `components/layout/mobile-nav.tsx`를 참고하세요.
- Radix 기반 shadcn 예제/문서를 그대로 복사하지 마세요 — prop 구성이 다릅니다.

**새 shadcn/ui 컴포넌트 추가**: 직접 코드를 작성하지 말고 CLI를 사용하세요 — `npx shadcn add <이름>`. 이 저장소에는 `/ui:add` 슬래시 명령이 있어 같은 CLI를 호출하면서 생성된 코드에 Radix 잔재(`asChild` 등)가 남아있는지도 함께 검증해줍니다. 스타일은 `base-nova`(Base UI 백엔드)이며 `components.json`에 설정되어 있습니다(alias: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`; base color `neutral`; CSS 변수는 `app/globals.css`). `render`/`nativeButton` 패턴 예제는 `EXAMPLES/02-base-ui-components/`에서도 확인할 수 있습니다.

**폴더 구조**:
```
app/
  layout.tsx           루트 레이아웃 (위 provider 트리)
  page.tsx              랜딩 페이지 (/)
  components/page.tsx   컴포넌트 쇼케이스 (/components)
components/
  ui/                   shadcn/ui 프리미티브 (Base UI 기반) — `npx shadcn add`로 재생성, 직접 작성 금지
  layout/                Header, Footer, MobileNav(Sheet 기반), Container, NAV_ITEMS(내비게이션 링크의 단일 소스, nav-items.ts)
  common/                여러 페이지에서 쓰는 공통 빌딩 블록, 예: PageHeader
  theme-provider.tsx     next-themes 래퍼
  theme-toggle.tsx       드롭다운 기반 테마 전환 버튼 (Base UI DropdownMenu + useTheme)
lib/
  utils.ts               cn() — clsx + tailwind-merge 클래스 병합, ui/ 의 모든 컴포넌트가 사용
```

내비게이션 링크는 한 곳(`components/layout/nav-items.ts`)에만 존재하며 `Header`와 `MobileNav`가 이를 함께 사용합니다 — 새 라우트를 추가할 때는 여러 컴포넌트에 링크를 하드코딩하지 말고 이 파일에 추가하세요.

저장소 루트에는 위 트리 외에 다음 두 디렉터리도 있습니다:
- `EXAMPLES/`: 실제 라우트가 아닌 참고용 코드 모음(`01-nextjs16-api`, `02-base-ui-components`, `03-forms-zod`). 각 파일 상단 주석에 실사용 시 복사할 목적지 경로가 안내되어 있습니다.
- `.claude/agents/`, `.claude/commands/`: 이 저장소 전용 서브에이전트(code-reviewer, test-runner)와 슬래시 명령(`git:commit`, `next:docs-check`, `ui:add`)이 구성되어 있습니다.

## 참고 사항

- `.mcp.json`에 Playwright MCP 서버(`@playwright/mcp`, 실행 중인 앱을 브라우저 자동화로 조작/점검), `context7`(라이브러리 최신 문서 조회), `sequential-thinking`(복잡한 문제를 단계적으로 분석) 서버가 등록되어 있습니다.
- 이 코드베이스는 전반적으로 한국어를 작업 언어로 사용합니다: UI 문구, `README.md`, 커밋 메시지는 한국어로 작성하고 식별자(변수명/함수명)는 영어를 유지합니다.
