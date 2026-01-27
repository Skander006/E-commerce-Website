

export default function PrixMax({ prixMax, setPrixMax }) {
    return (
        <input
            type="number"
            className="filter"
            placeholder="Maximum Price"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)} />
    )
}