

export default function About(){
    return(
        <>
            <h1 className="text-4xl uppercase font-bold text-gray-900 my-8 p-12 border-b-1 border-gray-400">About Us 🌟</h1>
            <div className="text-gray-800 text-lg flex flex-col justify-center items-center gap-8 mt-16">
                <h1 className="text-2xl font-bold">Welcome to <span className="font-extrabold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">NovaCart</span>!</h1>
                <p className="max-w-screen-md">
                    At <span className="font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">NovaCart</span>, we believe shopping should be simple, enjoyable, and inspiring. We are dedicated to bringing you a curated selection of high-quality products that combine style, functionality, and value.
                </p>
                <p className="max-w-screen-md">
                    Our mission is to make online shopping a seamless experience, offering everything from fashion and electronics to unique accessories that suit your lifestyle. Every item in our store is carefully chosen to ensure you receive products that look great, perform well, and make your life easier.
                </p>
                <p className="max-w-screen-md">
                    We pride ourselves on exceptional customer service, fast shipping, and a shopping experience tailored to your needs. Whether you’re browsing for yourself or looking for the perfect gift, we are here to make every purchase special.
                </p>
                <p className="max-w-screen-md">
                    Thank you for choosing <span className="font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">NovaCart</span> — we’re excited to be part of your shopping journey!
                </p>
            </div>
        </>

    )
}