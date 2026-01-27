"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Sparkle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Field() {
  const [originalMessage, setOriginalMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState("");
  const [clientName, setClientName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [forbiddenWordsFound, setForbiddenWordsFound] = useState({});
  const [error, setError] = useState("");

  const wordsToHyphenate = {
    email: "e-mail",
    emails: "e-mails",
    whatsapp: "wha-tsApp",
    telegram: "t-elegram",
    skype: "sk-ype",
    discord: "discor-d",
    phone: "ph-one",
    number: "num-ber",
    contact: "cont-act",
    website: "web-site",
    gmail: "g-mail",
    yahoo: "ya-hoo",
    paypal: "Pay-Pal",
    facebook: "face-book",
    instagram: "insta-gram",
    twitter: "twit-ter",
    linkedin: "linked-In",
    pay: "p-ay",
    payment: "p-ay-ment",
    free: "Va-lue",
    cheap: "cost-effec-tive",
    discount: "spe-cial off-er",
    coupon: "pro-motional co-de",
    template: "cus-tomizable",
    DIY: "crea-tive de-sign",
    "do it yourself": "step-by-step",
    "make your own": "tu-torial",
    instructions: "re-sources",
    guide: "user-friend-ly",
    manual: "bud-get-friend-ly",
    affordable: "va-lue for mo-ney",
    jobs: "op-portunities",
    hiring: "re-cruitment",
    salary: "com-pen-sation",
    resume: "ca-reer ad-van-cement",
    CV: "job ap-plica-tion",
    career: "work-life ba-lance",
    "freelance jobs": "re-mote work",
    "work from home": "em-ployment",
    Upwork: "Freelance pla-tforms",
    Guru: "on-line mar-ket-places",
    Freelancer: "busin-ess gro-wwth",
    Amazon: "e-com-merce",
    eBay: "di-gital ser-vices",
    Shopify: "en-trepre-neurship",
    repair: "re-furbished",
    fix: "main-te-nance",
    used: "pre-owned",
    "second hand": "eco-friend-ly",
    rental: "lea-sing",
    wholesale: "bulk buy-ing",
    B2B: "busin-ess part-nerships",
    reseller: "au-thorized re-seller",
    specs: "pro-duct fea-tures",
    dimensions: "spec-if-ications",
    weight: "ca-pacity",
    Canva: "crea-tive tools",
    GIMP: "de-sign soft-ware",
    Figma: "gra-phic de-sign",
    Payoneer: "P-ay-oneer",
    "Western Union": "International m-oney transfer",
    "Pay me directly": "Alternative p-ay-ment options",
    Crypto: "Cy-rpto",
    "Let's talk on Zoom": "Let's talk on Zoom Call through the Fiverr feature",
    "5-star": "Great comment",
    "Good review": "Positive feedback",
    "Positive feedback": "Excellent Experience",
    Exchange: "Barter or trade services",
  };

  const rewriteMessage = () => {
    let rewritten = originalMessage;
    const foundWords = {};

    Object.entries(wordsToHyphenate).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      let matchCount = (rewritten.match(regex) || []).length;
      if (matchCount > 0) {
        foundWords[key] = matchCount;
      }
      rewritten = rewritten.replace(regex, value);
    });

    setRewrittenMessage(rewritten);
    setForbiddenWordsFound(foundWords);
    setCopied(false);
  };

  const clearAll = () => {
    setOriginalMessage("");
    setRewrittenMessage("");
    setCopied(false);
    setForbiddenWordsFound({});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rewrittenMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToMessage = () => {
    if (!update && !clientName && !profileName) return;

    const text = `${update} || ${clientName} || ${profileName}`;

    setRewrittenMessage((prev) => (prev ? prev + "\n" + text : text));

    setUpdate("");
    setClientName("");
    setProfileName("");
  };

  const generateProfessional = async () => {
    if (!originalMessage.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate-professional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: originalMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.professionalMessage) {
        setRewrittenMessage(data.professionalMessage);
        setCopied(false);
      }
    } catch (err) {
      setError(err.message || "Failed to generate message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col justify-center items-center gap-2 mb-4 sm:mb-6 lg:mb-8 px-2">
          <div className="w-28 sm:w-36 md:w-44 lg:w-52">
            <Image
              alt="logo"
              src="/images/logo.png"
              width={200}
              height={200}
              className="w-full h-auto object-contain"
              sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Fiverr Message with iLMify
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl px-4">
            You can upgrade your message format to the next level, making it
            more modern, appealing, professional and User friendly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6">
            {/* Original Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                Original Message
              </label>
              <textarea
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                className="w-full h-48 sm:h-56 lg:h-64 p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-black text-sm sm:text-base"
                placeholder="Paste your message here..."
              />

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
                <button
                  onClick={rewriteMessage}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm"
                >
                  <RefreshCw size={16} className="shrink-0" />
                  <span className="whitespace-nowrap">Rewrite Message</span>
                </button>

                <button
                  onClick={generateProfessional}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Sparkle
                    size={16}
                    className={`shrink-0 ${loading ? "animate-spin" : ""}`}
                  />
                  <span className="whitespace-nowrap">
                    {loading ? "Generating..." : "Rewrite Professionally"}
                  </span>
                </button>

                <button
                  onClick={clearAll}
                  className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-xs sm:text-sm"
                >
                  <Trash2 size={16} className="shrink-0" />
                  <span className="whitespace-nowrap">Clear All</span>
                </button>
                
              </div>
              {error && (
  <div className="mt-2 text-sm text-red-600 font-medium">
    ⚠️ {error}
  </div>
)}
            </div>

            {/* Rewritten Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                Rewritten Message (Fiverr Safe)
              </label>
              <div className="relative">
                <textarea
                  value={rewrittenMessage}
                  readOnly
                  className="w-full h-48 sm:h-56 lg:h-64 p-3 sm:p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black text-sm sm:text-base"
                  placeholder="Rewritten message will appear here..."
                />
                {rewrittenMessage && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white hover:bg-gray-50 border border-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-600 shrink-0" />
                        <span className="text-green-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="text-black shrink-0" />
                        <span className="text-black">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Words Display */}
              {Object.keys(forbiddenWordsFound).length > 0 && (
                <div className="mt-2 sm:mt-3 text-sm sm:text-base">
                  <div className="text-red-600 font-semibold mb-1">
                    Wrong Words:{" "}
                    {Object.values(forbiddenWordsFound).reduce(
                      (a, b) => a + b,
                      0,
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(forbiddenWordsFound).map(
                      ([word, count]) => (
                        <span
                          key={word}
                          className="text-red-600 text-sm sm:text-base"
                        >
                          {word},
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6 sm:my-8"></div>

          {/* Metadata Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Client Metadata
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <input
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                placeholder="Type"
                className="p-2.5 sm:p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              />
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="p-2.5 sm:p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              />
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Profile Name"
                className="p-2.5 sm:p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base sm:col-span-2 md:col-span-1"
              />
            </div>

            <button
              onClick={addToMessage}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <Plus size={18} className="shrink-0" />
              Add Entry
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className=" pt-4 sm:pt-6 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 px-4">
          <span className="font-medium text-gray-700">Developed by</span>
          <Link
            href="https://www.linkedin.com/in/swajan-naimur/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-green-600 transition-colors underline underline-offset-4"
          >
            Kazi Md Naimur Rahman
          </Link>

          <span className="hidden sm:inline text-gray-700">&amp;</span>

          <Link
            href="https://www.instagram.com/tufaelahmedzuarder/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-green-600 transition-colors underline underline-offset-4"
          >
            Tufael Ahmed Zuarder
          </Link>
        </footer>
      </div>
    </div>
  );
}
