import { CalendarCheck, FileText, Clock, Download, CheckCircle, AlertCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patient Dashboard | MedLine Diagnostic Labs",
}

const upcomingTests = [
  { name: "Lipid Profile", date: "2026-03-07", status: "Confirmed" },
  { name: "HbA1c (Diabetes)", date: "2026-03-10", status: "Pending" },
]

const reports = [
  { test: "Complete Blood Count", date: "2026-02-28", status: "Ready", canDownload: true },
  { test: "Thyroid Panel", date: "2026-02-20", status: "Ready", canDownload: true },
  { test: "Vitamin D", date: "2026-02-15", status: "Ready", canDownload: true },
  { test: "Lipid Profile", date: "2026-03-07", status: "Processing", canDownload: false },
]

const history = [
  { test: "Full Body Checkup", date: "2026-01-15" },
  { test: "Complete Blood Count", date: "2025-12-10" },
  { test: "Thyroid Panel", date: "2025-11-05" },
  { test: "Vitamin B12", date: "2025-10-02" },
]

export default function PatientPage() {
  return (
    <section className="bg-secondary min-h-[calc(100vh-200px)] py-8 lg:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="bg-primary rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-semibold text-primary-foreground">Hello, Ravi Kumar</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Welcome back to your patient dashboard.</p>
        </div>

        {/* Upcoming Tests */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
            <CalendarCheck className="h-5 w-5" />
            Upcoming Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingTests.map((t, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-base font-medium text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {t.date}
                </p>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium mt-3 ${
                    t.status === "Confirmed"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
            <FileText className="h-5 w-5" />
            My Reports
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Test</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, idx) => (
                    <tr key={idx} className="border-t border-border">
                      <td className="px-5 py-3 text-foreground font-medium">{r.test}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.date}</td>
                      <td className="px-5 py-3">
                        {r.canDownload ? (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <CheckCircle className="h-3.5 w-3.5" /> Ready
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                            <AlertCircle className="h-3.5 w-3.5" /> Processing
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={!r.canDownload}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* History */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
            <Clock className="h-5 w-5" />
            Appointment History
          </h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {history.map((h, idx) => (
              <div key={idx} className="px-5 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{h.test}</span>
                <span className="text-xs text-muted-foreground">{h.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
