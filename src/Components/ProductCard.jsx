import Heart from "./Heart.jsx";


export default function ProductCard({ product }){
    const { title, price, category, image, rating} = product;
    return (
        <div className="product-card relative">
            <div className="image-container">
                <img src={image? image : './no-image.jpg'} alt={title} />
            </div>
            <div className="absolute z-10 px-3 py-2.5 rounded-full cursor-pointer bg-gray-300 top-6 left-8 opacity-85 hover:opacity-100 transition-all duration-400">
                <Heart product={product} />
            </div>

            <h3 className="text-left text-lg font-bold">{title}</h3>
            <div className="content-product">
                <p className="capitalize">{category? category : 'N/D'}</p>
                <span>•</span>
                <p className="font-bold text-gray-700">{price? price.toFixed(2)+"$" : "N/D"}</p>
                <span>•</span>
                <div className="rating">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <p>{rating?.rate ? rating.rate.toFixed(1) : "N/D"}</p>
                </div>

            </div>
        </div>
    )
}