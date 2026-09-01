"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------
// WEB-TO-LEAD SETUP (Setup > Web-to-Lead > Create Web-to-Lead Form):
// 1. Replace ORG_ID below with your Salesforce Org ID.
// 2. Replace RETURN_URL with your site's live /thankyou URL once hosted
//    (must be a full absolute URL, e.g. "https://davidandgeraldine.netlify.app/thankyou" —
//    Salesforce redirects the browser here after a real submission, and a
//    relative path won't resolve correctly from Salesforce's domain).
// 3. If you add custom fields in Salesforce for Attending / Guest Count,
//    swap the "attending" / "guests" input names below for the real API
//    names Salesforce gives you (they look like "00N5f00000XXXXX").
// ---------------------------------------------------------------------
const ORG_ID = "00Dak00001C8bfv";
const RETURN_URL = "https://david-geraldine-wedding.vercel.app/thankyou";

export default function RsvpForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    attending: "",
    guests: "1",
    message: "",
  });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: false }));
  }

  function validate() {
    const next = {
      firstName: values.firstName.trim().length === 0,
      lastName: values.lastName.trim().length === 0,
      email: !EMAIL_RE.test(values.email.trim()),
      attending: values.attending !== "yes" && values.attending !== "no",
      guests: values.guests === "" || Number(values.guests) < 1,
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  function handleSubmit(e) {
    // Only intercept to block invalid submissions. If everything's valid,
    // let the form submit for real — this is a genuine Web-to-Lead POST,
    // so Salesforce needs to receive it directly, not via fetch/JSON.
    if (!validate()) {
      e.preventDefault();
    }
  }

  return (
    <form
      id="rsvp-form"
      noValidate
      onSubmit={handleSubmit}
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
      method="POST"
    >
      <input type="hidden" name="oid" value={ORG_ID} />
      <input type="hidden" name="retURL" value={RETURN_URL} />
      <input type="hidden" name="lead_source" value="Wedding Site" />
      <input type="hidden" name="company" value="Wedding Guest" />

      <div className="field">
        <label htmlFor="f-first-name">FIRST NAME</label>
        <input
          id="f-first-name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
          aria-describedby="err-first-name"
          className={errors.firstName ? "invalid" : ""}
          value={values.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />
        <p
          className={"field-error" + (errors.firstName ? " show" : "")}
          id="err-first-name"
        >
          First name is required.
        </p>
      </div>

      <div className="field">
        <label htmlFor="f-last-name">LAST NAME</label>
        <input
          id="f-last-name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
          aria-describedby="err-last-name"
          className={errors.lastName ? "invalid" : ""}
          value={values.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />
        <p
          className={"field-error" + (errors.lastName ? " show" : "")}
          id="err-last-name"
        >
          Last name is required.
        </p>
      </div>

      <div className="field">
        <label htmlFor="f-email">EMAIL</label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby="err-email"
          className={errors.email ? "invalid" : ""}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <p
          className={"field-error" + (errors.email ? " show" : "")}
          id="err-email"
        >
          A valid email is required.
        </p>
      </div>

      <div className="field">
        <label htmlFor="f-attend">WILL YOU BE JOINING US?</label>
        <select
          id="f-attend"
          name="attending"
          required
          aria-describedby="err-attend"
          className={errors.attending ? "invalid" : ""}
          value={values.attending}
          onChange={(e) => update("attending", e.target.value)}
        >
          <option value="" disabled>
            Choose one
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <p
          className={"field-error" + (errors.attending ? " show" : "")}
          id="err-attend"
        >
          Please let us know if you&apos;re joining us.
        </p>
      </div>

      <div className="field">
        <label htmlFor="f-guests">NUMBER OF GUESTS (INCLUDING YOU)</label>
        <input
          id="f-guests"
          name="guests"
          type="number"
          min="1"
          max="10"
          required
          aria-describedby="err-guests"
          className={errors.guests ? "invalid" : ""}
          value={values.guests}
          onChange={(e) => update("guests", e.target.value)}
        />
        <p
          className={"field-error" + (errors.guests ? " show" : "")}
          id="err-guests"
        >
          Guest count is required.
        </p>
      </div>

      <div className="field">
        <label htmlFor="f-msg">A MESSAGE FOR THE COUPLE (OPTIONAL)</label>
        <textarea
          id="f-msg"
          name="description"
          rows={3}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <button className="btn" type="submit">
        Send RSVP
      </button>
    </form>
  );
}
