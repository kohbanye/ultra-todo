import Header from 'components/header'

type LayoutProps = Required<{
  children: React.ReactNode
}>

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
