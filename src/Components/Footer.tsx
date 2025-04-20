import { Facebook, Twitter, Instagram, GitlabIcon as GitHub, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company Name</h3>
                        <p className="text-gray-600 mb-4">
                            Creating amazing experiences since 2023. We're dedicated to excellence in everything we do.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <p className="text-gray-600 mb-2">123 Street Name, City</p>
                        <p className="text-gray-600 mb-2">contact@example.com</p>
                        <p className="text-gray-600 mb-4">(123) 456-7890</p>

                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <GitHub size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Company Name. All rights reserved.</p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
