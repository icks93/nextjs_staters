# Next Starter Kit

빠르게 웹 개발을 시작할 수 있도록 구성된 모던 웹 스타터킷입니다.

## 기술스택

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Base UI 기반, `base-nova` 스타일)
- [lucide-react](https://lucide.dev) 아이콘
- [next-themes](https://github.com/pacocoursey/next-themes) 다크모드
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) 폼 검증
- [sonner](https://sonner.emilkowal.ski) 토스트 알림

## 시작하기

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 결과를 확인하세요. `/components` 경로에서 설치된 shadcn/ui 컴포넌트 데모를 볼 수 있습니다.

## 폴더 구조

```
app/
  layout.tsx          루트 레이아웃 (ThemeProvider, Header, Footer, Toaster)
  page.tsx             랜딩 페이지
  components/page.tsx  컴포넌트 쇼케이스
components/
  ui/                  shadcn/ui 컴포넌트
  layout/              Header, Footer, MobileNav, Container
  common/               PageHeader 등 페이지 공통 컴포넌트
  theme-provider.tsx    next-themes 래퍼
  theme-toggle.tsx      다크모드 토글 버튼
lib/
  utils.ts             cn() 클래스 병합 유틸
```

## 자주 쓰는 명령어

```bash
npm run dev     # 개발 서버 실행
npm run build   # 프로덕션 빌드
npm run lint    # ESLint 검사
```

## 컴포넌트 추가하기

이 프로젝트는 `components.json`에 `base-nova` 스타일(Base UI 기반)로 구성되어 있습니다. 새 shadcn/ui 컴포넌트가 필요하면 다음 명령으로 추가하세요.

```bash
npx shadcn add <컴포넌트명>
# 예: npx shadcn add table
```

## 주의사항

이 프로젝트의 Next.js 버전은 최신 브레이킹 체인지가 반영되어 있습니다(`proxy.ts`로 미들웨어 대체, `params`/`searchParams`/`cookies()`/`headers()` 전면 async화, Turbopack 기본 사용 등). 코드 작성 전 `node_modules/next/dist/docs/`의 관련 가이드를 참고하세요. 자세한 내용은 `AGENTS.md`를 확인하세요.
