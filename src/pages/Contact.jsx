import { useRef, useState } from "react";
import classNames from "classnames";
import emailjs from "@emailjs/browser";
// import ReCAPTCHA from "react-google-recaptcha";
import { Section, Sending, Socials } from "../components";
import osushiImage from "../assets/img/osushi.png";

const Contact = () => {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [isChecked, setIsChecked] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const formRef = useRef();
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    setIsSent(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recaptcha = recaptchaRef.current;

    if (recaptcha) {
      const recaptchaValue = recaptcha.getValue();

      if (!recaptchaValue) {
        setIsChecked(false);
        setTimeout(() => setIsChecked(true), 500);
        return;
      }
    }

    setIsSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setIsSending(false);
        setIsSent(true);
        setForm({ from_name: "", from_email: "", message: "" });
      })
      .catch(() => {
        setIsSending(false);
      });
  };

  return (
    <Section className="flex h-auto flex-col">
      <div className="flex flex-row items-center gap-x-10">
        <h2>Let&apos;s Chat!</h2>
        <img alt="osushi" className="mb-20 mt-10 w-20" src={osushiImage} />
      </div>
      <form
        className="grid w-full grid-cols-2 gap-10"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="col">
          <input
            className="form-el"
            name="from_name"
            onChange={handleChange}
            placeholder="Osushi"
            required
            type="text"
            value={form.from_name}
          />
          <input
            className="form-el"
            name="from_email"
            onChange={handleChange}
            placeholder="osushi@email.com"
            required
            type="email"
            value={form.from_email}
          />
        </div>
        <div className="col">
          <textarea
            className="form-el min-h-[285px]"
            name="message"
            onChange={handleChange}
            placeholder="Let me know how I can help you!"
            required
            rows={3}
            value={form.message}
          />
          <div className="relative block w-full pt-29.5 lg:pt-0">
            <div
              className={classNames(
                "note absolute left-0 top-0 flex h-auto w-auto items-center justify-center break-words opacity-85 lg:-left-85",
                isChecked ? "" : "animate-shake",
              )}
            >
              {/* <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              /> */}
              Uncomment codes for ReCAPTCHA.
            </div>
            <button
              className={classNames(
                "form-el flex flex-row items-center justify-center gap-1 transition-colors duration-300 ease-ease hover:bg-red/80",
                isSent
                  ? "pointer-events-none bg-red/80"
                  : isSending
                    ? "pointer-events-none cursor-default bg-red/80 [&_span]:inline-block [&_span]:animate-wavy"
                    : "",
              )}
              type="submit"
            >
              {isSent ? (
                "Message Sent!"
              ) : isSending ? (
                <Sending />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </div>
      </form>
      <Socials className="pt-20" />
    </Section>
  );
};

export default Contact;
