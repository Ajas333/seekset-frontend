import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <div>
        <footer class="bg-blue-200 py-8 mt-2">
            <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-800">
                <div>
                    <h4 class="font-bold">For Jobseekers</h4>
                    <ul>
                        <li><a href="#" class="hover:underline">Search Jobs</a></li>
                        <li><a href="#" class="hover:underline">Register</a></li>
                        <li><a href="#" class="hover:underline">Job Alerts</a></li>
                        <li><a href="#" class="hover:underline">Career Advice</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold">Popular</h4>
                    <ul>
                        <li><a href="#" class="hover:underline">Search Jobs</a></li>
                        <li><a href="#" class="hover:underline">Employers</a></li>
                        <li><a href="#" class="hover:underline">Agencies</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold">Recruiters</h4>
                    <ul>
                        <li><a href="#" class="hover:underline">CV Database Access</a></li>
                        <li><a href="#" class="hover:underline">Advertise Jobs</a></li>
                        <li><a href="#" class="hover:underline">Search CVs</a></li>
                        <li><a href="#" class="hover:underline">Test CV Search</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold">About the creation</h4>
                    <ul>
                        <li><a href="#" class="hover:underline">About Us</a></li>
                        <li><a href="#" class="hover:underline">Contact Us</a></li>
                        <li><a href="#" class="hover:underline">Help</a></li>
                        <li><a href="#" class="hover:underline">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between items-center mt-8">
                <div class="flex items-center mb-4 md:mb-0">
                    <img src={logo} class="w-12 h-10" alt="Logo"/>
                    <p className='mt-2 text-xl font-bold font-sans text-indigo-900'>
                        SeekSet
                    </p>
                </div>
                <p>&copy; 2022 | All Rights Reserved.</p>
                <p>Created by Ajas K M</p>
            </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer
