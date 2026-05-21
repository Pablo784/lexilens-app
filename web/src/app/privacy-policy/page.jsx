export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy for LexiLens
        </h1>

        <p className="text-sm text-gray-600 mb-8">
          Last Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              LexiLens ("we," "our," or "the app") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              share, and protect your personal information when you use the
              LexiLens Visual Dictionary mobile application.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using LexiLens, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              1. Images
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use the camera scanning or photo upload features,
              LexiLens collects images that you capture or select from your
              device's photo library. These images are used solely for the
              purpose of identifying words within them to provide you with
              dictionary definitions.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              2. Text Queries
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you search for word definitions, we collect the text queries
              (words) you enter into the search field. This data is used to
              retrieve definitions, generate example sentences, and create usage
              scenarios.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              3. Search History
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your search history (words you've looked up, phonetic
              pronunciations, and timestamps) is stored locally on your device
              only. This data never leaves your device and is not transmitted to
              our servers or any third parties. You can delete your search
              history at any time through the app's Settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              4. Device Permissions
            </h3>
            <p className="text-gray-700 leading-relaxed">
              LexiLens requests the following permissions:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                <strong>Camera Access:</strong> To scan images containing words
              </li>
              <li className="mb-2">
                <strong>Photo Library Access:</strong> To upload existing photos
                for word identification
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              These permissions are requested only when you attempt to use the
              relevant features, and you can deny them at any time through your
              device settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                <strong>Word Identification:</strong> Images are analyzed to
                identify English words contained within them
              </li>
              <li className="mb-2">
                <strong>Definition Retrieval:</strong> Text queries are used to
                fetch word definitions from the Free Dictionary API
              </li>
              <li className="mb-2">
                <strong>AI-Enhanced Learning:</strong> Text queries and
                definitions are sent to OpenAI's GPT Vision API to generate
                contextual example sentences and real-world usage scenarios
              </li>
              <li className="mb-2">
                <strong>App Functionality:</strong> To provide you with
                accurate, helpful, and educational content
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Third-Party Data Sharing
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              OpenAI GPT Vision API
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              LexiLens shares the following data with OpenAI (the provider of
              GPT Vision API):
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                <strong>Images:</strong> Photos you capture or upload are sent
                to OpenAI for word identification
              </li>
              <li className="mb-2">
                <strong>Text queries:</strong> Words and their definitions are
                sent to OpenAI to generate example sentences and usage scenarios
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              Data Protection Commitment
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              OpenAI provides the same or equal level of protection for user
              data as stated in this Privacy Policy and as required by Apple's
              App Store Guidelines. Specifically:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                OpenAI processes data in accordance with their{" "}
                <a
                  href="https://openai.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://openai.com/policies/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Terms of Use
                </a>
              </li>
              <li className="mb-2">
                OpenAI does not use data submitted via their API to train or
                improve their models (as per their API Data Usage Policy)
              </li>
              <li className="mb-2">
                Data sent to OpenAI is processed temporarily and is not stored
                permanently by OpenAI
              </li>
              <li className="mb-2">
                OpenAI employs industry-standard security measures including
                encryption in transit and at rest
              </li>
              <li className="mb-2">
                OpenAI complies with applicable data protection regulations
                including GDPR and CCPA
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              Free Dictionary API
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Word definitions are retrieved from the Free Dictionary API
              (dictionaryapi.dev), a free and open-source dictionary service.
              Only the word text itself is sent to this service. This service
              does not collect or store personal information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
              Your Consent
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before any images or text queries are sent to third-party AI
              services, LexiLens will request your explicit consent through a
              detailed privacy consent modal. You can:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                Accept and enable AI-powered features (image scanning, example
                sentences, usage scenarios)
              </li>
              <li className="mb-2">
                Decline and use the app with manual word search only (no data
                sent to AI services)
              </li>
              <li className="mb-2">
                Change your consent preference at any time in the app's Settings
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Retention and Storage
            </h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                <strong>Images:</strong> Not stored by LexiLens. Processed
                temporarily by OpenAI and then discarded
              </li>
              <li className="mb-2">
                <strong>Text queries:</strong> Not stored by LexiLens servers.
                Processed temporarily by OpenAI and then discarded
              </li>
              <li className="mb-2">
                <strong>Search history:</strong> Stored locally on your device
                only. You can delete it at any time through Settings
              </li>
              <li className="mb-2">
                <strong>Privacy consent preference:</strong> Stored locally on
                your device
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              LexiLens does not operate its own servers to store user data. All
              processing is done in real-time, and no personal data is retained
              by LexiLens after processing is complete.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take the security of your data seriously:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                All data transmitted to third-party services is encrypted using
                HTTPS/TLS
              </li>
              <li className="mb-2">
                We only share the minimum necessary data required to provide the
                requested functionality
              </li>
              <li className="mb-2">
                We work only with third-party providers (OpenAI) that maintain
                industry-standard security practices
              </li>
              <li className="mb-2">
                Local data (search history, consent preferences) is stored
                securely on your device using platform-standard secure storage
                mechanisms
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                <strong>Consent Control:</strong> Enable or disable AI features
                at any time in Settings
              </li>
              <li className="mb-2">
                <strong>Data Deletion:</strong> Clear your search history at any
                time through Settings
              </li>
              <li className="mb-2">
                <strong>Permission Management:</strong> Revoke camera or photo
                library access through your device settings
              </li>
              <li className="mb-2">
                <strong>Limited Use:</strong> Use the app without AI features by
                declining consent (manual word search remains available)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              LexiLens does not knowingly collect personal information from
              children under 13. The app is designed for general audiences. If
              you believe we have inadvertently collected information from a
              child under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by updating the "Last Updated" date at
              the top of this policy. Continued use of the app after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Email:{" "}
              <a
                href="mailto:privacy@lexilens.app"
                className="text-blue-600 underline"
              >
                privacy@lexilens.app
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy complies with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                Apple App Store Review Guidelines (Section 5.1 - Privacy)
              </li>
              <li className="mb-2">
                General Data Protection Regulation (GDPR) where applicable
              </li>
              <li className="mb-2">
                California Consumer Privacy Act (CCPA) where applicable
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
