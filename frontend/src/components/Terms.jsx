// src/components/Terms.jsx
import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms and Conditions
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          Welcome to <strong>cccimages.online</strong>. By using our
          image-sharing and creative assets platform, you agree to the following
          terms and conditions. Please read them carefully before using our
          services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum legal age in your
          country) to create an account and use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>You are responsible for the content you upload or share.</li>
          <li>
            Do not upload illegal, harmful, or copyrighted material without
            proper rights.
          </li>
          <li>
            Respect other users and do not use the platform for harassment or
            abuse.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
        <p>
          You retain ownership of the content you upload. By sharing on
          <strong> cccimages.online</strong>, you grant us a limited license to
          display, distribute, and promote your content within the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Prohibited Activities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Uploading malicious software or attempting to hack the site.</li>
          <li>Using the platform for spam or fraudulent activities.</li>
          <li>Violating applicable laws or third-party rights.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Service Availability</h2>
        <p>
          We aim to keep the service available at all times, but we do not
          guarantee uninterrupted access. Maintenance, updates, or unforeseen
          issues may temporarily affect availability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          cccimages.online is not responsible for any damages, losses, or issues
          arising from your use of the platform, including third-party
          interactions or content.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Any significant changes
          will be posted here with a new “last updated” date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please
          reach out at{" "}
          <a
            href="mailto:support@cccimages.online"
            className="text-blue-600 underline"
          >
            support@cccimages.online
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Terms;
