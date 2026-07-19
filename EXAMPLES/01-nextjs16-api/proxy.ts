// 참고용 예제 파일입니다. 실제로 적용하려면 프로젝트 루트(app/ 폴더와 같은 레벨)에
// `proxy.ts`라는 이름으로 복사해야 활성화됩니다. 이 위치(EXAMPLES/) 에 있는 동안에는
// Next.js가 라우트/proxy로 인식하지 않습니다.
//
// Next.js 16부터 `middleware.ts`는 사라지고 `proxy.ts`로 이름이 바뀌었습니다.
// export하는 함수 이름도 `middleware` → `proxy`로 바뀌었고, Edge 런타임이 아닌
// Node.js 런타임만 지원합니다(`runtime` config 옵션 사용 불가).

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 비동기 로직이 필요하면 async로 선언할 수 있습니다.
export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has("session")

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// matcher를 지정하지 않으면 정적 파일까지 포함한 모든 요청에서 proxy가 실행되므로
// 반드시 필요한 경로만 지정하세요.
export const config = {
  matcher: ["/dashboard/:path*"],
}
