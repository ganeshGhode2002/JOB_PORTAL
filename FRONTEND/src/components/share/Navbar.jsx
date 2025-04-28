import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(false)

  return (
    <header className="bg-white ">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          job<span className="text-red-500">portal</span>
        </div>

        {/* Navigation Links + User Section */}
        <div className="flex items-center gap-8">
          {/* Nav Links */}
          <ul className="flex gap-6 font-medium text-gray-700">
            <li className="hover:text-red-500 cursor-pointer">Home</li>
            <li className="hover:text-red-500 cursor-pointer">Jobs</li>
            <li className="hover:text-red-500 cursor-pointer">Browse</li>
          </ul>

          {/* Auth / User Info */}
          {!user ? (
            <div className="flex gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button >Signup</Button></Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>GG</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 space-y-4">
                {/* Profile Summary */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>GG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-lg">Ganesh Ghode</p>
                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <UserCircle className="h-5 w-5" />
                    View Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
