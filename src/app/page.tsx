import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>ADD a welcome page with a login form and an image</h1>
        <h2>a split view</h2>
        <Link href={"/admin"}>admin page</Link>
      </main>
    </div>
  );
}
