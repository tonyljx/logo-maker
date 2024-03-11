"use client";
import Footer from "@/components/common/footer";
import { AppContextProvider } from "@/contexts/AppContext";
import Header from "../../components/common/header";

export default function DefaultLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AppContextProvider>
        {/* Include shared UI here e.g. a header or sidebar */}

        <div className="py-3">{children}</div>
        <Footer />

        {/* <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script> */}
      </AppContextProvider>
    </section>
  );
}
