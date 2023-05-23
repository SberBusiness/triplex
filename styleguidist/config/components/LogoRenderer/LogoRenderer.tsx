import * as React from 'react';
import {version} from '../../../../package.json';
import './styles.less';

const LogoRenderer: React.FC = ({children}) => (
    <div>
        <svg width="36" height="36" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7027 54.9999C12.7027 54.2902 12.7209 53.5877 12.7573 52.8853L0.0691558 52.2519C0.025479 53.1619 0 54.0791 0 54.9999C0 70.1885 6.15479 83.9394 16.1095 93.8905L25.1069 84.8931C17.4452 77.2351 12.7027 66.6616 12.7027 54.9999Z" fill="url(#paint0_linear)"/>
            <path d="M54.9965 12.7063C55.7063 12.7063 56.4087 12.7318 57.1112 12.7645L57.7445 0.0691558C56.8346 0.025479 55.9174 0 54.9965 0C39.8079 0 26.057 6.15478 16.106 16.1094L25.1034 25.1069C32.7614 17.4489 43.3384 12.7063 54.9965 12.7063Z" fill="url(#paint1_linear)"/>
            <path d="M54.9966 97.2973C54.2868 97.2973 53.5843 97.2791 52.8819 97.2427L52.2485 109.931C53.1585 109.975 54.0757 110 54.9966 110C70.1852 110 83.9361 103.845 93.8871 93.8905L84.8897 84.8931C77.2317 92.5511 66.6583 97.2973 54.9966 97.2973Z" fill="url(#paint2_linear)"/>
            <path d="M78.84 20.0877L89.5371 12.204C80.0957 4.57514 68.0809 0 54.9961 0V12.7063C63.837 12.7063 72.0482 15.4325 78.84 20.0877Z" fill="url(#paint3_linear)"/>
            <path d="M109.996 55C109.996 51.6369 109.694 48.3429 109.115 45.1472L97.2753 53.8717C97.2862 54.2466 97.2898 54.6215 97.2898 55C97.2898 67.4188 91.9103 78.6037 83.3569 86.349L91.8921 95.7832C103.011 85.723 109.996 71.1786 109.996 55Z" fill="#21A038"/>
            <path d="M54.9966 97.2973C42.5778 97.2973 31.3929 91.9178 23.6476 83.3644L14.2134 91.8996C24.2772 103.015 38.8216 110 54.9966 110V97.2973Z" fill="url(#paint4_linear)"/>
            <path d="M26.6356 23.6509L18.1004 14.2167C6.98465 24.2806 0 38.825 0 54.9999H12.7063C12.7027 42.5812 18.0822 31.3963 26.6356 23.6509Z" fill="url(#paint5_linear)"/>
            <path d="M98.5202 21.3761C101.119 24.732 103.339 28.3972 105.112 32.3099L54.9963 69.2423L34.0605 56.1174V40.3282L54.9963 53.4531L98.5202 21.3761Z" fill="#21A038"/>
            <defs>
                <linearGradient id="paint0_linear" x1="18.6774" y1="92.302" x2="4.79462" y2="52.1726" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1444" stopColor="#F2E913"/>
                    <stop offset="0.3037" stopColor="#E7E518"/>
                    <stop offset="0.5823" stopColor="#CADB26"/>
                    <stop offset="0.891" stopColor="#A3CD39"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="19.7355" y1="18.3597" x2="55.4917" y2="4.73371" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0592" stopColor="#0FA8E0"/>
                    <stop offset="0.5385" stopColor="#0099F9"/>
                    <stop offset="0.9234" stopColor="#0291EB"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="51.4115" y1="102.336" x2="91.8457" y2="93.1975" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1226" stopColor="#A3CD39"/>
                    <stop offset="0.2846" stopColor="#86C339"/>
                    <stop offset="0.8693" stopColor="#21A038"/>
                </linearGradient>
                <linearGradient id="paint3_linear" x1="52.3381" y1="4.25951" x2="86.9085" y2="14.926" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0566" stopColor="#0291EB"/>
                    <stop offset="0.79" stopColor="#0C8ACB"/>
                </linearGradient>
                <linearGradient id="paint4_linear" x1="17.3995" y1="90.3553" x2="55.0296" y2="104.415" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1324" stopColor="#F2E913"/>
                    <stop offset="0.2977" stopColor="#EBE716"/>
                    <stop offset="0.5306" stopColor="#D9E01F"/>
                    <stop offset="0.8023" stopColor="#BBD62D"/>
                    <stop offset="0.9829" stopColor="#A3CD39"/>
                </linearGradient>
                <linearGradient id="paint5_linear" x1="4.72954" y1="56.5412" x2="19.8345" y2="17.2475" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0698" stopColor="#A3CD39"/>
                    <stop offset="0.2599" stopColor="#81C55F"/>
                    <stop offset="0.9216" stopColor="#0FA8E0"/>
                </linearGradient>
            </defs>
        </svg>
        <div className="logo-title">{children}</div>
        {version}
    </div>
);

export default LogoRenderer;
