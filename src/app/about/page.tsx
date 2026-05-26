import React from "react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PrintResumeButton } from "@/components/PrintResumeButton";
import { Globe, Briefcase, Mail, MapPin, Phone, GraduationCap, Code2 } from "lucide-react";

export const metadata = {
  title: "About & Resume | jemar.dev",
  description: "Web/WordPress Developer & SEO Specialist",
};

export default function AboutPage() {
  const skills = [
    "Next.js", "React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS",
    "WordPress", "Elementor", "Shopify", "ACF", "Custom Coding", 
    "SEO", "GA4", "GSC", "GBP", "Ahrefs", "Semrush",
    "Google Ads", "Meta Ads", "MailChimp", "ConvertKit", "Hubspot", "CRM Tools",
    "Git", "GitHub", "API", "VS Code", "Adobe Suite", "Google Suite", "Capcut", "Critical Thinking"
  ];

  const experiences = [
    {
      role: "Frontend Engineer (Next.js / React)",
      company: "Freelance & Independent Projects",
      date: "01/2024 - 03/2026",
      desc: "Architected and developed high-performance web applications using Next.js (App Router), React, and Tailwind CSS. Built custom admin dashboards, implemented Server Actions, and integrated headless architectures with PostgreSQL databases."
    },
    {
      role: "Web/WordPress Developer",
      company: "HireVP / CL Visual",
      date: "03/2025 - 03/2026",
      desc: "Developed company’s website, 2 Client’s Portfolio Websites and Their new business’ website."
    },
    {
      role: "Website Onboarding Specialist",
      company: "Housecall Pro",
      date: "08/2024 - 01/2025",
      desc: "Handling pro requests involving website edits, onboarding processes, and resolving website development issues."
    },
    {
      role: "WordPress and Shopify Developer",
      company: "Online Growth Group",
      date: "06/2024 - 12/2024",
      desc: "Developed client websites from scratch using Divi or Shopify based on client needs. Handled SEO, Graphic Designing, Video Editing, and Social Media Management."
    },
    {
      role: "GVA | Graphics | SEO | Web Dev",
      company: "Workergenix",
      date: "06/2023 - 05/2024",
      desc: "Handled Company’s Website. Created Graphics for websites and other platforms. Performed SMM, Video Editing, Content Creation, Podcast Editing, and Admin Tasks."
    },
    {
      role: "Client Based WordPress Dev",
      company: "RipplePop LLC",
      date: "09/2022 - 12/2025",
      desc: "Developed client websites from scratch and implemented new features on existing client platforms."
    },
    {
      role: "Jr. WordPress Developer",
      company: "White Label Services UK",
      date: "03/2022 - 07/2022",
      desc: "Created websites using WordPress with Oxygen Builder. Implemented SEO strategies for client-based WordPress sites."
    },
    {
      role: "Customer Service Associate",
      company: "Concentrix",
      date: "11/2019 - 10/2020",
      desc: "Offered promotions and provided top-tier support to customers to maintain high retention rates."
    },
    {
      role: "Web Developer / Graphic Designer",
      company: "MLhuillier",
      date: "10/2018 - 02/2019",
      desc: "Updated existing client websites and executed Website Designing, Graphic Designing, and Video Editing."
    },
    {
      role: "Web Developer",
      company: "Proweaver",
      date: "05/2018 - 10/2018",
      desc: "Created websites from scratch using HTML5, CSS3, JavaScript, and jQuery. Handled Web Design and Graphic Design requirements."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
        
        {/* Left Column: Profile & Contact */}
        <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="h-48 w-48 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-xl overflow-hidden mb-6">
            <img src="/me.png" alt="Jemar Paltingca" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white mb-1">
            Jemar Paltingca
          </h1>
          <p className="text-sm font-medium text-neutral-500 mb-8">
            Web/WordPress Developer & SEO Specialist
          </p>

          <div className="w-full space-y-4 mb-8">
            <ContactItem icon={<MapPin className="h-4 w-4" />} text="Cebu City, PH" />
            <ContactItem icon={<Mail className="h-4 w-4" />} text="jemarsolutions@gmail.com" />
            <ContactItem icon={<Phone className="h-4 w-4" />} text="+63 935 725 6008" />
            <ContactItem icon={<Globe className="h-4 w-4" />} text="jmrwebstudio.vercel.app" />
          </div>

          <div className="w-full bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 mb-3 text-neutral-900 dark:text-white font-bold">
              <GraduationCap className="h-5 w-5" /> Education
            </div>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">BS in Information Technology</p>
            <p className="text-sm text-neutral-500">Cebu Eastern College</p>
            <p className="text-xs text-neutral-400 mt-1">2014 - 2018</p>
          </div>

          <div className="w-full mt-4 print:hidden">
            <PrintResumeButton />
          </div>
        </div>

        {/* Right Column: Bio, Skills & Experience */}
        <div className="flex-1 w-full space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">About Me</h2>
            <div className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-4">
              <p>
                I’m a detail-oriented web professional with hands-on experience in website revisions, on-page SEO, and ongoing site maintenance. I’ve worked closely with design and content requirements, handled iterative revisions, and ensured websites remained optimized, functional, and aligned with business goals. 
              </p>
              <p>
                I’m comfortable working independently, managing multiple tasks, and maintaining consistency and quality even in repetitive or deadline-driven work. I value clear communication, reliability, and long-term improvement over quick fixes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5" /> Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Work Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 dark:before:via-neutral-800 before:to-transparent">
              {experiences.map((exp, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active print:break-inside-avoid print:mb-6">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white dark:border-neutral-950 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-brand shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10" />
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col h-full">
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white leading-tight mb-1">{exp.role}</h3>
                    <div className="text-sm font-medium text-brand mb-3">{exp.company}</div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-1">{exp.desc}</p>
                    <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
                      <time className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-widest">{exp.date}</time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16 print:hidden">
        <ContactForm />
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
}
