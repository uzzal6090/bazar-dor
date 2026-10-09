"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [draft, setDraft] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  const name = draft ?? session.user.name ?? "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-[#17231b]">
        তথ্য আপডেট করুন
      </h1>
      <p className="mb-4 text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-[#e2e9e3] bg-white p-6"
      >
        <label className="block text-sm font-medium text-[#17231b]">
          নাম
          <input
            value={name}
            onChange={(e) => setDraft(e.target.value)}
            className="input input-bordered mt-1 w-full"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#168044] px-4 py-3 text-sm font-medium text-white hover:bg-[#126b39] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
        </button>

        <Link
          href="/profile"
          className="block text-center text-sm text-gray-500 hover:text-[#168044]"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </form>
    </div>
  );
}