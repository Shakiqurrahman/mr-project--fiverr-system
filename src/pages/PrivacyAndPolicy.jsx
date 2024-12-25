import { Link } from "react-router-dom";
import Divider from "../components/Divider";

function PrivacyAndPolicy() {
  return (
    <div className="mx-auto max-w-[900px] px-4">
      <h1 className="mb-8 mt-[70px] text-2xl font-semibold text-primary sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-5 leading-[30px]">
        Thank you for joining the mahfujurrahm535 family, We are dedicated to
        safeguarding your personal data and ensuring your privacy. If you have
        any questions or inquiries regarding our privacy policy, please feel
        free to contact us at{" "}
        <Link
          className="break-words text-primary underline decoration-solid hover:text-red-500"
          to="/contact"
        >
          https://mahfujurrahm535.com/contact.
        </Link>
      </p>
      <p className="mt-5">
        Our belief is that when you use our website or server, you trust us
        completely with your information and privacy. We place the highest
        importance on both your personal information and your privacy. Through
        this policy, we want to make it clear how we collect information, how we
        use that information, and what rights you have in these matters.
      </p>
      <p className="mt-5">
        We hope that you will carefully read this policy because it is crucial
        for you. If there is any issue or concern with which you disagree or
        feel uncomfortable, please contact us immediately. We will also request
        you to carefully read the following policy, as it will provide you with
        a clear understanding of our practices.
      </p>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-primary sm:text-2xl">
          What Information Do We Collect:
        </h3>

        <div className="mt-5 flex items-stretch gap-5">
          <Divider className="w-[3px] flex-shrink-0 bg-[#1b8cdc!important]" />
          <div>
            <p>
              Our connection with your privacy depends on the nature of your
              product and service use. We collect various information based on
              your product or service use. The information we collect may
              include:
            </p>

            <ul className="marker:text-primary">
              <li className="mx-4 mt-5 list-disc">
                Personal information provided by you, such as your phone number,
                email address, name, address, and password.
              </li>
              <li className="mx-4 mt-5 list-disc">
                Information related to financial transactions. We collect the
                necessary information for your purchased products or
                transactions. For example, credit card numbers and passwords
                connected to financial transactions.
              </li>
              <li className="mx-4 mt-5 list-disc">
                Information related to social media accounts. If you wish to
                register on our website using your social media account (such as
                Facebook, Twitter, or others), you can do so.
              </li>
              <p className="mt-5">
                All the information provided by you must be true, complete, and
                accurate. If there is any change in this information, you must
                inform us immediately.
              </p>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mt-10 text-lg font-semibold text-primary sm:text-2xl">
          Automated Data Collection:
        </h3>
        <div className="mt-5 flex items-stretch gap-5">
          <Divider className="w-[3px] flex-shrink-0 bg-[#1b8cdc!important]" />
          <div>
            <p className="">
              When you visit our web page or use our site, we collect certain
              specific information. This information does not help us identify
              you (such as your name, and where you live). However, it provides
              us with your device&apos;s IP address, operating system, your
              location, language preferences, and other details of how and when
              you accessed our site.
            </p>
            <p className="mt-5">
              This information is primarily required for the security and
              management of our website. It also helps in internal analysis and
              report preparation.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-stretch gap-5">
        <Divider className="w-[3px] flex-shrink-0 bg-[#1b8cdc!important]" />
        <div>
          <div>
            <h4 className="mb-2 text-xl font-medium sm:text-xl">
              How We Use Your Information:
            </h4>
            <p className="mb-4">
              We use your information based on your consent and compliance with
              legal obligations for our business interests.
            </p>
          </div>

          <div>
            <h4 className="mb-2 mt-5 text-xl font-medium sm:text-xl">
              Do We Use Cookies and Other Tracking Technologies?
            </h4>
            <p className="mb-4">
              Yes, from time to time, we use cookies and other tracking
              technologies to collect information.
            </p>
          </div>

          <div>
            <h4 className="mb-2 mt-5 text-xl font-medium sm:text-xl">
              Do We Update Our Privacy Policy?
            </h4>
            <p className="mb-4">
              Yes, we update our policy to ensure compliance with current and
              relevant laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyAndPolicy;
