import React from "react";
import "./Category.css";
import masturbator from "@/assets/masturbator.png";
import dildo1 from "@/assets/dildo1.png";
import bondage from "@/assets/bondage.png";
import ladies from "@/assets/ladies.png";
import dildo from "@/assets/dildo.png";
import butt from "@/assets/butt.png";

function Category() {
  return (
    <div class="category">
      <h1>Category</h1>
      <span>Explore our wide range </span>
      <ul>
        <li>
          <a href="#">
            <img src={masturbator} alt="" />
            <span>Men</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={dildo1} alt="" />
            <span>Women</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={bondage} alt="" />
            <span>Bondage</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={ladies} alt="" />
            <span>Couple</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={dildo} alt="" />
            <span>Vibrators</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={butt} alt="" />
            <span>Anal</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Category;
