import { CalendarCheck, User, Clock } from "lucide-react"
import AppointmentForm from "@/components/shared/AppointmentForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Dashboard | MedLine Diagnostic Labs",
}

const appointments = [
  { id: 1, test: "Complete Blood Count", date: "2026-03-05", time: "9:00 AM", status: "Confirmed" },
  { id: 2, test: "Lipid Profile", date: "2026-03-07", time: "10:00 AM", status: "Pending" },
  { id: 3, test: "Vitamin D", date: "2026-02-28", time: "8:00 AM", status: "Completed" },
  { id: 4, test: "Thyroid Panel", date: "2026-02-20", time: "7:30 AM", status: "Completed" },
  { id: 5, test: "HbA1c", date: "2026-02-15", time: "9:30 AM", status: "Completed" },
]

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[status] || ""}`}>
      {status}
    </span>
  )
}

export default function CustomerPage() {
  return (
    <section className="bg-secondary min-h-[calc(100vh-200px)] py-8 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="bg-primary rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-semibold text-primary-foreground">Hello, Priya Sharma</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Manage your appointments and book new tests.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Quick Book */}
          <div className="flex-1">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                <CalendarCheck className="h-5 w-5" />
                Quick Book
              </h2>
              <AppointmentForm />
            </div>
          </div>

          {/* Right: Profile + Appointments */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Profile */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                <User className="h-5 w-5" />
                My Profile
              </h2>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { label: "Name", value: "Priya Sharma" },
                  { label: "Phone", value: "+91-98765 43210" },
                  { label: "Email", value: "priya.sharma@email.com" },
                  { label: "Address", value: "Flat 302, Green Valley Apartments, Jubilee Hills, Hyderabad" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <span className="text-muted-foreground w-16 shrink-0">{item.label}:</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-primary">My Appointments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Test</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="px-5 py-3 text-foreground font-medium">{a.test}</td>
                        <td className="px-5 py-3 text-muted-foreground">
                          {a.date} {a.time}
                        </td>
                        <td className="px-5 py-3">{statusBadge(a.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
