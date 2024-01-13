"use client";
import useLoginModal from "@/app/hooks/loginHook";
import useRegisterModal from "@/app/hooks/registerHook";
import useRentModal from "@/app/hooks/rentHook";
import Image from "next/image";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserMenu: React.FC = () => {
  const { data } = useSession();

  // console.log(data);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const MenuItem = ({
    onClick,
    label,
    customClass,
  }: {
    onClick: () => void;
    label: string;
    customClass?: string;
  }) => {
    return (
      <div
        onClick={onClick}
        className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${customClass}`}
      >
        {label}
      </div>
    );
  };

  const onRent = useCallback(() => {
    if (!data?.user) {
      return loginModal.onOpen();
    }

    return rentModal.onOpen();
  }, [loginModal, data?.user, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden lg:block rounded-full text-sm font-semibold py-3 px-4 cursor-pointer hover:bg-neutral-100 transition"
        >
          Add your place
        </div>
        <div
          onClick={toggle}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Image
              src={
                data?.user?.image
                  ? data?.user?.image
                  : "/images/placeholder.jpg"
              }
              alt="Avatar"
              height={30}
              width={30}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[20vw] lg:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm">
          <div className="flex flex-col cursor-pointer">
            {data?.user ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/trips");
                  }}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/favorites");
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/reservations");
                  }}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/properties");
                  }}
                />
                <MenuItem
                  customClass="block lg:hidden"
                  label="Add my place"
                  onClick={() => {
                    setIsOpen(false);
                    rentModal.onOpen();
                  }}
                />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    setIsOpen(false);
                    loginModal.onOpen();
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    setIsOpen(false);
                    registerModal.onOpen();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
