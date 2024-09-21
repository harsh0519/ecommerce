import React from "react";
import delivery1Img from "@/assets/delivery1.png";
import delivery2Img from "@/assets/delivery2.png";
import chatImg from "@/assets/chat.png";
import returnImg from "@/assets/return.png";
import "./Delivery.css"

export const Delivery = () => {
  return (
    <div class="delivery">
      <ul>
        <li>
          <a href="#">
            <img src={delivery1Img} alt="" />
            <span>
              Discreet <br />
              packaging
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={delivery2Img} alt="" />
            <span>
              Cash on<br />
              Delivery
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={chatImg} alt="" />
            <span>
              Customer <br />
              Support
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={returnImg} alt="" />
            <span>
              7-10 Days  <br />
              Delivery Time
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};
