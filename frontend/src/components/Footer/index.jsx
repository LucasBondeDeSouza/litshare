import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default () => {

    return (
        <div className="bg-white">
            <div className="py-2"></div>

            <div className="container d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <span className="mb-3 mb-md-0 text-secondary">© {new Date().getFullYear()} Lucas Bonde</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a href="https://www.linkedin.com/in/lucasbonde/" target='_blank' className="text-primary fs-4">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </li>

                    <li className="ms-3">
                        <a className='text-dark fs-4' href="https://github.com/LucasBondeDeSouza" target='_blank'>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </li>

                    <li className="ms-3">
                        <a className='text-dark fs-4' href="https://lucasbonde.vercel.app/" target='_blank'>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}