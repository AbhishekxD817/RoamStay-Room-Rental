

import React from 'react'
import { FaHotel } from "react-icons/fa6";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar"
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/button';
import { Menu, X } from 'lucide-react';
import "./Header.css"
import { VscLinkExternal } from 'react-icons/vsc';
import { TbExternalLink } from "react-icons/tb";
import { RxDashboard } from 'react-icons/rx';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../api/authApi';
import { clearUser } from '../../store/slice/authSlice';
import { toast } from 'react-toastify';


export default function Header() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogoutBtn = async () => {
    try {
      let response = await logout();
      if (response && response.status == 200) {
        dispatch(clearUser());
        toast.error("Logout Success")
        return;
      }
      return;
    } catch (error) {
      const { message = "Error" } = error;
      toast.error(message);
      return;
    }
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="py-2 border-b-2"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          srOnlyText='|'
          icon={isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <FaHotel className="mr-2" />
          <p className="font-bold text-inherit rancho-regular text-xl">RoamStay</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarBrand>
          <FaHotel className="mr-2" />
          <p className="font-bold text-inherit rancho-regular text-xl">RoamStay</p>
        </NavbarBrand>
        <NavbarItem className='ml-5'>
          <Link color="foreground" to="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem className=''>
          <Link color="foreground" to="/listings">
            Listings
          </Link>
        </NavbarItem>
        {
          auth.isAuthenticated == true &&
          <NavbarItem className=''>
            <Link color="foreground" to="/dashboard" className='flex justify-center items-center'>
              {/* <RiDashboardHorizontalFill /> */}
              Dashboard
            </Link>
          </NavbarItem>
        }

      </NavbarContent>

      {auth.isAuthenticated == false ?
        <>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link to="/auth">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to="/auth" variant="flat">
                Register
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
        :
        <NavbarContent>
          <NavbarItem>
            <Button color="danger" variant="flat" onClick={handleLogoutBtn}>
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      }



      {/* phone */}
      <NavbarMenu className='z-10 absolute top-14 left-0 bg-background'>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            to="/"
            size="lg"
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            to="/listings"
            size="lg"
          >
            Listings
          </Link>
        </NavbarMenuItem>
        {
          auth.isAuthenticated == false ?
            <>
              <NavbarMenuItem>
                <Link
                  className="w-full"
                  color="foreground"
                  to="/auth"
                  size="lg"
                >
                  Login
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className="w-full"
                  color="primary"
                  to="/auth"
                  size="lg"
                >
                  Register
                </Link>
              </NavbarMenuItem>
            </>
            :
            <>

              <NavbarMenuItem>
                <Link
                  className="w-full"
                  color="primary"
                  to="/dashboard"
                  size="lg"
                >
                  Dashboard
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  className="w-full m-0"
                  color="danger"
                  variant="flat"
                  onClick={handleLogoutBtn}
                  size="md"
                >
                  Logout
                </Button>
              </NavbarMenuItem>

            </>

        }
      </NavbarMenu>
    </Navbar>
  )
}