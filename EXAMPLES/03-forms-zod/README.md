# react-hook-form + zod 폼 예제

`app/components/page.tsx`의 `FormShowcase`는 이 프로젝트에 설치된 거의 모든 입력
컴포넌트를 한 폼에 몰아넣은 쇼케이스입니다. 이 폴더는 그보다 훨씬 작고 독립적인
폼 하나(로그인 폼)를 통해 react-hook-form + zod 조합의 최소 패턴만 보여줍니다.

| 파일 | 보여주는 것 |
| --- | --- |
| [`login-form.tsx`](./login-form.tsx) | zod 스키마 정의 → `zodResolver` 연결 → `register`로 필드 바인딩 → 제출/검증/토스트 |

## 핵심 요점

- 스키마(`z.object`)에서 타입(`z.infer`)을 뽑아 `useForm<FormValues>`에 그대로 사용하면
  폼 값 타입과 검증 규칙이 항상 같은 소스에서 나옵니다.
- 단순 텍스트/이메일/비밀번호 필드는 `register(...)`로 충분합니다. `Select`, `RadioGroup`,
  `Switch`, `Checkbox`처럼 값이 문자열/불리언 콜백으로만 오가는 Base UI 컴포넌트는
  `Controller`가 필요합니다(더 큰 예제는 `app/components/page.tsx`의 `FormShowcase` 참고).
- `formState.errors`의 메시지는 zod 스키마에 넣은 한국어 메시지가 그대로 나옵니다.
