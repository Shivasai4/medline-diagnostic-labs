"use client"

type PortalCard = {
  title: string
  buttonLabel: string
  route: string
}

const portalCards: PortalCard[] = [
  {
    title: "Customer Login",
    buttonLabel: "Open Customer Login",
    route: "https://lab18.cloudpathology.io",
  },
  {
    title: "Patient Login",
    buttonLabel: "Open Patient Login",
    route: "https://patient-in.creliohealth.com/patient/login",
  },
]

export default function LoginPage() {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="min-h-[calc(100vh-220px)] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 sm:space-y-4">
          {portalCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-primary/15 bg-gradient-to-b from-white to-[#f7f9ff] p-4 text-center shadow-[0_16px_28px_-24px_rgba(11,42,74,0.65)] sm:p-6"
            >
              <h2 className="text-xl font-semibold text-navy sm:text-2xl">{card.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">This will open the selected portal in a new tab.</p>
              <button
                type="button"
                onClick={() => openInNewTab(card.route)}
                className="mt-4 inline-flex w-full justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_22px_-16px_rgba(37,99,235,0.95)] transition hover:bg-primary/90 sm:mx-auto sm:mt-5 sm:w-auto sm:min-w-[260px] sm:px-8 sm:py-2.5 sm:text-base"
              >
                {card.buttonLabel}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
