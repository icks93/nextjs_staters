import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STACK = [
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "lucide-react",
];

export default function Home() {
  return (
    <Container className="flex flex-col items-center gap-8 py-24 text-center sm:py-32">
      <Badge variant="secondary">App Router · Base UI 기반 shadcn/ui</Badge>

      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          빠르게 시작하는 모던 웹 스타터킷
        </h1>
        <p className="mx-auto max-w-xl text-balance text-muted-foreground">
          레이아웃, 다크모드, shadcn/ui 컴포넌트가 이미 준비되어 있습니다.
          바로 페이지를 만들고 기능을 붙이세요.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {STACK.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/components" />} nativeButton={false}>
          컴포넌트 쇼케이스 보기
          <ArrowRight />
        </Button>
      </div>
    </Container>
  );
}
