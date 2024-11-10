import React, { useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { Card,CardBody,CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Input } from "@nextui-org/input"
import { SearchIcon, StarIcon, HeartIcon, MapPinIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ImprovedFrontPageBody() {
  const featuredListings = [
    { id: 1, title: "Luxurious Beachfront Villa", location: "Bali, Indonesia", price: 250, rating: 4.9, image: "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww" },
    { id: 2, title: "Cozy Mountain Chalet", location: "Swiss Alps", price: 180, rating: 4.8, image: "https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww" },
    { id: 3, title: "Modern City Loft", location: "New York City, USA", price: 200, rating: 4.7, image: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww" },
    { id: 4, title: "Rustic Countryside Cottage", location: "Cotswolds, UK", price: 150, rating: 4.9, image: "https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww" },
  ]

  useEffect(()=>{
    document.title = "Home | RoamStay",
    document.fav
  },[])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://media.istockphoto.com/id/1691914584/photo/modern-bedroom-interior-with-dressing-table-bed-with-bedhead-and-side-table-with-photo-frame.webp?a=1&b=1&s=612x612&w=0&k=20&c=fur3jSH12gfa_yfvZg52BQyNaqrKl2uW3l7RLoMEOzQ="
            alt="Beautiful landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect <span className="text-blue-400">Stay</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Explore unique accommodations around the world with roamStay
          </p>
          <div className="max-w-md mx-auto">
            <Input
              size="lg"
              placeholder="Where do you want to go?"
              startContent={<MapPinIcon className="text-gray-400" />}
              endContent={
                <Button color="primary" isIconOnly aria-label="Search">
                  <SearchIcon className="w-5 h-5" />
                </Button>
              }
              className="bg-white text-black"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Stays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardBody className="p-0">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    aria-label="Like"
                    className="absolute top-2 right-2 z-10 bg-white bg-opacity-50 hover:bg-opacity-100"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </Button>
                </CardBody>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex justify-between items-center w-full mb-2">
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{listing.location}</p>
                  <p className="text-primary font-bold">${listing.price} / night</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose roamStay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Unique Stays", description: "Discover one-of-a-kind accommodations that make your trip unforgettable.", icon: "🏠" },
              { title: "Verified Hosts", description: "Book with confidence knowing our hosts are carefully vetted for quality and safety.", icon: "✅" },
              { title: "24/7 Support", description: "Our dedicated team is always here to help, ensuring a smooth and enjoyable experience.", icon: "🛎️" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy travelers and find your perfect stay today.
          </p>
          <Button color="primary" as={Link} to='/listings' size="lg" className="font-semibold text-lg px-8">
            Explore All Stays
          </Button>
        </div>
      </section>
    </main>
  )
}