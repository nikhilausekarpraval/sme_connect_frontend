import { FaRegCircle } from "react-icons/fa6";
import AnnouncementsCard from "./Components/Announcements/Announcements";
import peopleImage from "./Assets/Images/peopleImage.svg"
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex h-100 justify-center items-center">
      <div className='flex w-full justify-center row items-center align-middle'>
        <div className='col flex flex-col items-center ps-5'>
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold">Welcome to Praval Connect</h1>
            <h2 className="text-xl font-semibold mt-2">Make connections seamlessly</h2>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <FaRegCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Accelerating change to achieve desired goals efficiently.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Leverages top talent and in-house expertise to drive success.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCircle className="w-4 h-4 text-green-500 mt-1" />
                <span>Focuses on building trust and delivering tangible results.</span>
              </li>
            </ul>
          </div>
          {/* k<button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Feedback</button> */}
          <AnnouncementsCard />
        </div>
        <div className='col flex flex-col items-center pe-5'>
          {/* <Image  src={"../../Assets/Images/homePageImage.jpg"} width={100} height={100} alt="Home page image" /> */}
          <Image src={peopleImage} alt={"people"} className="min-w-[300px]"/>
        </div>
      </div>
    </div>
  )
}
