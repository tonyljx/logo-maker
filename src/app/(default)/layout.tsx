"use client";
import Footer from "@/components/common/footer";
import { AppContextProvider } from "@/contexts/AppContext";

export default function DefaultLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AppContextProvider>
        {/* Include shared UI here e.g. a header or sidebar */}

        {children}
        <Footer />

        {/* <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script> */}
      </AppContextProvider>
    </section>
  );
}
