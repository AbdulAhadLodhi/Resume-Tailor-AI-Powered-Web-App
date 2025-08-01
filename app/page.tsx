// app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Resume Tailor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered resume optimization that helps you land your dream job
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Upload your resume, paste a job description, and get personalized suggestions 
            to make your resume stand out from the crowd.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link 
              href="/demo"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition shadow-lg border border-blue-200"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-blue-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
            <p className="text-gray-600">Simply upload your current resume in PDF or Word format</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Job Description</h3>
            <p className="text-gray-600">Paste the job description you're targeting</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-purple-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get AI Suggestions</h3>
            <p className="text-gray-600">Receive personalized optimization recommendations</p>
          </div>
        </div>
      </div>
    </main>
  )
}