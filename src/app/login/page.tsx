import LoginForm from './loginForm'

export default function page() {
  return (
    <div className="grid grid-cols-3 items-center justify-center h-screen w-screen overscroll-y-auto ">
      <LoginForm />
      <div className="h-full  bg-[#065AD8] hidden md:block"></div>
    </div>
  )
}
