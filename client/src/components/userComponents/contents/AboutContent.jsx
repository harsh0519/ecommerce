import React from "react";

import "./AboutContent.css"

function AboutContent() {
  return (
    <>
      <section class="about section" id="about">
        <div class="about__container container grid">
          <h2 class="section__title-1">
            <span>About Me.</span>
          </h2>

          <div class="about__perfil">
            <div class="about__image">
              <img
                src="./logo/logo-withoutbg.png"
                alt="image"
                class="about__img"
              />

              <div class="about__shadow"></div>

              <div class="geometric-box"></div>

              <div class="about__box"></div>
            </div>
          </div>

          <div class="about__info">
            <p class="about__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              debitis rerum in molestiae beatae.
            </p>

            <ul class="about__list">
              <li class="about__item">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, quisquam!
              </li>
            </ul>

            <div class="about__buttons">
              <a href="./index.html" class="button">
                <i class="ri-send-plane-line"></i> Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutContent;
