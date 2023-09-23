import React from "react";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

function AboutUs() {
  return (
    <>
      <NavBar />
      <div class="about">
        <div class="aboutContainer">
          <div class="left">
            <img
              src="https://images.pexels.com/photos/8978563/pexels-photo-8978563.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
            />
          </div>
          <div class="right">
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              sit id animi repudiandae! Totam eius quos, incidunt dolores harum
              alias nihil provident rerum in aspernatur eum, voluptas, doloribus
              vitae sunt. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quaerat aliquid corrupti a quidem! Quas, architecto alias
              ullam error aspernatur harum animi sequi illum, quis optio
              deleniti ad a ipsa? Labore. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Quasi aperiam nihil nisi
              voluptatibus deserunt itaque facilis dolores voluptates? Enim
              saepe sit ab assumenda, temporibus debitis dolores impedit!
              Asperiores, optio voluptatem? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Esse, nihil! Magni aliquam minus,
              laudantium illum quis repellat harum numquam eligendi saepe, qui
              tempore neque similique reiciendis id veritatis cum consectetur?
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
