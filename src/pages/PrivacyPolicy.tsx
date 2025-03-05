
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Effective Date: June 1, 2023
          </p>
          
          <p className="mb-4">
            At Skill Links, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through our platform. This information may include your name, email address, phone number, postal address, profile picture, payment information, and any other information you choose to provide.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send you related information, verify your identity, and communicate with you. We may also use the information to monitor and analyze trends, usage, and activities in connection with our platform, and to personalize and improve your experience.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
          <p>
            We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We may also share your information if we believe disclosure is necessary to comply with applicable laws, regulations, or legal processes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>
            You may access, update, or delete your account information at any time by logging into your account. If you wish to delete your account entirely, please contact us. Please note that we may retain certain information as required by law or for legitimate business purposes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
          <p className="mb-8">
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
