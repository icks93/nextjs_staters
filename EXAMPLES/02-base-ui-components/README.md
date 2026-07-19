# Base UI 기반 shadcn/ui 컴포넌트 사용 예제

이 프로젝트의 `components/ui/`는 **Radix가 아니라 Base UI**(`@base-ui/react`) 위에 만들어진
shadcn/ui입니다. 인터넷에서 흔히 보는 Radix 기반 shadcn 예제를 그대로 복사하면 prop이 맞지
않아 동작하지 않습니다. 이 폴더의 예제는 실제로 다른 부분만 모아서 보여줍니다.

| 파일 | 보여주는 것 |
| --- | --- |
| [`render-prop-pattern.tsx`](./render-prop-pattern.tsx) | `asChild` 대신 `render={<Element />}` prop, `nativeButton={false}` |

## 핵심 요점

- 폴리모픽 렌더링: Radix `asChild` → Base UI `render={<Component />}` (JSX 엘리먼트를 직접 전달).
- `Button`, `SheetClose`, Dialog/Popover/DropdownMenu의 trigger·close 등 인터랙티브
  프리미티브는 기본값이 `nativeButton={true}`입니다. `render`로 지정한 엘리먼트가
  `next/link`의 `<Link>`처럼 네이티브 `<button>`이 아니라면 `nativeButton={false}`를
  명시해야 콘솔 경고(네이티브 버튼 시맨틱스 없음)가 사라집니다.
- 실제 사용 예시는 `components/layout/mobile-nav.tsx`, `app/page.tsx`, `app/components/page.tsx`를
  참고하세요. 이 폴더의 예제는 그 패턴을 하나로 정리한 것입니다.
