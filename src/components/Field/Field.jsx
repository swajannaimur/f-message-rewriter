"use client";

import React, { useState } from "react";
import { RefreshCw, Copy, Check, Plus, Delete, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Field() {
  const [originalMessage, setOriginalMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState("");
  const [clientName, setClientName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [forbiddenWordsFound, setForbiddenWordsFound] = useState({});

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
    try {
      const res = await fetch("/api/generate-professional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: originalMessage }),
      });

      const data = await res.json();
      if (data.professionalMessage) {
        setRewrittenMessage(data.professionalMessage);
        setCopied(false);
      }
    } catch (err) {
      console.error("Error generating professional message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center flex flex-col justify-center items-center gap-5 mb-10">
          <Image src="/images/logo.png" alt="logo" width={225} height={225} />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fiverr Message with iLMify
          </h1>
          <p className="text-gray-600">
            You can upgrade your message format to the next level, making it
            more modern, appealing, professional and User friendly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Original Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Original Message
              </label>
              <textarea
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-black"
                placeholder="Paste your message here..."
              />

              <div className="mt-4 flex gap-4">
                <button
                  onClick={rewriteMessage}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-2 py-3 rounded-lg font-medium transition-colors text-sm"
                >
                  <RefreshCw size={16} />
                  Rewrite Message
                </button>

                <button
                  onClick={generateProfessional}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-3 rounded-lg font-medium transition-colors text-sm ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <motion.div
                    animate={
                      loading
                        ? { rotate: 360, scale: [1, 1.25, 1] }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={
                      loading
                        ? {
                            rotate: {
                              repeat: Infinity,
                              duration: 1.1,
                              ease: "linear",
                            },
                            scale: {
                              repeat: Infinity,
                              duration: 1.1,
                              ease: "easeInOut",
                            },
                          }
                        : {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }
                    }
                  >
                    <Sparkle size={16} />
                  </motion.div>

                  <span>
                    {loading ? "Generating..." : "Rewrite Professionally"}
                  </span>
                </button>

                <button
                  onClick={clearAll}
                  className="w-full flex items-center justify-center gap-2 px-2 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                >
                  <Delete size={16} />
                  Clear All
                </button>
              </div>
            </div>

            {/* Rewritten Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rewritten Message (Fiverr Safe)
              </label>
              <div className="relative">
                <textarea
                  value={rewrittenMessage}
                  readOnly
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  placeholder="Rewritten message will appear here..."
                />
                {rewrittenMessage && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-3 right-3 bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-600" />
                        <span className="text-green-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} color="black" />
                        <span className="text-black">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Words Display */}
              {Object.keys(forbiddenWordsFound).length > 0 && (
                <div className="mt-2 text-sm">
                  <div className="text-red-600  text-lg">
                    Wrong Words:{" "}
                    {Object.values(forbiddenWordsFound).reduce(
                      (a, b) => a + b,
                      0,
                    )}
                  </div>
                  <div className="mb-1">
                    {Object.entries(forbiddenWordsFound).map(
                      ([word, count]) => (
                        <span key={word} className="text-red-600 mr-2 text-lg">
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
          <div className="border-t border-gray-200 my-8"></div>

          {/* Metadata Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Client Metadata
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                placeholder="Type"
                className="p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Profile Name"
                className="p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={addToMessage}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              Add Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
