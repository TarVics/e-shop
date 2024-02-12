import React from "react";
import { Link } from "react-router-dom";

import imagesData from "../../data/app/images.data";
import { uriService } from "../../services";
import { useAppSelector } from "../../hooks";
import { PrimaryButton } from "..";

const FooterSection: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  return (
    <>
      {/* <!-- FOOTER --> */}
      <footer id="footer" className="section section-grey">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            {/* <!-- footer widget --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              <div className="footer">
                {/* <!-- footer logo --> */}
                <div className="footer-logo">
                  <Link className="logo" to={uriService.uriHome()}>
                    <img src={imagesData.logo} alt="" />
                  </Link>
                </div>
                {/* <!-- /footer logo --> */}

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut
                  labore et dolore magna</p>

                {/* <!-- footer social --> */}
                <ul className="footer-social">
                  <li><a href="."><i className="fa fa-facebook"></i></a></li>
                  <li><a href="."><i className="fa fa-twitter"></i></a></li>
                  <li><a href="."><i className="fa fa-instagram"></i></a></li>
                  <li><a href="."><i className="fa fa-google-plus"></i></a></li>
                  <li><a href="."><i className="fa fa-pinterest"></i></a></li>
                </ul>
                {/* <!-- /footer social --> */}
              </div>
            </div>
            {/* <!-- /footer widget --> */}

            {/* <!-- footer widget --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              <div className="footer">
                <h3 className="footer-header">{i18n.value.MY_ACCOUNT}</h3>
                <ul className="list-links">
                  <li><a href=".">{i18n.value.MY_ACCOUNT}</a></li>
                  <li><a href=".">{i18n.value.MY_WISHLIST}</a></li>
                  <li><a href=".">{i18n.value.COMPARE}</a></li>
                  <li><a href=".">{i18n.value.CHECKOUT}</a></li>
                  <li><a href=".">{i18n.value.LOGIN}</a></li>
                </ul>
              </div>
            </div>
            {/* <!-- /footer widget --> */}

            <div className="clearfix visible-sm visible-xs"></div>

            {/* <!-- footer widget --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              <div className="footer">
                <h3 className="footer-header">{i18n.value.CUSTOMER_SERVICE}</h3>
                <ul className="list-links">
                  <li><a href=".">{i18n.value.ABOUT_US}</a></li>
                  <li><a href=".">{i18n.value.SHIP_N_RETURN}</a></li>
                  <li><a href=".">{i18n.value.SHIP_GUIDE}</a></li>
                  <li><a href=".">FAQ</a></li>
                </ul>
              </div>
            </div>
            {/* <!-- /footer widget --> */}

            {/* <!-- footer subscribe --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              <div className="footer">
                <h3 className="footer-header">{i18n.value.STAY_CONNECT}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                <form>
                  <div className="form-group">
                    <input className="input" placeholder={i18n.value.EMAIL_PLACEHOLDER} />
                  </div>
                  <PrimaryButton>{i18n.value.JOIN_NEWSLETTER}</PrimaryButton>
                </form>
              </div>
            </div>
            {/* <!-- /footer subscribe --> */}
          </div>
          {/* <!-- /row --> */}
          <hr />
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              {/* <!-- footer copyright --> */}
              <div className="footer-copyright">
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                Copyright &copy;
                <script>document.write(new Date().getFullYear());</script>
                All rights reserved | This template is made with <i className="fa fa-heart-o"
                                                                    aria-hidden="true"></i>&nbsp;
                by <a href="https://github.com/TarVics" target="_blank" rel="noreferrer">TarVic</a>
              </div>
              {/* <!-- /footer copyright --> */}
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </footer>
      {/* <!-- /FOOTER --> */}
    </>
  );
};

export { FooterSection };
