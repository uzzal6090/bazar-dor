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
    <div className="mx-auto max-w-lg space-y-5 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#17231b]">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e2e9e3] bg-white p-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-xl bg-gray-100 object-cover"
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#168044] text-xl font-semibold text-white">
              {user.name?.[0] ?? "U"}
            </span>
          )}

          <div>
            <p className="text-lg text-[#17231b]">{user.name}</p>
            <p className="text-sm font-semibold text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 rounded-md border border-red-400 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="rounded-2xl border border-[#e2e9e3] bg-white p-5">
        <h2 className="mb-4 font-bold text-[#17231b]">তথ্য</h2>

        <label className="block text-sm font-medium text-[#17231b]">
          নাম
          <input
            readOnly
            value={user.name ?? ""}
            className="input input-bordered mt-1 w-full bg-gray-50"
          />
        </label>

        <Link
          href="/profile/update"
          className="mt-4 block w-full rounded-md border border-[#168044] px-4 py-3 text-center text-sm font-medium text-[#168044] hover:bg-[#f0f6f1]"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}