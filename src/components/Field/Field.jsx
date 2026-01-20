"use client";

import React, { useState } from "react";
import { RefreshCw, Copy, Check, Plus, Delete } from "lucide-react";

export default function Field() {
  const [originalMessage, setOriginalMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const [update, setUpdate] = useState("");
  const [clientName, setClientName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [data, setData] = useState("");

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
    facebook: "Face-book",
    instagram: "Insta-gram",
    twitter: "Twit-ter",
    linkedin: "Linked-In",
    pay: "p-ay",
    payment: "p-ay-ment",
  };

  const rewriteMessage = () => {
    let rewritten = originalMessage;

    Object.entries(wordsToHyphenate).forEach(([key, value]) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      rewritten = rewritten.replace(regex, value);
    });

    rewritten = rewritten.replace(
      /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/g,
      "[e-mail address]",
    );

    rewritten = rewritten.replace(/(\+?\d[\d\s-]{7,}\d)/g, "[ph-one num-ber]");

    rewritten = rewritten.replace(
      /(https?:\/\/[^\s]+|www\.[^\s]+)/g,
      "[web-site link]",
    );

    setRewrittenMessage(rewritten);
    setCopied(false);
  };

  // ✅ Clear All Function
  const clearAll = () => {
    setOriginalMessage("");
    setRewrittenMessage("");
    setCopied(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fiverr Message Rewriter
          </h1>
          <p className="text-gray-600">
            Make your messages compliant with Fiverr's guidelines
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          {/* Message Rewriter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Original Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Original Message
              </label>
              <textarea
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Paste your message here..."
              />

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={rewriteMessage}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw size={18} />
                  Rewrite Message
                </button>

                <button
                  onClick={clearAll}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Delete size={18} />
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
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        <Copy size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
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
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Profile Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
