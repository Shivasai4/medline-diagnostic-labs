"use client"

import { useState, type FormEvent } from "react"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const form = e.target as HTMLFormElement
    form.reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact Us"
          title="Get In Touch"
          subtitle="Have a question or need to book a test? Reach out to us via the form or contact details below."
        />

        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          {/* Contact Form */}
          <div className="flex-[3]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card border border-border rounded-xl p-6">
              {submitted && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                  Your message has been sent! We will get back to you shortly.
                </div>
              )}
              <input
                type="text"
                placeholder="Full Name"
                required
                className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-[2]">
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:+919876543210" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +91-98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:info@medlinelabs.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      info@medlinelabs.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-green-600 transition-colors"
                    >
                      +91-98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Road No. 13, Snehapuri Colony, RK Puram, Nagole, Hyderabad 500035
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Working Hours</p>
                    <p className="text-sm text-muted-foreground">Mon - Sat: 7:00 AM - 8:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-xl overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8783637763718!2d78.55301307602255!3d17.36958508351457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98cf6970d235%3A0x70ef219a3580de47!2sMedline%20Diagnostic%20Labs!5e0!3m2!1sen!2sus!4v1773256024730!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MedLine Diagnostic Labs Location"
          />
        </div>
      </div>
    </section>
  )
}
