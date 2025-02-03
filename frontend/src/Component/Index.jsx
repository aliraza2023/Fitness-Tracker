import React, { useEffect } from "react";
import "./Index.css";
import AOS from "aos";
import CommentSection from "./Comment";
import ContactUs from "./ContactUs";

function Index() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <nav>
        <div className="nav__logo">
          <a href="/">
            <img src="/assets/img/logo.png" alt="logo" />
          </a>
        </div>
        <ul className="nav__links">
          <li className="link">
            <a href="#">Home</a>
          </li>
          <li className="link">
            <a href="#">Program</a>
          </li>
          <li className="link">
            <a href="#">Service</a>
          </li>
          <li className="link">
            <a href="#">About</a>
          </li>
          <li className="link">
            <a href="#">Community</a>
          </li>
        </ul>
        <ul className="nav__links">
          <li className="link">
            <a href="/Login">Login & Register</a>
          </li>
        </ul>
      </nav>
      <header className="section__container header__container">
        <div
          className="header__content"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <span className="bg__blur" />
          <span className="bg__blur header__blur" />
          <h4> BEST FITNESS IN THE TOWN</h4>
          <h1>
            <span>MAKE</span> YOUR BODY SHAPE
          </h1>
          <p>
            Unleash your potential and embark on a journey towards a stronger,
            fitter, and more confident you. Sign up for 'Make Your Body Shape'
            now and witness the incredible transformation your body is capable
            of!
          </p>
          <button className="btn-1">Get Started</button>
        </div>
        <div
          className="header__image"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <img src="/assets/img/header.png" alt="header" />
        </div>
      </header>
      <section className="section__container explore__container">
        <div className="explore__header">
          <h2 className="section__header">EXPLORE OUR PROGRAM</h2>
          <div className="explore__nav">
            <span>
              <i className="ri-arrow-left-line" />
            </span>
            <span>
              <i className="ri-arrow-right-line" />
            </span>
          </div>
        </div>
        <div className="explore__grid">
          <div
            className="explore__card"
            data-aos="flip-left"
            data-aos-duration="1500"
          >
            <span>
              <i className="ri-boxing-fill" />
            </span>
            <h4>Strength</h4>
            <p>
              Embrace the essence of strength as we delve into its various
              dimensions physical, mental, and emotional.
            </p>
            <a href="#">
              Join Now <i className="ri-arrow-right-line" />
            </a>
          </div>
          <div
            className="explore__card"
            data-aos="flip-left"
            data-aos-duration="1500"
          >
            <span>
              <i className="ri-heart-pulse-fill" />
            </span>
            <h4>Physical Fitness</h4>
            <p>
              It encompasses a range of activities that improve health,
              strength, flexibility, and overall well-being.
            </p>
            <a href="#">
              Join Now <i className="ri-arrow-right-line" />
            </a>
          </div>
          <div
            className="explore__card"
            data-aos="flip-left"
            data-aos-duration="1500"
          >
            <span>
              <i className="ri-run-line" />
            </span>
            <h4>Fat Lose</h4>
            <p>
              Through a combination of workout routines and expert guidance,
              we'll empower you to reach your goals.
            </p>
            <a href="#">
              Join Now <i className="ri-arrow-right-line" />
            </a>
          </div>
          <div
            className="explore__card"
            data-aos="flip-left"
            data-aos-duration="1500"
          >
            <span>
              <i className="ri-shopping-basket-fill" />
            </span>
            <h4>Weight Gain</h4>
            <p>
              Designed for individuals, our program offers an effective approach
              to gaining weight in a sustainable manner.
            </p>
            <a href="#">
              Join Now <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>
      <section className="section__container class__container">
        <div className="class__image" data-aos="fade-right">
          <span className="bg__blur" />
          <img
            src="/assets/img/class-1.jpg"
            alt="class"
            className="class__img-1"
          />
          <img
            src="/assets/img/class-2.jpg"
            alt="class"
            className="class__img-2"
          />
        </div>
        <div className="class__content" data-aos="fade-left">
          <h2 className="section__header">THE CLASS YOU WILL GET HERE</h2>
          <p>
            Led by our team of expert and motivational instructors, "The Class
            You Will Get Here" is a high-energy, results-driven session that
            combines a perfect blend of cardio, strength training, and
            functional exercises. Each class is carefully curated to keep you
            engaged and challenged, ensuring you never hit a plateau in your
            fitness endeavors.
          </p>
          <button className="btn-1">Book A Class</button>
        </div>
      </section>
      <section className="section__container join__container">
        <h2 className="section__header">WHY JOIN US ?</h2>
        <p className="section__subheader">
          Our diverse membership base creates a friendly and supportive
          atmosphere, where you can make friends and stay motivated.
        </p>
        <div className="join__image">
          <img
            src="/assets/img/join.jpg"
            alt="Join"
            data-aos="zoom-in"
            data-aos-duration="1500"
          />
          <div
            className="join__grid"
            data-aos="zoom-in-up"
            data-aos-duration="1500"
          >
            <div className="join__card">
              <span>
                <i className="ri-user-star-fill" />
              </span>
              <div className="join__card__content">
                <h4>Personal Trainer</h4>
                <p>Unlock your potential with our expert Personal Trainers.</p>
              </div>
            </div>
            <div className="join__card">
              <span>
                <i className="ri-vidicon-fill" />
              </span>
              <div className="join__card__content">
                <h4>Practice Sessions</h4>
                <p>Elevate your fitness with practice sessions.</p>
              </div>
            </div>
            <div className="join__card">
              <span>
                <i className="ri-building-line" />
              </span>
              <div className="join__card__content">
                <h4>Good Management</h4>
                <p>Supportive management, for your fitness success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section__container price__container">
        <h2 className="section__header">OUR PRICING PLAN</h2>
        <p className="section__subheader">
          Our pricing plan comes with various membership tiers, each tailored to
          cater to different preferences and fitness aspirations.
        </p>
        <div className="price__grid">
          <div
            className="price__card"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="price__card__content">
              <h4>Basic Plan</h4>
              <h3>$16</h3>
              <p>
                <i className="ri-checkbox-circle-line" />
                Smart workout plan
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                At home workouts
              </p>
            </div>
            <button className="btn-1 price__btn-1">Join Now</button>
          </div>
          <div
            className="price__card"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="price__card__content">
              <h4>Weekly Plan</h4>
              <h3>$25</h3>
              <p>
                <i className="ri-checkbox-circle-line" />
                PRO Gyms
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                Smart workout plan
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                At home workouts
              </p>
            </div>
            <button className="btn-1 price__btn-1">Join Now</button>
          </div>
          <div
            className="price__card"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="price__card__content">
              <h4>Monthly Plan</h4>
              <h3>$45</h3>
              <p>
                <i className="ri-checkbox-circle-line" />
                ELITE Gyms &amp; Classes
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                PRO Gyms
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                Smart workout plan
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                At home workouts
              </p>
              <p>
                <i className="ri-checkbox-circle-line" />
                Personal Training
              </p>
            </div>
            <button className="btn-1 price__btn-1">Join Now</button>
          </div>
        </div>
      </section>
      <section className="review">
        <div className="section__container review__container">
          <span>
            <i className="ri-double-quotes-r" />
          </span>
          <div
            className="review__content"
            data-aos="fade-right"
            data-aos-anchor-placement="center-center"
          >
            <h4>MEMBER REVIEW</h4>
            <p>
              What truly sets this gym apart is their expert team of trainers.
              The trainers are knowledgeable, approachable, and genuinely
              invested in helping members achieve their fitness goals. They take
              the time to understand individual needs and create personalized
              workout plans, ensuring maximum results and safety.
            </p>
            <div className="review__rating">
              <span>
                <i className="ri-star-fill" />
              </span>
              <span>
                <i className="ri-star-fill" />
              </span>
              <span>
                <i className="ri-star-fill" />
              </span>
              <span>
                <i className="ri-star-fill" />
              </span>
              <span>
                <i className="ri-star-half-fill" />
              </span>
            </div>
            <div className="review__footer">
              <div className="review__member">
                <img src="/assets/img/member.jpg" alt="member" />
                <div className="review__member__details">
                  <h4>Jane Cooper</h4>
                  <p>Software Developer</p>
                </div>
              </div>
              <div className="review__nav">
                <span>
                  <i className="ri-arrow-left-line" />
                </span>
                <span>
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactUs />
      <CommentSection />
      <footer className="section__container footer__container">
        <span className="bg__blur" />
        <span className="bg__blur footer__blur" />
        <div className="footer__col mb-5">
          <div
            className="footer__logo"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <img
              src="/assets/img/logo.png"
              alt="logo"
              style={{ width: "250px", height: "auto" }}
            />
          </div>
          <p data-aos="fade-right" data-aos-duration="1500">
            Take the first step towards a healthier, stronger you with our
            unbeatable pricing plans. Let's sweat, achieve, and conquer
            together!
          </p>
          <div
            className="footer__socials"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <a href="#">
              <i className="ri-facebook-fill" />
            </a>
            <a href="#">
              <i className="ri-instagram-line" />
            </a>
            <a href="#">
              <i className="ri-twitter-fill" />
            </a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <a href="#">Business</a>
          <a href="#">Franchise</a>
          <a href="#">Partnership</a>
          <a href="#">Network</a>
        </div>
        <div className="footer__col">
          <h4>About Us</h4>
          <a href="#">Blogs</a>
          <a href="#">Security</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">BMI Calculator</a>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2024 Fitness Tracker. All rights reserved.
      </div>
    </>
  );
}

export default Index;
