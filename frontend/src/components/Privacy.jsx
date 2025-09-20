import React from "react";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">
      <Helmet>
        <title>Privacy Policy | CCCImages</title>
        <meta
          name="description"
          content="Read the privacy policy of CCCImages. Learn how we collect, use, and protect your information when using our free image compression, conversion, and cropping tools."
        />
        <meta
          name="keywords"
          content="CCCImages privacy policy, data security, user rights, cookies, online image tools privacy"
        />
        <meta property="og:title" content="Privacy Policy | CCCImages" />
        <meta
          property="og:description"
          content="Understand how CCCImages handles your privacy. We protect your data and never sell personal information. Learn about cookies, user rights, and third-party services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cccimages.online/privacy" />
        <link rel="canonical" href="https://cccimages.online/privacy" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          At <strong>cccimages.online</strong>, we care about your privacy. This policy
          explains how we collect, use, and protect your information when you
          use our image‑sharing and creative assets platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Email address and login details when you create an account.</li>
          <li>Uploaded images and creative assets you choose to share.</li>
          <li>Basic usage data, like how you interact with our site.</li>
        </ul>
        <p className="mt-2">
          We collect this information only to create your account,
          personalize your experience, and improve our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How We Use Information</h2>
        <p>
          Your personal data helps us provide a smooth, secure, and personalized
          experience. We do <strong>not sell your personal data</strong> to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
        <p>
          We use reasonable security measures to protect your information.
          However, no method of transmission over the internet is completely
          secure, so we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p>
          We use cookies to remember your preferences and to analyze site
          traffic. You can disable cookies in your browser settings, but some
          features of the site may not work properly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Third‑Party Services</h2>
        <p>
          We may use third‑party tools like Google Analytics or ad networks.
          These services may collect anonymized information about your activity
          to help us understand usage and improve the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">User Rights</h2>
        <p>
          If you are covered by GDPR or CCPA, you have rights to access,
          correct, delete, or opt‑out of certain uses of your personal data.
          Please contact us if you’d like to exercise these rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Any significant changes
          will be posted here with a new “last updated” date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us at <a href="mailto:support@cccimages.online" className="text-blue-600 underline">support@cccimages.online</a>.
        </p>
      </section>
    </div>
  );
};

export default Privacy;
