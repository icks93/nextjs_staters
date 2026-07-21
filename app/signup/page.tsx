import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "회원가입 | Next Starter Kit",
}

export default function SignupPage() {
  return (
    <Container className="flex min-h-full flex-col items-center justify-center py-12">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>회원가입 기능은 아직 준비 중입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            빠른 시일 내에 회원가입 기능을 제공할 예정입니다.
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            render={<Link href="/login" />}
            nativeButton={false}
          >
            로그인 페이지로 돌아가기
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            render={<Link href="/" />}
            nativeButton={false}
          >
            홈으로
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
