import Link from "next/link"

import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { NAV_ITEMS } from "@/components/layout/nav-items"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight"
        >
          Next Starter
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
