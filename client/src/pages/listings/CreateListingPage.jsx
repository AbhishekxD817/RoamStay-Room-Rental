import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Textarea } from "@nextui-org/input"
import { Card, CardHeader, CardFooter, CardBody } from "@nextui-org/card"
import { useForm } from "react-hook-form";
import { createListing } from "../../api/listingApi.js";
import { useNavigate } from "react-router-dom";

const CreateListingPage = () => {
    const navigate = useNavigate();
    const { handleSubmit, reset, register } = useForm();

    const handleForm = async (data) => {
        
        const formData = new FormData();
        
        for (const [key, value] of Object.entries(data)) {
            if (key === 'image' && value[0]) {
                formData.append('image', value[0]);
            } else {
                formData.append(key, value);
            }
        }
        
        console.log(formData);

        try {
            const response = await createListing(formData);
            if (response.status != 200) {
                console.log("Error")
            }
            console.log(response.data.message);
            return navigate('/listings');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Card className="max-w-2xl mx-auto px-4 border py-5 m-3">
                <CardHeader className="flex flex-col mb-6">
                    <h1 className="font-semibold text-2xl mb-2 underline underline-offset-8">Create Listing</h1>
                    <p className="font-thin">Create New Listings. Click 'Create' button when you're done.</p>
                </CardHeader>
                <form onSubmit={handleSubmit(handleForm)}>
                    <CardBody className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title">Title</label>
                            <Input
                                id="title"
                                name="title"
                                {...register('title')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Description</label>
                            <Textarea
                                id="description"
                                name="description"
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
                                required
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
                                {...register('price')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location">Location</label>
                            <Input
                                id="location"
                                name="location"
                                {...register('location')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="country">Country</label>
                            <Input
                                id="country"
                                name="country"
                                {...register('country')}
                                required
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="my-6">
                        <Button type="submit" className="w-full" color="primary">Create Listing</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}

export default CreateListingPage;