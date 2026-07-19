// 참고용 예제 파일입니다. 실제 동적 라우트를 만들 때는 이 내용을
// `app/blog/[slug]/page.tsx` 같은 경로로 복사해서 사용하세요.
//
// Next.js 16에서는 `params`와 `searchParams`가 완전히 비동기 전용입니다.
// 예전처럼 `params.slug`로 동기 접근할 수 있는 호환 시프트는 없으므로
// 반드시 await 하거나 React의 `use()` 훅으로 언래핑해야 합니다.

interface PageProps {
  // Promise로 온다는 점이 핵심입니다.
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { ref } = await searchParams

  return (
    <article>
      <h1>게시글: {slug}</h1>
      {ref && <p className="text-muted-foreground">유입 경로: {ref}</p>}
    </article>
  )
}

// 클라이언트 컴포넌트에서는 async 함수를 컴포넌트로 쓸 수 없으므로,
// React의 `use()` 훅으로 Promise를 언래핑합니다.
//
// "use client"
// import { use } from "react"
//
// export default function BlogPostPageClient({ params }: PageProps) {
//   const { slug } = use(params)
//   return <h1>게시글: {slug}</h1>
// }
