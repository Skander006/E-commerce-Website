

export default function CategoryCard({ category }){
    const {title, image} = category;
    return (
        <div className="cat-card">
            <img src={image} alt={title} />
            <p>{title}</p>
        </div>
    )
}