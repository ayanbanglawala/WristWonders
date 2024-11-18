import React from "react";
import logo from "../../assets/Images/Logo.png";
import { FaFilter } from "react-icons/fa6";


const ProductNav = () => {
  return (
    <div className="navbar bg-base-100 m-0 py-0 w-100">
      <div className="navbar-start"></div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <FaFilter/>Filter
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductNav;
