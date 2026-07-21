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

import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "로그인 | Next Starter Kit",
}

export default function LoginPage() {
  return (
    <Container className="flex min-h-full flex-col items-center justify-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <p className="text-center text-xs text-muted-foreground">
            계정이 없으신가요?
          </p>
          <Button
            variant="outline"
            className="w-full"
            render={<Link href="/signup" />}
            nativeButton={false}
          >
            회원가입
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
