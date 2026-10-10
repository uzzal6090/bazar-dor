"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons() {
  const [loading, setLoading] = useState<Provider | null>(null);

  async function handleSocial(provider: Provider) {
    setLoading(provider);

    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message ?? "সোশ্যাল লগইন ব্যর্থ হয়েছে");
      setLoading(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loading !== null}
        className="flex items-center justify-center gap-2 rounded-md border border-[#d5dfd7] bg-white px-3 py-2 text-sm font-medium text-[#17231b] hover:bg-[#f0f6f1] disabled:opacity-60"
      >
        <span className="text-base font-bold text-[#4285F4]">G</span>
        {loading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loading !== null}
        className="flex items-center justify-center gap-2 rounded-md border border-[#d5dfd7] bg-white px-3 py-2 text-sm font-medium text-[#17231b] hover:bg-[#f0f6f1] disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
        {loading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}