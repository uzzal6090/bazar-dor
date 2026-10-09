"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export default function ProfileView() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return null;

  const user = session.user;

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#17231b]">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e2e9e3] bg-white p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#168044] text-xl font-semibold text-white">
              {user.name?.[0] ?? "U"}
            </span>
          )}

          <div>
            <p className="font-semibold text-[#17231b]">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </div>

      <div className="space-y-3 rounded-2xl border border-[#e2e9e3] bg-white p-5">
        <h2 className="font-bold text-[#17231b]">তথ্য</h2>

        <p className="text-sm text-[#17231b]">
          <span className="text-gray-500">নাম: </span>
          {user.name}
        </p>

        <p className="text-sm text-[#17231b]">
          <span className="text-gray-500">ইমেইল: </span>
          {user.email}
        </p>

        <Link
          href="/profile/update"
          className="inline-block rounded-md bg-[#168044] px-4 py-2 text-sm font-medium text-white hover:bg-[#126b39]"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}