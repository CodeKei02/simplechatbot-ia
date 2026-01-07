"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { InputPrompt } from "@/components/InputPrompt";
import useUserMessageStore from "@/store/userMessageStore";

export const Hero = () => {
  const [imageSrc, setImageSrc] = useState("/resources/hero-image-sm.jpg");
  const messages = useUserMessageStore((state) => state.messages);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const updateImageSrc = () => {
      if (window.innerWidth >= 768) {
        setImageSrc("/resources/hero-image.jpg");
      }
    };

    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => window.removeEventListener("resize", updateImageSrc);
  }, []);

  return (
    <section className="w-full">
      <div className="relative w-full h-64">
        <Image
          src={imageSrc}
          alt="Logo"
          fill
          loading="eager"
          className="object-cover object-center "
        />
      </div>
      <div className="min-h-screen bg-[var(--hero-darkgray)]"></div>
      <div className="bg-[var(--black-container)] absolute h-150 w-[90%] m-auto right-0 left-0 bottom-[50px] top-0 rounded-lg grid grid-rows-[1fr_auto]">
        <div
          ref={messagesRef}
          className="p-4 overflow-hidden overflow-y-scroll max-h-[600px]"
        >
          <div className="flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={m.id} className="flex items-start gap-2">
                {m.sender === "bot" && (
                  <Image
                    src="/resources/logo-small.svg"
                    alt="logo"
                    width={20}
                    height={20}
                    className="fade-in "
                  />
                )}
                <p
                  key={i}
                  className={`text-white w-max-content px-5 py-2 min-h-max-content ${
                    m.sender === "user"
                      ? "bg-[var(--blue)] self-end"
                      : "bg-[var(--black)] self-start"
                  } rounded-md max-w-[80%] overflow-hidden break-words fade-in`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4 justify-end">
          <InputPrompt />
        </div>
      </div>
    </section>
  );
};
