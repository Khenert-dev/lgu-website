import { NextResponse } from "next/server"

const services = [
  {
    id: "permits",
    title: "Business & Building Permits",
    summary: "Apply for new permits, renewals, and compliance certificates.",
    eta: "3-5 business days",
  },
  {
    id: "civil",
    title: "Civil Registry Services",
    summary: "Birth, marriage, and residency certificates with online tracking.",
    eta: "1-2 business days",
  },
  {
    id: "health",
    title: "Health & Social Assistance",
    summary: "Schedule consultations, wellness programs, and aid requests.",
    eta: "Same-day triage",
  },
  {
    id: "disaster",
    title: "Disaster & Risk Updates",
    summary: "Access advisories, evacuation info, and emergency hotlines.",
    eta: "Real-time",
  },
  {
    id: "tourism",
    title: "Tourism & Community Events",
    summary: "Discover festivals, attractions, and local market schedules.",
    eta: "Updated weekly",
  },
  {
    id: "public-works",
    title: "Public Works Requests",
    summary: "Report road issues, utilities, and infrastructure needs.",
    eta: "5-7 business days",
  },
]

export async function GET() {
  return NextResponse.json(services)
}
