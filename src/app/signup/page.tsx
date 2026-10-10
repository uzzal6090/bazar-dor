"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/auth/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
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
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name || !email || !password) {
      showError("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirm) {
      showError("পাসওয়ার্ড দুটি মেলেনি");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { error } = await signUp.email({ name, email, password });

    setLoading(false);

    if (error) {
      showError(error.message ?? "সাইন আপ ব্যর্থ হয়েছে");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold text-[#17231b]">
        অ্যাকাউন্ট তৈরি করুন
      </h1>
      <p className="mb-6 mt-1 text-center text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-[#e2e9e3] bg-white p-6"
      >
        <label className="block text-sm font-medium text-[#17231b]">
          নাম
          <input name="name" className="input input-bordered mt-1 w-full" />
        </label>

        <label className="block text-sm font-medium text-[#17231b]">
          ইমেইল
          <input
            name="email"
            type="email"
            className="input input-bordered mt-1 w-full"
          />
        </label>

        <label className="block text-sm font-medium text-[#17231b]">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            className="input input-bordered mt-1 w-full"
          />
        </label>

        <label className="block text-sm font-medium text-[#17231b]">
          পাসওয়ার্ড নিশ্চিত করুন
          <input
            name="confirm"
            type="password"
            className="input input-bordered mt-1 w-full"
          />
        </label>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#168044] px-4 py-3 text-sm font-medium text-white hover:bg-[#126b39] disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
        </button>

        <div className="divider text-xs text-gray-500">অথবা</div>

        <SocialButtons />

        <p className="text-center text-sm text-[#17231b]">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-[#168044]">
            সাইন ইন করুন
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