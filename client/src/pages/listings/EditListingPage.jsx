import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { showListing, updateListing } from "../../api/listingApi.js";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Textarea } from "@nextui-org/input"
import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/card"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



const EditListingPage = () => {

    const { id } = useParams();
    const [error, setError] = useState(null);
    const [listing, setListing] = useState();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const handleForm = async (data) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            if (key === 'image' && value[0]) {
                formData.append('image', value[0]);
            } else {
                formData.append(key, value);
            }
        }

        try {
            const response = await updateListing(listing._id, formData);
            if (response.status != 200) {
                const { message = "Error"} = error;
                toast.error(message);
                return;            }
            console.log(response.data);
            return navigate(`/listings/${listing._id}`);
        } catch (error) {
            const { message = "Error"} = error;
            toast.error(message);
            return;        }
    }

    useEffect(() => {
        document.title = listing ? `Edit - ${listing.title} | RoamStay` : "Edit Listing";
    }, [listing])

    useEffect(() => {
        (async function () {
            const response = await showListing(id);
            if (response.status != 200) {
                console.log(response);
                setError(response);
                return;
            }
            setListing(response.data.listing);
        })()
    }, [])


    return (
        <>
            {listing && <Card className="w-full max-w-2xl mx-auto px-4 border py-5">
                <CardHeader className="flex flex-col mb-6">
                    <h1 className="font-semibold text-2xl mb-2 underline underline-offset-8">Edit Listing</h1>
                    <p className="font-thin">Make changes to your listing here. Click save when you're done.</p>
                </CardHeader>
                <form onSubmit={handleSubmit(handleForm)}>
                    <CardBody className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title">Title</label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={listing.title}
                                {...register('title')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Description</label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={listing.description}
                                {...register('description')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="image">Image file</label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                {...register('image')}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="price">Price per night</label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={listing.price}
                                {...register('price')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location">Location</label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={listing.location}
                                {...register('location')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="country">Country</label>
                            <Input
                                id="country"
                                name="country"
                                defaultValue={listing.country}
                                {...register('country')}
                                required
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="my-6">
                        <Button type="submit" className="w-full" color="primary">Save Changes</Button>
                    </CardFooter>
                </form>
            </Card>
            }
        </>
    )
}

export default EditListingPage;