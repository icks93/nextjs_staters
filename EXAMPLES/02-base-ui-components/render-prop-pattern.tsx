// 참고용 예제 파일입니다. 실제 페이지에서 쓰려면 필요한 부분만 복사하세요.
// 이 저장소의 shadcn/ui는 Radix가 아니라 Base UI(@base-ui/react) 기반이라
// 폴리모픽 렌더링 방식이 다릅니다: `asChild` 대신 `render={<Element />}`를 씁니다.
"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function RenderPropExamples() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/*
        1) render로 네이티브 버튼이 아닌 엘리먼트(next/link의 <Link>)를 지정하는 경우.
        Button은 기본값이 nativeButton={true}이므로, render 대상이 <button>이
        아니라면 반드시 nativeButton={false}를 명시해야 합니다. 빠뜨리면
        "네이티브 버튼 시맨틱스가 없다"는 콘솔 오류가 발생합니다.
      */}
      <Button render={<Link href="/components" />} nativeButton={false}>
        컴포넌트 쇼케이스로 이동
      </Button>

      {/*
        2) DialogTrigger의 render 대상이 Button(기본적으로 진짜 <button> 엘리먼트)이라면
        nativeButton을 따로 지정할 필요가 없습니다. render 대상 자체가 이미
        네이티브 버튼이기 때문입니다.
      */}
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          다이얼로그 열기
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>render prop 예제</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>닫기</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Radix 기반 shadcn 예제에서 흔히 보이는 형태(이 프로젝트에서는 동작하지 않음):
//
// <Button asChild>
//   <Link href="/components">이동</Link>
// </Button>
//
// 이 저장소에서는 위 코드를 아래처럼 바꿔야 합니다:
//
// <Button render={<Link href="/components" />} nativeButton={false}>
//   이동
// </Button>
