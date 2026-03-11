"use client"

import { useState } from "react"
import { FlaskConical, Droplets, Microscope, Dna, Bug, Search, Fingerprint, Stethoscope, TestTubes } from "lucide-react"

const departments = [
  {
    icon: FlaskConical,
    title: "Clinical Biochemistry",
    description: "Comprehensive analysis of Blood Chemistry with a wide range of tests, including Cardiac Markers, Hepatic/Liver Function Markers, Kidney Function Markers, Hormones, Vitamins and Minerals, and Diabetes Markers.",
    tags: ["Cardiac Markers", "Liver Function", "Kidney Function", "Hormones", "Vitamins & Minerals", "Diabetes Markers"],
  },
  {
    icon: Droplets,
    title: "Hematology",
    description: "Complete blood count and blood-related disorder analysis using advanced automated systems with comprehensive coagulation studies and hemoglobinopathy screening.",
    tags: ["Complete Blood Count", "Coagulation Studies", "Hemoglobinopathy", "Blood Cell Morphology"],
  },
  {
    icon: Microscope,
    title: "Histopathology",
    description: "Tissue examination and biopsy analysis for cancer detection and disease diagnosis using advanced microscopic techniques and immunohistochemistry studies.",
    tags: ["Routine Histopathology", "Frozen Section", "Immunohistochemistry", "Special Stains"],
  },
  {
    icon: Dna,
    title: "Molecular Biology",
    description: "Advanced DNA/RNA analysis for genetic disorders, infectious diseases, oncology, and personalized medicine using cutting-edge molecular techniques.",
    tags: ["Infectious Disease", "Oncology Molecular", "Genetic Testing", "Molecular Diagnostics"],
  },
  {
    icon: Bug,
    title: "Microbiology",
    description: "Comprehensive identification of pathogens, antimicrobial susceptibility testing, and infection control with rapid diagnostic capabilities.",
    tags: ["Bacteriology", "Mycobacteriology", "Mycology", "Parasitology"],
  },
  {
    icon: Search,
    title: "Cytology",
    description: "Cellular analysis and screening for early detection of malignancy and disease diagnosis using advanced cytological techniques.",
    tags: ["Gynecological Cytology", "Non-Gynecological Cytology"],
  },
  {
    icon: Fingerprint,
    title: "Cytogenetics",
    description: "Chromosomal analysis and genetic counseling support for hereditary disorders, cancer diagnosis, and reproductive health.",
    tags: ["Constitutional Cytogenetics", "Cancer Cytogenetics"],
  },
  {
    icon: TestTubes,
    title: "Immunophenotyping",
    description: "Advanced flow cytometry and cellular immunophenotyping for immune system analysis, leukemia/lymphoma diagnosis, and cell subset characterization.",
    tags: ["Flow Cytometry", "T-Cell Analysis", "B-Cell & NK Cell Analysis"],
  },
  {
    icon: Stethoscope,
    title: "Clinical Pathology",
    description: "Routine diagnostic testing with rapid result delivery for immediate clinical decision support and patient management.",
    tags: ["General Clinical Pathology"],
  },
]

export default function DepartmentsSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  return (
    <section id="departments" className="scroll-mt-28 bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
            Our Departments
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            Specialized diagnostic departments powered by advanced technology and expert pathologists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, idx) => (
            <div
              key={dept.title}
              className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 cursor-pointer"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedIdx === idx}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setExpandedIdx(expandedIdx === idx ? null : idx)
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <dept.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                    {dept.title}
                  </h3>
                  <p className={`text-sm text-muted-foreground leading-relaxed mt-2 ${expandedIdx === idx ? "" : "line-clamp-2"}`}>
                    {dept.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 mt-4 transition-all duration-300 ${expandedIdx === idx ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}`}>
                {dept.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


