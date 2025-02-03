import React, { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios
      .post("http://localhost:3001/send-email", formData)
      .then((response) => {
        setResponseMessage("Your message has been sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setResponseMessage("There was an error sending your message.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="ftco-section">
      <div className="container" data-aos="zoom-in" data-aos-duration="1500">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="section__header mt-5">Contact Us</h2>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginTop: "-4%" }}
        >
          <div className="col-lg-10 col-md-12">
            <div className="wrapper">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="contact-wrap">
                    <h3 className="section__subheader mb-2">
                      Get in touch with us
                    </h3>
                    <div
                      id="form-message-success"
                      className="mb-4 w-100 text-center section__subheader"
                    >
                      Your message was sent, thank you!
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              id="message"
                              name="message"
                              cols="30"
                              rows="8"
                              placeholder="Message"
                              className="form-control"
                              value={formData.message}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12 mb-2">
                          <button
                            type="submit"
                            className="btn-1"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </div>
                      </div>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
