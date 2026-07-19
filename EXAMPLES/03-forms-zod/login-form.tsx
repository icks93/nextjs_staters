// 참고용 예제 파일입니다. react-hook-form + zod의 최소 사용 패턴만 보여주는
// 독립 컴포넌트입니다. 더 많은 입력 타입(Select, RadioGroup, Switch 등)을
// 다루는 예제는 app/components/page.tsx의 FormShowcase를 참고하세요.
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// 검증 규칙을 zod 스키마 하나로 정의합니다.
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
})

// 스키마에서 폼 값 타입을 그대로 뽑아 쓰므로 타입과 검증 규칙이 항상 일치합니다.
type LoginFormValues = z.infer<typeof loginSchema>

/** 이메일/비밀번호를 검증하고 제출하는 최소 로그인 폼 예제 */
export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = handleSubmit(async (values) => {
    // 실제 프로젝트에서는 여기서 API를 호출합니다.
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success(`${values.email}로 로그인되었습니다.`)
    reset()
  })

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="login-email">이메일</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="login-password">비밀번호</Label>
        <Input id="login-password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        로그인
      </Button>
    </form>
  )
}
