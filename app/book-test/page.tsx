import { Suspense } from "react"
import BookingRequestForm from "@/components/booking/BookingRequestForm"

export default function BookTestPage() {
  return (
    <Suspense fallback={<section className="bg-background py-16 lg:py-20" />}>
      <BookingRequestForm />
    </Suspense>
  )
}
