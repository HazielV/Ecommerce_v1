import { getSession } from '@/lib/auth'
import Header from './components/header'
import Sidebar from './components/sidebar'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session: any = await getSession()

  return (
    <div className="flex w-screen  h-screen">
      <Sidebar rol={session.rol || 'ADMNISTRADOR'} />
      <main className="flex-1 bg-[#FBFBFB]  h-screen flex flex-col overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  )
}
