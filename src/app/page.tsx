import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto space-y-8 text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          Create Your Professional Resume
        </h1>
        <p className="text-xl text-muted-foreground">
          Build a beautiful, professional resume in minutes. No design skills needed.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/create">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="grid w-full max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Easy to Use</CardTitle>
            <CardDescription>Simple step-by-step process</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create your resume in minutes with our intuitive interface.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Professional Templates</CardTitle>
            <CardDescription>Multiple styling options</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Choose from various professional templates and customize to your liking.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Export to PDF</CardTitle>
            <CardDescription>Download and share</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Export your resume as a PDF and share it with potential employers.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
