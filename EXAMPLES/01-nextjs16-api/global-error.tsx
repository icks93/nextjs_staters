// 참고용 예제 파일입니다. 실제로 적용하려면 프로젝트에 단 하나만 존재해야 하는
// `app/global-error.tsx`로 복사하세요.
//
// global-error.tsx는 루트 레이아웃(app/layout.tsx) 자체에서 발생한 오류를 잡습니다.
// 활성화되면 루트 레이아웃/template을 완전히 대체하므로, 이 파일이 직접
// <html>/<body> 태그를 정의해야 합니다. 에러 바운더리 제약 때문에 Client
// Component여야 하고, 그래서 metadata / generateMetadata export는 사용할 수 없습니다.
"use client"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-xl font-semibold">애플리케이션에 심각한 오류가 발생했습니다.</h1>
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
      </body>
    </html>
  )
}
