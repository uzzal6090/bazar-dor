import Link from "next/link";

interface NotFoundViewProps {
  message?: string;
}

export default function NotFoundView({
  message = "দুঃখিত, এই পাতাটি খুঁজে পাওয়া যায়নি।",
}: NotFoundViewProps) {
  return (
    <div className="px-4 py-20 text-center">
      <p className="text-7xl font-bold text-[#168044]">৪০৪</p>

      <h1 className="mt-3 text-2xl font-bold text-[#17231b]">
        পাতা পাওয়া যায়নি
      </h1>

      <p className="mt-2 text-gray-600">{message}</p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-[#168044] px-5 py-3 text-sm font-medium text-white hover:bg-[#126b39]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}