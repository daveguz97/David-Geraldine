import Link from "next/link";

export const metadata = {
  title: "Thank You — David & Geraldine",
  description:
    "Thank you for your RSVP to David and Geraldine's wedding, March 28, 2027.",
};

export default function ThankYou() {
  return (
    <div className="thankyou-wrap">
      <div className="thankyou-card">
        <span className="thankyou-heart">♥</span>
        <p className="script thankyou-title">Maraming salamat!</p>
        <div className="thankyou-rule"></div>
        <p>
          Your response has been received. We can&apos;t wait to celebrate
          with you.
        </p>
        <p className="thankyou-fine">
          Sunday, March 28, 2027 &middot; Legaspi, Galimuyod, Ilocos Sur
        </p>
        <Link className="back-link" href="/">
          ← Back to the invitation
        </Link>
      </div>
    </div>
  );
}
