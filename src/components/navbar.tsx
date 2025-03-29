import React, { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}
function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target="_self"
        variant="small"
        className="font-medium"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const handleOpen = () => setOpen((cur) => !cur);
  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("session");
    document.cookie = `token=; path=; max-age=0`;
    router.replace("/");
  };
  const checkSession = () => {
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      const sessionData = JSON.parse(storedSession);
      const expiresIn = sessionData?.expiresIn;

      if (expiresIn && Date.now() > expiresIn) {
        handleLogout();
      } else {
        setSession(sessionData);
      }
    } else {
    }
  };

  // 5 dakikada bir session'ı kontrol et
  useEffect(() => {
    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          variant="h6"
          color={isScrolling ? "blue-gray" : "white"}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          MYXGENOME
        </Typography>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          <NavItem href="/">Ana Sayfa</NavItem>
          <NavItem>Hakkımızda</NavItem>
          <NavItem>İletişim</NavItem>
        </ul>
        <div className="hidden gap-2 lg:flex">
          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-brands fa-twitter text-base" />
          </IconButton>
          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-brands fa-facebook text-base" />
          </IconButton>
          <IconButton
            variant="text"
            color={isScrolling ? "gray" : "white"}
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-brands fa-instagram text-base" />
          </IconButton>
          <div className="space-x-3">
            {session ? (
              <>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => router.replace("/test")}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Test Yap
                </Button>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={handleLogout}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => router.replace("/login")}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Giriş Yap
                </Button>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => router.replace("/signup")}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Kayıt Ol
                </Button>
              </>
            )}
          </div>
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-blue-gray-900">
            <NavItem>Ana Sayfa</NavItem>
            <NavItem>Hakkımızda</NavItem>
            <NavItem>İletişim</NavItem>
          </ul>
          <div className="mt-4 flex gap-2">
            <IconButton
              variant="text"
              color="gray"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-brands fa-twitter text-base" />
            </IconButton>
            <IconButton
              variant="text"
              color="gray"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-brands fa-facebook text-base" />
            </IconButton>
            <IconButton
              variant="text"
              color="gray"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-brands fa-instagram text-base" />
            </IconButton>
          </div>
          <div className="space-x-3">
            {session ? (
              <>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => {
                    router.replace("/test");
                    setOpen(false);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Test Yap
                </Button>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => {
                    router.replace("/login");
                    setOpen(false);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Giriş Yap
                </Button>
                <Button
                  color={isScrolling ? "gray" : "white"}
                  size="sm"
                  onClick={() => {
                    router.replace("/signup");
                    setOpen(false);
                  }}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Kayıt Ol
                </Button>
              </>
            )}
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
