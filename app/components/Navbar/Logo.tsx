import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/images/logo.png"}
        priority
        alt="Logo"
        height={100}
        width={100}
      />
    </Link>
  );
};

export default Logo;
