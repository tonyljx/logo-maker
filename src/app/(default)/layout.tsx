import Footer from "@/components/common/footer"

export default function DefaultLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      
 
      {children}
      <Footer/>
    </section>
  )
}