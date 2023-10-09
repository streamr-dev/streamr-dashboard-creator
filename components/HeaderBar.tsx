//height 32px (py4) + 44px = 76px
export const HeaderBar = () => {
  return (
    <div className="w-full lg:pl-[332px] py-4 fixed bg-primary text-secondary">
      <div className="h-[44px] box-content flex items-center">
        <h3 className=" font-semibold">All Charts</h3>
      </div>
    </div>
  );
};
