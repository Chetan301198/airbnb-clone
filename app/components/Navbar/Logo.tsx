// import Image from "next/image";
import Link from "next/link";
import { MdOutlineConnectingAirports } from "react-icons/md";

const Logo = () => {
  return (
    <Link href={"/"} className="text-primary">
      {/* <Image
        src={"/images/logo.png"}
        priority
        alt="Logo"
        height={100}
        width={100}
      /> */}
      <MdOutlineConnectingAirports size={50} />
    </Link>
  );
};

export default Logo;
