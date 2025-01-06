


export default function page() {
  return (
    <div className='flex w-full h-100 justify-center items-center align-middle'>
        <div className='col-span-4  sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/3'>
                <h2 className='h2 py-2 font-bold'>Welcome to Task Manager Using Next JS</h2>
                <h4 className='h5 font-bold'>Lorem Ipsum</h4>
                <div className='py-2 mb-2'>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
                    </p>
                </div>
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Get Started</button>
        </div>
        <div className='col-span-10 px-2 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-1/2'>
                {/* <Image  src={"../../Assets/Images/homePageImage.jpg"} width={100} height={100} alt="Home page image" /> */}
                <img src={'https://img.freepik.com/premium-vector/businessman-stands-office-holding-folder-presenting-calendar-with-upcoming-events-businessman-presenting-with-calendar-message-icon-flat-illustration_585735-39675.jpg?w=996'} />
        </div>
    </div>
  )
}
