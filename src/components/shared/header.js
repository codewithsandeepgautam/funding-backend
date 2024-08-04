import React from 'react';
import { MdEmail } from "react-icons/md";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import weblogo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>
            <div className='bg-orange-400 h-[50px] w-full'>
                <div className='flex justify-between'>
                    <div className='flex items-center space-x-2 pl-60 py-3 text-white text-sm cursor-pointer'>
                        <MdEmail />
                        <h3>sandeepgautam65413@gmail.com</h3>
                        <MdOutlinePhonelinkRing />
                        <p>7087670401</p>
                    </div>
                    <div className='flex items-center text-white space-x-4 mr-20 cursor-pointer'>
                        {
                            socialLinks.map((item, index) => {
                                return (
                                    <a href={item.href} key={index} target="_blank" rel="noreferrer">
                                        <button>
                                            {item.linkimg}
                                        </button>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='h-[80px] w-full flex items-center justify-around'>
             <div className='ml-60 cursor-pointer'>
            <img src={weblogo} alt="Funds" />
             </div>
             <ul className='flex space-x-5 items-center cursor-pointer text-[#282828] font-medium py-[30px] inline-block text-[16px]'>
                {
                    nav.map((item, index)=>{
                        return(
                            <li key={index}>
                                <a href={item.href}>{item.link}</a>
                            </li>
                        )
                    })
                }
             <button className='h-12 w-28 bg-orange-300 text-white'>
                Donate Now
             </button>
             </ul>
            </div>
        </div>
    );
}

const socialLinks = [
    {
        linkimg: <FaFacebookF />,
        href: 'https://www.facebook.com',
    },
    {
        linkimg: <FaLinkedinIn />,
        href: 'https://www.linkedin.com',
    },
    {
        linkimg: <FaTwitter />,
        href: 'https://www.twitter.com',
    },
    {
        linkimg: <FaInstagram />,
        href: 'https://www.instagram.com',
    }
];

const nav = [
    {
        link:'Home',
        href:'/home',
    },
    {
        link:'About',
        href:'/about',
    },
    {
        link:'Donate Funds',
        href:'/donate-funds',
    },
    {
        link:'Contact Us',
        href:'/contact',
    }
]
export default Header;
