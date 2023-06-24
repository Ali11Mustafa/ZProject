import SignIn from "views/auth/SignIn";

export default function Auth() {
  
  const userCredentials = {
    email:'admin@admin.com',
    password:'admin',
  }

 
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex items-center">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className=" my-auto lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <SignIn userCredentials={userCredentials}/>
              </div>
            </div> 
          </div> 
        </main>
      </div>
    </div>
  );
}
