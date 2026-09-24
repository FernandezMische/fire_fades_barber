import React from "react";
import { shopInfo, openingHours } from "../data/siteData";

export default function Footer({ setPage }) {
  return (
    <footer className="bg-smoke border-t border-ash mt-auto mb-16 md:mb-0">
      <div className="container-wide px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src="/images/ff_logo.png" alt="Fire Fades" className="h-16 w-auto mb-4" />
            <p className="text-bone/60 text-sm leading-relaxed">Premium grooming for the modern gentleman. Sharp cuts, sharp minds.</p>
            <p className="font-script text-copper text-xl mt-3">Est. 2024</p>
          </div>
          <div>
            <h3 className="font-heading text-copper text-sm tracking-widest mb-6">Explore</h3>
            <ul className="space-y-3">
              {[{ id: "home", label: "Home" }, { id: "services", label: "Services" }, { id: "about", label: "About" }, { id: "booking", label: "Booking" }, { id: "terms", label: "Terms & Conditions" }].map((link) => (
                <li key={link.id}>
                  <button onClick={() => { setPage(link.id); window.scrollTo(0, 0); }} className="text-bone/60 hover:text-copper text-sm transition-colors">{link.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-copper text-sm tracking-widest mb-6">Hours</h3>
            <ul className="space-y-2">
              {openingHours.map((item) => (
                <li key={item.day} className="flex justify-between text-sm">
                  <span className="text-bone/60">{item.day}</span>
                  <span className="text-bone/80">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-copper text-sm tracking-widest mb-6">Find Us</h3>
            <address className="not-italic text-bone/60 text-sm space-y-2">
              <p>{shopInfo.address}</p>
              <p><a href={`tel:${shopInfo.phone}`} className="hover:text-copper transition-colors">{shopInfo.phone}</a></p>
              <p><a href={`mailto:${shopInfo.email}`} className="hover:text-copper transition-colors">{shopInfo.email}</a></p>
            </address>
            <div className="flex gap-4 mt-6">
              {[{ name: "Instagram", url: shopInfo.instagram }, { name: "Facebook", url: shopInfo.facebook }, { name: "TikTok", url: shopInfo.tiktok }].map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-bone/40 hover:text-copper text-xs font-heading uppercase tracking-widest transition-colors">{social.name}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-ash mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-bone/40 text-xs">&copy; {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
          <button onClick={() => { setPage("terms"); window.scrollTo(0, 0); }} className="text-bone/40 hover:text-copper text-xs transition-colors">Terms & Conditions</button>
        </div>
      </div>
    </footer>
  );
}