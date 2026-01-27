
export default function Rating({ rating, setRating}) {
    return(
        <input
            type="number"
            className="filter"
            placeholder="Minimum rating..."
            value={rating}
            onChange={(e)=> setRating(e.target.value)} />
    )
}