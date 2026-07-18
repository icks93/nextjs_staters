"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Info, Settings, User } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력하세요."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  bio: z.string().max(200, "200자 이내로 입력하세요.").optional(),
  role: z.string().min(1, "역할을 선택하세요."),
  plan: z.enum(["free", "pro"], { message: "플랜을 선택하세요." }),
  notifications: z.boolean(),
  terms: z.boolean().refine((v) => v === true, "약관에 동의해야 합니다."),
})

type FormValues = z.infer<typeof formSchema>

function FormShowcase() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      role: "",
      plan: "free",
      notifications: true,
      terms: false,
    },
  })

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success("제출되었습니다.")
    reset()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>폼 (react-hook-form + zod)</CardTitle>
        <CardDescription>
          검증된 폼 라이브러리 조합으로 입력값 검증까지 구성한 예제입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="showcase-form" onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bio">소개</Label>
            <Textarea id="bio" placeholder="간단한 소개" {...register("bio")} />
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="role">역할</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">개발자</SelectItem>
                      <SelectItem value="designer">디자이너</SelectItem>
                      <SelectItem value="pm">기획자</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-xs text-destructive">{errors.role.message}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label>플랜</Label>
              <Controller
                control={control}
                name="plan"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-row gap-4 pt-1"
                  >
                    <Label className="flex items-center gap-1.5 font-normal">
                      <RadioGroupItem value="free" /> 무료
                    </Label>
                    <Label className="flex items-center gap-1.5 font-normal">
                      <RadioGroupItem value="pro" /> 프로
                    </Label>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Controller
              control={control}
              name="notifications"
              render={({ field }) => (
                <Label className="flex items-center gap-2 font-normal">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  이메일 알림 받기
                </Label>
              )}
            />

            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  이용약관에 동의합니다.
                </Label>
              )}
            />
            {errors.terms && (
              <p className="text-xs text-destructive">{errors.terms.message}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="showcase-form" disabled={isSubmitting}>
          제출하기
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ComponentsPage() {
  return (
    <Container>
      <PageHeader
        title="컴포넌트 쇼케이스"
        description="스타터킷에 설치된 shadcn/ui 컴포넌트를 한 페이지에서 확인하세요."
      />

      <div className="grid gap-8 pb-16">
        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>variant / size 조합</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="설정">
                <Settings />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <FormShowcase />

        {/* Overlays */}
        <Card>
          <CardHeader>
            <CardTitle>오버레이</CardTitle>
            <CardDescription>Dialog · Popover · DropdownMenu · Tooltip</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                다이얼로그 열기
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>정말 진행할까요?</DialogTitle>
                  <DialogDescription>
                    이 작업은 되돌릴 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    취소
                  </DialogClose>
                  <Button onClick={() => toast.success("확인되었습니다.")}>
                    확인
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                팝오버 열기
              </PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>알림 설정</PopoverTitle>
                <PopoverDescription>
                  팝오버는 짧은 정보나 설정을 보여줄 때 사용합니다.
                </PopoverDescription>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                드롭다운 메뉴
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="text-muted-foreground" />
                    프로필
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="text-muted-foreground" />
                    설정
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                <Info />
              </TooltipTrigger>
              <TooltipContent>도움말 텍스트입니다.</TooltipContent>
            </Tooltip>

            <Button
              variant="outline"
              onClick={() => toast("토스트 알림입니다.", { description: "sonner로 구성되었습니다." })}
            >
              토스트 띄우기
            </Button>
          </CardContent>
        </Card>

        {/* Content display */}
        <Card>
          <CardHeader>
            <CardTitle>콘텐츠 표시</CardTitle>
            <CardDescription>
              Avatar · Badge · Alert · Separator · Skeleton
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>

            <Alert>
              <Info />
              <AlertTitle>안내</AlertTitle>
              <AlertDescription>
                Alert는 페이지 상단이나 섹션 안에서 상태를 안내할 때 사용합니다.
              </AlertDescription>
            </Alert>

            <Separator />

            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>네비게이션</CardTitle>
            <CardDescription>Tabs · Accordion</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">계정</TabsTrigger>
                <TabsTrigger value="password">비밀번호</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-3 text-muted-foreground">
                계정 관련 설정을 확인하는 탭입니다.
              </TabsContent>
              <TabsContent value="password" className="pt-3 text-muted-foreground">
                비밀번호 변경 관련 설정을 확인하는 탭입니다.
              </TabsContent>
            </Tabs>

            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>이 스타터킷은 무엇인가요?</AccordionTrigger>
                <AccordionContent>
                  Next.js 16, TypeScript, Tailwind CSS, shadcn/ui가 준비된
                  빠른 시작용 템플릿입니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>컴포넌트는 어떻게 추가하나요?</AccordionTrigger>
                <AccordionContent>
                  <code>npx shadcn add [컴포넌트명]</code> 명령으로 필요한
                  컴포넌트를 추가할 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
