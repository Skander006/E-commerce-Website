

export default function Search({ searchTerm, setSearchTerm }){
    return (
        <input
            className="filter-search"
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            />
    )
}