// 참고용 예제 파일입니다. 실제로 적용하려면 라우트 세그먼트 폴더 안에
// `error.tsx`라는 이름으로 복사하세요 (예: app/dashboard/error.tsx).
//
// error.tsx는 반드시 Client Component여야 합니다(에러 바운더리 제약).
// Next.js 16.2부터 `unstable_retry()` prop이 추가되었습니다. `reset()`과 달리
// 세그먼트를 다시 fetch하고 다시 렌더링을 시도하므로, 일시적인 오류(네트워크 등)
// 복구에는 reset()보다 unstable_retry()를 우선 사용하는 것이 권장됩니다.
"use client"

import { useEffect } from "react"

interface ErrorPageProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    // 실제 프로젝트에서는 콘솔 대신 로깅 서비스로 전송하세요.
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h2 className="text-lg font-semibold">문제가 발생했습니다.</h2>
      <p className="text-sm text-muted-foreground">
        {error.digest ? `오류 코드: ${error.digest}` : error.message}
      </p>
      <button
        onClick={() => unstable_retry()}
        className="rounded-md border px-4 py-2 text-sm"
      >
        다시 시도
      </button>
    </div>
  )
}
