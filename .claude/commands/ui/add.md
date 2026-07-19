---
description: 'shadcn/ui 컴포넌트를 CLI로 추가하고 Base UI(Radix 아님) 관련 함정을 점검합니다'
argument-hint: '<component-name>'
allowed-tools: ['Bash(npx shadcn add:*)', 'Read', 'Grep', 'Glob']
---

# Claude 명령어: UI Add

이 저장소의 shadcn/ui는 **Base UI 기반**(`@base-ui/react`)이며 **Radix가 아닙니다**. 새 컴포넌트는 직접 코드를 작성하지 말고
반드시 CLI로 생성한 뒤, Base UI 고유의 함정을 점검하세요.

## 사용법

```
/ui:add <component-name>
```

인자: $ARGUMENTS

## 프로세스

1. `npx shadcn add $ARGUMENTS`를 실행해 컴포넌트를 생성한다. 스타일은 `base-nova`(Base UI 백엔드), alias는 `components.json`에 설정된 대로(`@/components`, `@/components/ui`, `@/lib`, `@/hooks`) 따른다.
2. 새로 생성되었거나 수정된 `components/ui/*.tsx` 파일을 Grep으로 점검한다:
   - `asChild` prop이 남아있는지 확인 — Base UI에서는 폴리모픽 렌더링에 `render={<Component />}`(JSX 엘리먼트를 받는 prop)를 사용한다.
   - 인터랙티브 프리미티브(`Button`, `*Close`, dialog/sheet trigger 등)는 기본값이 `nativeButton={true}`다. `render`로 `next/link`의 `<Link>`처럼 네이티브 `<button>`이 아닌 엘리먼트를 넘기는 사용 예가 있다면 `nativeButton={false}`를 명시해야 콘솔 오류가 나지 않는다는 점을 리마인드한다.
3. `app/page.tsx`, `components/layout/mobile-nav.tsx`의 기존 패턴을 폴리모픽 렌더링/`nativeButton` 참고 예시로 안내한다.
4. Radix 기반 shadcn 예제/문서를 그대로 복사하지 않았는지 확인한다 — prop 구성이 다르다.
5. 마지막으로 점검 결과와 "다음 단계" 체크리스트(예: `app/components/page.tsx` 쇼케이스 페이지에 데모 추가 여부)를 요약해서 보고한다.
