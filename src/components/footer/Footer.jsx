const Footer = () => {
  return (
    <div className="w-full ">
      <p className=" pt-10 text-center text-sm text-gray-600 sm:!mb-0 md:text-left md:text-base">
        ©{1900 + new Date().getYear()} Z Towers. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
