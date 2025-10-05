import ResponsiveAppBar from '@/pages/navbar/ResponsiveAppBar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  )
}