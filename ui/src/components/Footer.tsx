const Footer = () => {
  return (
    <div className="bg-[#d6bfdd] py-10">
      <div className="container mx-auto flex justify-between flex-col md:flex-row items-center gap-y-2">
        <span className="text-3xl text-[#60269e] font-bold tracking-tight">
          PulseChat
        </span>
        <span className="text-[#60269e] font-bold tracking-tight flex flex-col md:flex-row gap-x-4 gap-y-1 ">
          <p className="cursor-pointer text-center">Privacy Policy</p>
          <p className="cursor-pointer text-center">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
