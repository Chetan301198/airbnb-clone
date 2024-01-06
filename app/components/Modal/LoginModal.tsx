"use client";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/loginHook";
import useRegisterModal from "@/app/hooks/registerHook";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from ".";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account" center />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      {/* <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center flex-row gap-2 items-center">
          <div>Don&#39;t have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 font-normal cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      show={loginModal.show}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
