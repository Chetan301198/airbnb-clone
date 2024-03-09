const SkeletonLoading = () => {
  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      <div className="animate-pulse col-span-1 cursor-pointer group border-[1px] border-neutral-300 rounded-xl p-1.5 bg-[#fefefe] shadow-sm">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-lg">
            <div className="h-80 w-100 bg-neutral-300"></div>
          </div>
          <div className="bg-neutral-300 h-6 rounded-lg"></div>
          <div className="bg-neutral-300 h-6 rounded-lg"></div>
          <div className="bg-neutral-300 h-6 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
