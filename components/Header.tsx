'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import Image from "next/image";

import Container from './Container';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <Container className="!px-0">
                <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
                    {/* Logo with Knight Icon */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
              src="/ACA_Logo.png"
              alt="Ashutosh Chess Academy Logo"
              width="164"
              height="60"
              quality={100}
              className="rounded-xl lg:ml-0"
            />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6">
                        {menuItems.map(item => (
                            <li key={item.text} className="relative">
                                <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors flex items-center gap-1">
                                    {item.text}
                                    {item.text.toLowerCase() === 'tournaments' && (
                                        <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full ml-1">
                                            NEW
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}

                        <li>
                            <Link href="/#pricing" className="text-white bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors">
                                Join Now
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu Drawer */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div 
                    id="mobile-menu" 
                    className="md:hidden fixed inset-0 bg-white z-40 overflow-y-auto"
                >
                    {/* Header with Knight Icon and Close Button */}
                    <div className="sticky top-0 bg-white z-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <Image
              src="/ACA_Logo.png"
              alt="Ashutosh Chess Academy Logo"
              width="164"
              height="60"
              quality={100}
              className="rounded-xl lg:ml-0"
            />
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                            aria-label="Close menu"
                        >
                            <HiOutlineXMark className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="px-6 py-6">
                        <ul className="flex flex-col space-y-5">
                            {menuItems.map((item, index) => (
                                <li key={item.text}>
                                    <Link
                                        href={item.url}
                                        onClick={toggleMenu}
                                        className="text-xl text-foreground hover:text-primary flex items-center gap-4 py-3"
                                    >
                                        <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 font-medium">
                                            {index + 1}
                                        </span>
                                        <span className="flex-grow">{item.text}</span>
                                        {item.text.toLowerCase() === 'tournaments' && (
                                            <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-full">
                                                NEW
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Join Now Button */}
                        <div className="mt-10">
                            <Link 
                                href="/#pricing" 
                                className="block w-full text-center text-lg text-black bg-primary hover:bg-primary-accent px-8 py-4 rounded-full transition-colors font-medium"
                                onClick={toggleMenu}
                            >
                                Join Now
                            </Link>
                        </div>
                    </div>
                </div>
            </Transition>
        </header>
    );
};

export default Header;


