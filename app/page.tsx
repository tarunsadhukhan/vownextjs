import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <main className="min-h-screen flex">
      {/* Left side - Welcome Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-800 to-teal-600 p-12 relative">
        <div className="max-w-2xl mx-auto text-white space-y-8">
          <h1 className="text-4xl font-bold"> want to Nice to meet you</h1>
          <h2 className="text-6xl font-bold">WELCOME</h2>
          <p className="text-xl">
            We have customized this product according to your needs and can&apos;t wait to see you using this product. This will simplify working of your business
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="VOW Logo"
              width={100}
              height={40}
              priority
            />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-green-600">...it&apos;s that simple</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}