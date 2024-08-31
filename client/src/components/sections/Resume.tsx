"use client"
import React, { useEffect } from 'react'
import Page from '../layouts/Page'
import Horizontalline from '../elements/HorizontalLine'
import Button from '../ui/Button'
import moment from 'moment';
import Loader from '../ui/Loader'
import DataNotFound from '../elements/DataNotFound'
import { useGetStudentQuery } from '@/redux/api/apiSlice'

const termsAndConditions = [
    "If a candidate is interested in applying for any job, they must submit their resume along with an ID Proof, Passport Size Photo, and a consultancy fee of Rs. 500/-.",
    "When attending an interview, candidates must mention our consultancy name so that the company is promptly informed.",
    "If a candidate is selected based on our recommendations or references, they must inform our consultancy for our records by directly notifying our team or any concerned person from Bemployed.",
    "If a candidate is selected through our consultancy, they will be a full-time employee of the respective organization. Bemployed will not be responsible for any legal disputes or any other matters between the candidate and the organization.",
    "If a candidate is hired by our client's company through our reference, it is the candidate's responsibility to submit one-third of their first month's salary to Bemployed.",
    "If a candidate is employed by a client's company through our reference, we cannot place that candidate in another company until their employment with the current company ends.",
    "Once a candidate is registered with Bemployed, they cannot request a refund of the registration fee. (मेरे द्वारा दी गई वर्किंग फीस 500 रूपये कभी वापिस नहीं मांगूंगा और जॉब लगने के बाद अपनी सैलरी का एक तिहाई हिस्सा ईमानदारी से दे दूंगा)"
];


function extractCountryCode(input: any) {
    let match = input.match(/\(\+\d+\)/);
    return match ? match[0].replace(/[()]/g, '') : '';
}



const Resume = ({ slug = 37 }: any) => {
    const { data, isLoading, error } = useGetStudentQuery({id:slug, populateQuery:"populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference"});
   
    if (data == undefined && !isLoading) {
        return <DataNotFound />
    }
    else if(data != undefined && !isLoading) return (
        <div className='  page-container  mx-auto px-6 py-6 '>
            <div className="page-footer  ">
                <span>Candidate Id: 99</span> <span className='h-[1px] bg-black w-[50%]'></span> <span className='font-bold'>Powered by Bemployed</span>
            </div>
            <table className='table'>
                <tbody>
                    <tr>
                        <td>
                            <div className="page">
                                <div className=' '>
                                    <div className='flex flex-col gap-1'>
                                        <h1 className=' text-2xl font-bold '>{data?.data?.attributes?.FirstName} {data?.data?.attributes?.LastName}</h1>
                                        <p className='text-sm '>{data?.data?.attributes?.Email}</p>
                                        <p className='text-sm '>{data?.data?.attributes?.Address?.Street}</p>

                                        {
                                            data?.data?.attributes?.Contacts?.slice(0, 2).map((phone: any) => (
                                                <p key={phone.Number} className='text-sm '> {extractCountryCode(phone.CountryCode)} {phone.Number}</p>
                                            ))
                                        }

                                    </div>

                                    <Horizontalline text="Career Objective" />

                                    <div>
                                        <p>
                                            To pursue a challeging career and be a part of a progresive organization that gives scope to enhance my knowledge, skills and reach the pinnacle in this field  with sheer determination, dedication and hard work.
                                        </p>
                                    </div>

                                    <Horizontalline text="Qualification" />
                                    <div className='flex flex-col gap-1'>
                                        {
                                            data?.data?.attributes?.qualification?.map((item: any) => (
                                                <div className='flex items-center gap-4' key={item.id}>

                                                    <li > {item.qualification?.data?.attributes?.Name}, {item.school?.data?.attributes?.Name} </li>
                                                    {item?.Score && <p >- ({item.Score}%) </p>}
                                                </div>
                                            ))
                                        }

                                    </div>
                                    {
                                        data?.data?.attributes?.experience?.length > 0 && <>
                                            <Horizontalline text="Experience" />
                                            <div>
                                                {data?.data?.attributes?.experience.map((item: any) => (
                                                    <li key={item.id}> {item.Duration === 12 ? "1 Year " : `${item?.Duration} Month`} experience of  {item?.Company?.data?.attributes?.Name}</li>
                                                ))}
                                            </div>
                                        </>
                                    }


                                    {
                                        data?.data?.attributes?.Skills?.data.length > 0 && (
                                            <>
                                                <Horizontalline text="Skills" />
                                                <div >
                                                    {
                                                        data?.data?.attributes?.Skills?.data.map((skill: any) => (
                                                            <li key={skill.id}>{skill?.attributes?.name}</li>
                                                        ))
                                                    }

                                                </div>
                                            </>
                                        )

                                    }

                                    <Horizontalline text='Parsonal Details' />
                                    <table className=' w-1/2 '>
                                        <tbody className='  ' >
                                            <tr className=''>
                                                <th className=" py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">FatherName:</th>
                                                <td className="  py-2 pl-4 pr-3 text-left text-sm  sm:pl-6">{data?.data?.attributes?.FatherName}</td>
                                            </tr>
                                            <tr className=' '>
                                                <th className=" py-2  pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date of Birth:</th>
                                                <td className="  py-2 pl-4 pr-3 text-left text-sm   sm:pl-6">
                                                    {data?.data?.attributes?.DOB}
                                                </td>
                                            </tr>
                                            <tr className=' '>
                                                <th className="  py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Gender:</th>
                                                <td className="  py-2 pl-4 pr-3 text-left text-sm  sm:pl-6">{data?.data?.attributes?.Gender}</td>
                                            </tr>
                                            <tr className=' '>
                                                <th className=" py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Marital Status:</th>
                                                <td className="  py-2 pl-4 pr-3 text-left text-sm   sm:pl-6">{data?.data?.attributes?.MaritalStatus}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className=' mt-4 flex flex-col gap-1'>
                                        <span>Date:</span>
                                        <span>Place:</span>
                                    </div>

                                </div>
                            </div>

                            <div className="page relative">
                                <div className='  min-h-full'>
                                    <h2 className='text-2xl font-bold text-center'> Terms & Conditions </h2>
                                    <ol className=' px-6 mt-12 list-decimal flex flex-col gap-6'>
                                        {termsAndConditions.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ol>
                                    <div className=' absolute bottom-20 right-12'>
                                        <span>Signature</span>
                                    </div>
                                </div>
                            </div>
                           <div className="page">
                                <div className=''>
                                    <div className=' overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <tbody className='divide-y  divide-gray-300'>
                                                <tr >
                                                    <th scope="col" className="  py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Id
                                                    </th>
                                                    <td className="  whitespace-nowrap px-3 py-4 text-sm text-gray-500 border-r ">#{data?.data?.id}</td>
                                                    <th scope="col" className="  py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Res. Date
                                                    </th>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{moment(data?.data?.attributes?.createdAt
                                                    ).format("MM/DD/YYYY")}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="col" className="  py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Payment
                                                    </th>
                                                    <td className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 border-r"></td>
                                                    <th scope="col" className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Reference
                                                    </th>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr>
                                                    <th scope="col" className=" py-12 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Industry
                                                    </th>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 border-r"></td>
                                                    <th scope="col" className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">

                                                    </th>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" >  </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className=" mt-10 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr className=" divide-x ">
                                                    <th scope="col" className=" w-1/2 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Company
                                                    </th>
                                                    <th scope="col" className=" w-1/5 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Post
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Date
                                                    </th>
                                                    <th scope="col" className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Status
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>
                                                <tr className=' divide-x'>
                                                    <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                    <td className="whitespace-nowrap px-3 py-8 text-sm text-gray-500"></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div> 
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td>
                            <div className="page-footer-space"></div>
                        </td>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}

export default Resume
