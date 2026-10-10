"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/auth/SocialButtons";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function showError(message: string) {
    setErrorMessage(message);
    toast.error(message);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      showError("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { error } = await signIn.email({ email, password });

    setLoading(false);

    if (error) {
      showError(
        error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়"
          : (error.message ?? "সাইন ইন ব্যর্থ হয়েছে"),
      );
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold text-[#17231b]">
        সাইন ইন
      </h1>
      <p className="mb-6 mt-1 text-center text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-[#e2e9e3] bg-white p-6"
      >
        <label className="block text-sm font-medium text-[#17231b]">
          ইমেইল
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input input-bordered mt-1 w-full"
          />
        </label>

        <label className="block text-sm font-medium text-[#17231b]">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="input input-bordered mt-1 w-full"
          />
        </label>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#168044] px-4 py-3 text-sm font-medium text-white hover:bg-[#126b39] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
        </button>

        <div className="divider text-xs text-gray-500">অথবা</div>

        <SocialButtons />

        <p className="text-center text-sm text-[#17231b]">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-[#168044]">
            সাইন আপ করুন
          </Link>
        </p>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-gray-500 hover:text-[#168044]">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}