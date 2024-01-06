"use client";
import useRentModal from "@/app/hooks/rentHook";
import Modal from ".";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelector from "../Input/CountrySelector";
import Counter from "../Input/Counter";
import ImageUpload from "../Input/ImageUpload";
import dynamic from "next/dynamic";
import Input from "../Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const { user, setListings } = useGlobalContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onNext = () => setStep((prev) => prev + 1);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post("/api/listing", { ...data, userId: user?._id, user: user?._id })
      .then(() => {
        toast.success("Listing Created!");
        axios.get("/api/listing").then((res: any) => setListings(res.data));
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => toast.error("Somthing went wrong"))
      .finally(() => setIsLoading(false));
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              name={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place location?"
          subtitle="Help guests to find you!"
        />
        <CountrySelector
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place look like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      show={rentModal.show}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      title="Rent your home"
      secondaryLabel={secActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RentModal;
