import React, { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    const opt1 = document.getElementById('opt-1')!;
    const opt2 = document.getElementById('opt-2')!;
    const opt3 = document.getElementById('opt-3')!;
    const contentHeading = document.getElementById('content-heading')!;
    
    opt1.addEventListener('click', () => {
      contentHeading.textContent = "2023 Performance TEST";
    });
    
    opt2.addEventListener('click', () => {
      contentHeading.textContent = "Development Revenue & Costs TEST";
    });
    
    opt3.addEventListener('click', () => {
      contentHeading.textContent = "2023 Plan TEST";
    });
  }, []); 

  return (
    <div className="flex h-screen not-italic ">
      <div className="w-1/5 bg-green-100 border-r border-gray-300">
        <div className="p-8">
          <span className="font-medium">HOME</span>
        </div>
      </div>
      <div className="page-content flex-1 p-4 mr-4 ml-4">
          <div className="text-2xl font-bold flex-1 p-8 py-4 text-3xl">Home</div>
          <div className="content-categories flex">
            <div className="label-wrapper"></div>
            <div className="flex-1 p-8 py-2">
             <div className="flex items-center justify-between py-4">
          <div className="flex">
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-1"
                className="sr-only"
              />
              <label
                htmlFor="opt-1"
                className="border text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 rounded-l-md cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-[#F5FFFA]"
              >
                2023 Performance
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-2"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="opt-2"
                className="border text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-[#F5FFFA]"
              >
                Development Revenue &amp; Costs
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                name="nav"
                id="opt-3"
                className="sr-only"
              />
              <label
                htmlFor="opt-3"
                className="border text-sm font-semibold text-[#43A57C] border-gray-400 py-2 px-4 rounded-r cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-100 focus:bg-[#F5FFFA]"
              >
                2023 Plan
              </label>
            </div>
          </div>
          <div className="flex items-center mr-5">
            <label htmlFor="years" className="mr-4 font-medium">
              Year:
            </label>
            <select
              name="years"
              id="years"
              className="border border-gray-400 py-2 px-4 rounded-md font-medium"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        <div className="inline justify-center w-1/5">
          <h1 className="text-2xl font-bold mt-6" id="content-heading"></h1>
        </div>
        </div>
        </div>
        </div>
        </div>
        );
    
};

export default Home;