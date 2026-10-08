import Image from "next/image";
import BanglaDate from "@/components/layout/BanglaDate";

export default function Hero() {
  return (
    <section className="grid items-center gap-6 rounded-3xl border border-[#e2e9e3] bg-white p-6 sm:p-10 md:grid-cols-2">
      <div>
        <BanglaDate className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-[#168044]" />

        <h1 className="text-3xl font-bold text-[#17231b] sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="mt-5 inline-block rounded-md bg-[#168044] px-5 py-3 text-sm font-medium text-white hover:bg-[#126b39]"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex justify-center">
        <Image
          src="/assets/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={360}
          height={280}
          className="h-auto w-full max-w-sm"
          priority
        />
      </div>
    </section>
  );
}