

export default function Home() {

  return (
        <div >
          <div className='flex w-full justify-center items-center align-middle'>
            <div className='col-span-4  sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/3'>
              <h2 className='h2 font-bold'>Welcome to Praval Connect</h2>
              <h4 className='h5 font-bold'>Make connections seamlessly</h4>
              <div className='py-2 mb-2'>
                <p>
              Praval, is here to help organizations at any level, either to kick start the technology journey or to accelerate the change to achieve the desired goals. We come with a leverage of best talent and expertise in house that helps us build trust & deliver results to win our customers.
                </p>
              </div>
              <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Get Started</button>
            </div>
            <div className='col-span-10 px-2 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-1/2'>
              {/* <Image  src={"../../Assets/Images/homePageImage.jpg"} width={100} height={100} alt="Home page image" /> */}
              <img src={'https://img.freepik.com/premium-vector/businessman-stands-office-holding-folder-presenting-calendar-with-upcoming-events-businessman-presenting-with-calendar-message-icon-flat-illustration_585735-39675.jpg?w=996'} />
            </div>
          </div>
      </div>
  )
}
