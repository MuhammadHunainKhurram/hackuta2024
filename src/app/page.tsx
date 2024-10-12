import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  const links = [
    { label: 'Get Started', href: '/get-started', isButton: true, position: 'left' as const },
    { label: 'Contact', href: '/contact', position: 'right' as const },
  ];


  return (
    <div>
      <Header links={links}/>
      <Hero />
    </div>
  );
}
