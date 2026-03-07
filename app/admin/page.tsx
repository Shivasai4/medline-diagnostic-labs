"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Settings,
  TestTube,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react"

type Tab = "dashboard" | "appointments" | "reports" | "services" | "settings"

const sidebarLinks: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "appointments", label: "Appointments", icon: CalendarCheck },
  { key: "reports", label: "Patient Reports", icon: FileText },
  { key: "services", label: "Services", icon: TestTube },
  { key: "settings", label: "Settings", icon: Settings },
]

const mockAppointments = [
  { id: 1, name: "Ravi Kumar", test: "Complete Blood Count", date: "2026-03-05", status: "Confirmed" },
  { id: 2, name: "Priya Sharma", test: "Lipid Profile", date: "2026-03-05", status: "Pending" },
  { id: 3, name: "Ahmed Khan", test: "Full Body Checkup", date: "2026-03-04", status: "Completed" },
  { id: 4, name: "Sneha Reddy", test: "Thyroid Panel", date: "2026-03-04", status: "Confirmed" },
  { id: 5, name: "Vijay Patel", test: "HbA1c", date: "2026-03-03", status: "Completed" },
  { id: 6, name: "Lakshmi Devi", test: "Vitamin D", date: "2026-03-03", status: "Pending" },
  { id: 7, name: "Suresh Babu", test: "Liver Function Test", date: "2026-03-02", status: "Completed" },
  { id: 8, name: "Kavitha Rao", test: "Kidney Function Test", date: "2026-03-02", status: "Confirmed" },
  { id: 9, name: "Rajesh Gupta", test: "Vitamin B12", date: "2026-03-01", status: "Completed" },
  { id: 10, name: "Anita Singh", test: "COVID-19 Antibody", date: "2026-03-01", status: "Pending" },
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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [filter, setFilter] = useState("All")

  const filteredAppointments =
    filter === "All" ? mockAppointments : mockAppointments.filter((a) => a.status === filter)

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground shrink-0 hidden lg:block">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-primary-foreground">Admin Panel</h2>
        </div>
        <nav className="flex flex-col">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => setActiveTab(link.key)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === link.key
                  ? "bg-primary-foreground/10 text-primary-foreground border-l-4 border-accent"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground border-l-4 border-transparent"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary flex items-center justify-around py-2 px-2 border-t border-primary-foreground/20">
        {sidebarLinks.slice(0, 4).map((link) => (
          <button
            key={link.key}
            onClick={() => setActiveTab(link.key)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 text-xs cursor-pointer ${
              activeTab === link.key ? "text-primary-foreground" : "text-primary-foreground/50"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-secondary p-6 lg:p-8 pb-24 lg:pb-8">
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Appointments", value: "1,247", icon: CalendarCheck, color: "text-blue-600" },
                { label: "Pending Reports", value: "23", icon: Clock, color: "text-amber-600" },
                { label: "Active Services", value: "10", icon: TestTube, color: "text-green-600" },
                { label: "New Patients (Week)", value: "89", icon: Users, color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border">
                <h2 className="text-lg font-semibold text-primary">Recent Appointments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Test</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAppointments.slice(0, 5).map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="px-5 py-3 text-foreground font-medium">{a.name}</td>
                        <td className="px-5 py-3 text-muted-foreground">{a.test}</td>
                        <td className="px-5 py-3 text-muted-foreground">{a.date}</td>
                        <td className="px-5 py-3">{statusBadge(a.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Appointments</h1>
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Confirmed", "Completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground border border-border hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Test</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="px-5 py-3 text-foreground font-medium">{a.name}</td>
                        <td className="px-5 py-3 text-muted-foreground">{a.test}</td>
                        <td className="px-5 py-3 text-muted-foreground">{a.date}</td>
                        <td className="px-5 py-3">{statusBadge(a.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Patient Reports</h1>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Test</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAppointments.map((a) => (
                      <tr key={a.id} className="border-t border-border">
                        <td className="px-5 py-3 text-foreground font-medium">{a.name}</td>
                        <td className="px-5 py-3 text-muted-foreground">{a.test}</td>
                        <td className="px-5 py-3 text-muted-foreground">{a.date}</td>
                        <td className="px-5 py-3">
                          {a.status === "Completed" ? (
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
                            disabled={a.status !== "Completed"}
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
        )}

        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Services Management</h1>
            <p className="text-muted-foreground">Service management features coming soon.</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Settings</h1>
            <p className="text-muted-foreground">Settings panel coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
