
import { useState, useEffect } from "react";

function Packages() {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search feature
    const [search, setSearch] = useState("");

    // Category filter
    const [category, setCategory] = useState("All");

    // Price sorting
    const [sort, setSort] = useState("default");

    useEffect(() => {
        fetch("https://explore-malaysia-9x3t.onrender.com/packages")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load packages");
                }
                return response.json();
            })
            .then(data => {
                setPackages(data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error:", error);
                setLoading(false);
            });
    }, []);

    // Search and filter packages
    let filteredPackages = packages.filter(item => {

        const matchSearch = item.destination
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "All" || item.category === category;

        return matchSearch && matchCategory;
    });

    // Sort packages by price
    if (sort === "low") {
        filteredPackages.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filteredPackages.sort((a, b) => b.price - a.price);
    }

    if (loading) {
        return <h2>Loading packages...</h2>;
    }

    return (
        <section className="packages" id="packages">

            <div className="section-heading">
                <p>EXPLORE WITH US</p>
                <h2>Our Travel Packages</h2>
                <span>
                    Discover amazing destinations across Malaysia.
                </span>
            </div>

            {/* Search and Filter Section */}

            <div className="package-controls">

                <input
                    type="text"
                    placeholder="Search destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Beach">Beach</option>
                    <option value="Culture">Culture</option>
                    <option value="Nature">Nature</option>
                    <option value="City">City</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Heritage">Heritage</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="default">Sort by Price</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>

            </div>

            {/* Travel Package Cards */}

            <div className="package-container">

                {filteredPackages.length > 0 ? (

                    filteredPackages.map(item => (

                        <div className="package-card" key={item.id}>

                            <img
                                src={item.image}
                                alt={item.destination}
                            />

                            <div className="package-info">

                                <span className="category">
                                    {item.category}
                                </span>

                                <h3>{item.destination}</h3>

                                <p>Duration: {item.duration}</p>

                                <h4>
                                    RM {item.price}
                                    <small> / person</small>
                                </h4>

                            </div>

                        </div>

                    ))

                ) : (

                    <p className="no-results">
                        No travel packages found.
                    </p>

                )}

            </div>

        </section>
    );
}

export default Packages;
