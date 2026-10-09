
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

function closeDropdown() {
  (document.activeElement as HTMLElement | null)?.blur();
}

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    closeDropdown();

    try {
      await signOut();

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-md" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-md px-3 py-2 text-sm font-medium text-[#34443a] hover:bg-[#f0f6f1]"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-md bg-[#168044] px-3 py-2 text-sm font-medium text-white hover:bg-[#126b39]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        aria-label="অ্যাকাউন্ট মেনু খুলুন"
        tabIndex={0}
        className="flex cursor-pointer items-center gap-2"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name || "ব্যবহারকারীর ছবি"}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-[#168044] text-sm font-semibold text-white"
          >
            {user.name?.[0] ?? "U"}
          </span>
        )}

        <span className="hidden text-sm font-medium text-[#17231b] sm:inline">
          {user.name}
        </span>
      </button>

<ul
  tabIndex={0}
  className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-[#e2e9e3] bg-white p-2 shadow"
>
  <li className="px-3 py-2">
    <p className="text-sm font-semibold text-[#17231b]">{user.name}</p>
    <p className="text-xs text-gray-500">{user.email}</p>
  </li>

  <li className="my-1 border-t border-[#e2e9e3]" />

  <li>
    <Link
      href="/profile"
      onClick={closeDropdown}
      className="block rounded-md px-3 py-2 text-sm text-[#17231b] hover:bg-[#f0f6f1]"
    >
      আমার প্রোফাইল
    </Link>
  </li>

  <li>
    <button
      type="button"
      onClick={handleSignOut}
      className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
    >
      ↩ সাইন আউট
    </button>
  </li>
</ul>
    </div>
  );
}