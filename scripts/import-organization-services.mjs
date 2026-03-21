import fs from "node:fs"
import path from "node:path"
import XLSX from "xlsx"

const sourcePath =
  process.argv[2] ||
  "C:/Users/ganji/Downloads/Organization Services - Price.xls"

const targetPath = path.join(process.cwd(), "data", "organization-services.json")

const workbook = XLSX.readFile(sourcePath)
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" })

const normalizeText = (value) => {
  return String(value ?? "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

const services = rows
  .map((row, index) => ({
    id: Number(row["Sr."]) || index + 1,
    name: normalizeText(row.Test),
    price: Number(row.MRP) || 0,
  }))
  .filter((row) => row.id > 0 && row.name)

fs.writeFileSync(targetPath, `${JSON.stringify(services, null, 2)}\n`, "utf8")

console.log(`Imported ${services.length} services from: ${sourcePath}`)
console.log(`Saved: ${targetPath}`)
