import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 py-12 mt-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About RoamStay</h3>
                        <p className="text-sm">
                            RoamStay is your gateway to unique accommodations worldwide. Discover, book, and experience unforgettable stays.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:text-primary">Home</Link></li>
                            <li><Link href="/listings" className="text-sm hover:text-primary">Listings</Link></li>
                            <li><Link href="/about" className="text-sm hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-sm hover:text-primary">FAQ</Link></li>
                            <li><Link href="/terms" className="text-sm hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/help" className="text-sm hover:text-primary">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="max-w-[200px]"
                            />
                            <Button color="primary" size="sm">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Link href="#" className="text-gray-400 hover:text-primary">
                        <FaFacebookF size={20} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-primary">
                        <FaTwitter size={20} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-secondary">
                        <FaInstagram size={20} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-primary">
                        <FaLinkedinIn size={20} />
                    </Link>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} <span className="font-semibold">RoamStay</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;