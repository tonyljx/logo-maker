import Header from "@/components/common/header";
import PromptInput from "../_components/prompt/prompt-input";
import LogosGrid from "../_components/logos-grid";
import Footer from "@/components/common/footer";
import CreatedImgGrid from "../_components/self-img-grid";

export default function Home() {
  return (
    <main className="container flex flex-col gap-6 ">
      {/* flex min-h-screen flex-col items-center justify-between p-24 */}
      <Header />
      <h2 className="mt-16 text-center text-2xl font-semibold md:text-3xl">
        LogoMaker
      </h2>
      <p className="text-center text-muted-foreground">
        Use AI to create logos in seconds, easily😄
      </p>

      <PromptInput />

      <CreatedImgGrid />

      <LogosGrid />
    </main>
  );
}
