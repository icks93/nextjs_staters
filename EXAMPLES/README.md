# EXAMPLES

이 폴더는 프로젝트 실제 라우팅(`app/`)에는 포함되지 않는 **참고용 예제 코드 모음**입니다.
`CLAUDE.md`에 정리된 이 저장소 고유의 규칙(특히 Next.js 16의 브레이킹 체인지, Base UI 기반 shadcn/ui)을
실제로 동작하는 코드로 확인하고 싶을 때 참고하세요.

> ⚠️ 이 저장소는 `/`, `/components` 두 라우트만 공식적으로 유지합니다. 아래 예제를 실제로 써보려면
> 각 파일 상단 주석에 적힌 목적지 경로로 **복사**한 뒤 사용하세요. `EXAMPLES/` 폴더 자체는 `app/`
> 바깥에 있으므로 Next.js가 라우트나 proxy로 인식하지 않습니다.

## 폴더 구성

- [`01-nextjs16-api/`](./01-nextjs16-api) — Next.js 16의 신규/변경 API 예제
  (`proxy.ts`, 비동기 `params`/`searchParams`, `error.tsx`의 `unstable_retry()`, `global-error.tsx`)
- [`02-base-ui-components/`](./02-base-ui-components) — Base UI 기반 shadcn/ui 컴포넌트 사용 패턴
  (`render` prop, `nativeButton={false}`)
- [`03-forms-zod/`](./03-forms-zod) — react-hook-form + zod 폼 예제 (독립 컴포넌트)

각 하위 폴더에는 별도의 `README.md`가 있습니다.
