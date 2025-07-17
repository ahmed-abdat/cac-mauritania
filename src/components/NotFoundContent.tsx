'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import NotFoundServer from "@/components/NotFoundServer";

export default function NotFoundContent() {
  const serverContent = NotFoundServer();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-6">{serverContent.title}</h1>
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white opacity-20 blur"></div>
          <p className="relative z-10 text-lg px-6 py-3">
            {serverContent.description}
          </p>
        </div>
        <Link href="/" passHref>
          <span className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 items-center mx-auto inline-flex cursor-pointer">
            <ArrowLeft className="mr-2" />
            {serverContent.goBack}
          </span>
        </Link>
      </div>
    </div>
  );
}
