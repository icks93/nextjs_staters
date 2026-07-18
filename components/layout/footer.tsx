import { Container } from "@/components/layout/container"

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex h-14 flex-col items-center justify-between gap-1 text-xs text-muted-foreground sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Next Starter Kit</p>
        <p>Next.js · TypeScript · Tailwind CSS · shadcn/ui</p>
      </Container>
    </footer>
  )
}
