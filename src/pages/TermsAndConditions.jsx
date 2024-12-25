import { useState } from "react";
import Divider from "../components/Divider";

function TermsAndConditions() {
  const [tos, setTos] = useState("terms-condition");

  const handleClick = (e) => {
    setTos(e.target.value);
  };

  return (
    <div className="mx-auto max-w-[900px] px-4 leading-[26px]">
      <div className="heading flex justify-around">
        <button
          value="terms-condition"
          className={`${
            tos === "terms-condition" ? "text-primary underline" : "text[#000]"
          } mb-8 mt-[50px] text-base font-medium underline-offset-4 sm:text-2xl lg:text-3xl`}
          onClick={handleClick}
        >
          Terms & Conditions
        </button>
        <button
          value="refund-policy"
          className={`${
            tos !== "terms-condition" ? "text-primary underline" : "text[#000]"
          } mb-8 mt-[50px] text-base font-medium sm:text-2xl lg:text-3xl`}
          onClick={handleClick}
        >
          Refund Policy
        </button>
      </div>
      <Divider className="h-px w-full bg-[#000!important]" />

      {tos === "terms-condition" ? (
        <div className="p-2">
          <h2 className="mb-6 mt-10 text-lg font-medium text-primary sm:text-2xl">
            Terms & Conditions
          </h2>
          <ul className="flex list-disc flex-col gap-3 pl-5 *:leading-[2] marker:text-primary">
            <li>
              To contact us or purchase any of our designs you must first create
              an account. You can create an account for FREE. You must keep your
              account email/username password secure.
            </li>

            <li>
              We require customers to pay in advance to purchase any design or
              start a project for any design.
            </li>

            <li>
              We have a few options to start the project, You can start the
              project through any option:
              <p>
                <span className="font-bold">1.</span> You can start by clicking
                &quot;Project&quot; from the top bar or footer.
              </p>
              <p>
                <span className="font-bold">2.</span> You can start by clicking
                &quot;Project Start&quot; from the Price List page, or Design
                Description page.
              </p>
              <p>
                <span className="font-bold">3.</span> You can first collect your
                favorite designs in the cart list then you can start the project
                for your favorite designs from the cart list.
              </p>
              <p>
                (You can start a project from a cart list for one design, or you
                can start a project from a cart list for multiple designs.)
              </p>
              <p>
                <span className="font-bold">4.</span> You can start the project
                through a custom offer from the inbox.
              </p>
              <p>
                <span className="font-bold">5.</span> You can start the project
                through the offer from the home page banner.
              </p>
            </li>

            <li>
              The requirements page must be completed when starting a customer
              project, as we will create the customer&apos;s design according to
              these requirements.
            </li>

            <li>
              You will need to provide us with your specific information so that
              we can create your design.
            </li>
            <li>
              How we will work on the project:
              <h4 className="mt-3 font-semibold">Start work</h4>
              <p>
                After completing the customer requirement page we will start the
                design work.
              </p>
              <h4 className="mt-3 font-semibold">First concept</h4>
              <p>
                The customer gives us the time to create his design, we will
                create it and show it to him within that time.
              </p>
              <p>
                (Then, if the customer feels the need to change something in
                this design, then we will correct the changes if the customer
                informs us about the changes.)
              </p>
              <h4 className="mt-3 font-semibold">Final delivery</h4>
              <p>
                After the design work is completed we will deliver the final
                file according to the package selected by the customer.
              </p>
            </li>
            <li>
              The customer must make all changes/revisions before we send the
              final file, no changes/revisions will be accepted after we send
              the final file.
            </li>
            <li>
              If there are any errors on our part after sending the final file,
              we will only correct those errors. If there is an error on the
              part of the customer, the customer must start a new project to
              correct the error.
            </li>
            <li>
              We don&apos;t give the customer two options to choose from when
              creating a new design. We only provide one design option. If the
              customer doesn&apos;t like the first design, we will create a
              second design for the customer. But we will delete the first
              design while creating the second design. If the customer decides
              to accept the first design after seeing the second design. Then
              the customer will not get the first design from us. We won&apos;t
              create the first design a second time. So if the customer likes
              the first design, it should be accepted immediately.
            </li>
            <li>
              You can only use our designs for your personal or business
              purposes.
            </li>
            <li>You can&apos;t resell our designs.</li>
            <li>
              We don&apos;t provide any Images. You must provide us with images
              to use in your design.
            </li>
            <li>
              We will only create the design. We do not print any designs. You
              have to get your design printed from another print shop/company
            </li>
            <li>
              If you like one of our designs, and you want to start a project
              for this design, please take a look at the design description
              before starting the project.
            </li>
            <li>No complaints will be accepted after project completion.</li>
            <li>You cannot cancel the project without any reason.</li>
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="mb-6 mt-10 text-lg font-medium text-primary sm:text-2xl">
            Refund Policy
          </h2>
          <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-primary">
            <li>
              If you accidentally start a project, you must notify us within 5
              hours of starting the project. We will be happy to refund you.
            </li>
            <li>
              If you don&apos;t like the design we created, you should let us
              know before we send the final file. We will gladly refund you.
              However, refunds will not be accepted after we have sent the final
              file
            </li>
            <li>
              After you start a project, we will not provide additional services
              to you if you ask us for additional services beyond the package of
              the project. You will not be eligible for a refund based on this
              issue.
            </li>
          </ul>
        </div>
      )}
      {/* Refund Policy Start here  */}
    </div>
  );
}

export default TermsAndConditions;
