import Link from 'next/link';

export default function LegalConsultationPage() {
  return (
    <div className="min-h-screen bg-white text-[#4B2615]">
      <div className="pt-20">
        
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#4B2615]/70 hover:text-[#4B2615] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        {/* Page content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-[#4B2615]">Legal Consultation Services</h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-[#4B2615]/80 leading-relaxed mb-8">
                Law Firm is one of the leading legal offices that offer exceptional advisory services for both individuals and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients' needs and offer the best legal solutions in various cases and fields, we provide our legal consultations services as follow:
              </p>
            </div>

            <div className="space-y-12">
              
              {/* General Legal Consultations */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#4B2615]">General Legal Consultations</h2>
                <div className="bg-[#4B2615] rounded-lg p-8 text-white">
                  <p className="text-white/90 mb-6 leading-relaxed">
                    At Law Firm, we provide comprehensive legal consultations covering all legal aspects that our clients may encounter in their daily lives or business activities. Our goal is to offer accurate legal advice based on a deep understanding of local and international laws.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg">Our advisory services about:</h4>
                    <ul className="list-disc list-inside space-y-3 text-white/90 pl-4">
                      <li>Establishing and registering companies</li>
                      <li>All kinds of contracts and agreements</li>
                      <li>Commercial disputes</li>
                      <li>Compliance with local and international laws and regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Corporate Legal Consultations */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#4B2615]">Corporate Legal Consultations</h2>
                <div className="bg-[#4B2615] rounded-lg p-8 text-white">
                  <p className="text-white/90 mb-6 leading-relaxed">
                    We at the Law Firm understand the importance of legal consultations for companies in building and enhancing their businesses.
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg">Our advisory services about:</h4>
                    <ul className="list-disc list-inside space-y-3 text-white/90 pl-4">
                      <li>Establishing and registering companies</li>
                      <li>All kinds of contracts and agreements</li>
                      <li>Commercial disputes</li>
                      <li>Compliance with local and international laws and regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Individual Legal Consultations */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#4B2615]">Individual Legal Consultations</h2>
                <div className="bg-[#4B2615] rounded-lg p-8 text-white">
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Law Firm offers customized advisory services for individuals, including:
                  </p>
                  <div className="space-y-4">
                    <ul className="list-disc list-inside space-y-3 text-white/90 pl-4">
                      <li>Family issues such as divorce, alimony, and custody</li>
                      <li>Real estate matters like buying, selling, and renting properties</li>
                      <li>Employment issues such as hiring and wrongful termination</li>
                      <li>Criminal cases and defending personal rights</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="bg-[#4B2615] rounded-lg p-8 text-center text-white mt-12">
                <p className="text-lg text-white/95 leading-relaxed mb-6">
                  At Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal solutions. Contact us today to receive professional and comprehensive legal consultation.
                </p>
                <Link 
                  href="/contact"
                  className="inline-block bg-white text-[#4B2615] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
