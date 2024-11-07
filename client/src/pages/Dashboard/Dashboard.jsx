'use client'

import { useEffect, useState } from 'react'
import { Button } from "@nextui-org/button"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { PlusCircle, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import api from '../../api/api';
import { deleteListing, getAllListings } from '../../api/listingApi';



const Dashboard = () => {


    const [listings, setListings] = useState([])
    
    useEffect(()=>{
        (async function(){
            await getListings();
        })()
    },[])

    async function getListings(){
            try {
                const response = await getAllListings();
                if(response && response.status == 200){
                    setListings(response.data.listings);
                    return;
                }
            } catch (error) {
                console.log("Error => ",error);
                console.log(error)
                return;
            }
    }

    const handleDeleteListingBtn = async (id) => {
        try {
            const response = await deleteListing(id);
            if(response.status == 200){
                await getListings();
                return;
            }
        } catch (error) {
            console.log("Error => ",error);
        }
    }

    return (
        <div className="container mx-auto p-3">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold underline underline-offset-[6px]">Listings Data</h2>
                <Button as={Link} to='/listings/create'>
                    <PlusCircle className="mr-2 h-4 w-4" />Create Listing
                </Button>
            </div>
            <div className='mb-4'>
                <p>Listings Created : {listings.length}</p>
            </div>
            <div className="rounded-md border">
                <Table
                    isHeaderSticky
                    aria-label="Example table with infinite pagination"
                    classNames={{
                        base: "max-h-[250px] overflow-scroll",
                        table: "min-h-[100px]",
                    }}
                    className='border border-stone-300 rounded-xl bg-slate-200'>
                    <TableHeader>
                        <TableColumn className='bg-white'>idx</TableColumn>
                        <TableColumn className='text-left bg-white'>Title</TableColumn>
                        <TableColumn className='bg-white'>Price</TableColumn>
                        <TableColumn className="text-right bg-white">Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {listings.map((listing, idx) => (
                            <TableRow key={listing._id} className='text-center border border-stone-300 bg-white'>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell className="font-medium text-left">{listing.title}</TableCell>
                                <TableCell>${listing.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right flex justify-end gap-1">
                                    <Button isIconOnly as={Link} to={`/listings/${listing._id}/edit`} className='bg-blue-500 text-white text-lg'>
                                        <MdEdit />
                                    </Button>

                                    <Button isIconOnly onClick={(e)=>{handleDeleteListingBtn(listing._id)}} className='bg-red-500 text-white text-lg'>
                                        <MdDelete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default Dashboard;