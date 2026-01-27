

export default function PrixMin({ prixMin, setPrixMin }) {
    return (
        <input
            type="number"
            className="filter"
            placeholder="Minimum Price"
            value={prixMin}
            onChange={(e) => setPrixMin(e.target.value)} />
    )
}