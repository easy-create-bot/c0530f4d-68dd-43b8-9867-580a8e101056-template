import { useState, useEffect, useCallback } from "react"
import { Filter, Search, ShoppingBag, Star } from "lucide-react"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Store() {
    return (
        <>
            <Navbar />
            <StorePage />
            <Footer />
        </>
    )
}

// TypeScript interfaces for type safety
interface Product {
    id: string
    name: string
    price: number
    discountPrice?: number
    rating: number
    category: string
    tags: string[]
    imageUrl: string
    inStock: boolean
    description: string
}

interface FilterState {
    categories: string[]
    priceRange: [number, number]
    inStockOnly: boolean
    minRating: number
}

// Mock data - in a real application, this would come from an API
const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 299.99,
        discountPrice: 249.99,
        rating: 4.8,
        category: "Electronics",
        tags: ["audio", "wireless", "premium"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "High-quality wireless headphones with noise cancellation and premium sound.",
    },
    {
        id: "2",
        name: "Ergonomic Office Chair",
        price: 349.99,
        rating: 4.5,
        category: "Furniture",
        tags: ["office", "ergonomic", "chair"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "Comfortable ergonomic office chair with lumbar support and adjustable features.",
    },
    {
        id: "3",
        name: "Smart Home Hub",
        price: 129.99,
        discountPrice: 99.99,
        rating: 4.2,
        category: "Electronics",
        tags: ["smart home", "IoT", "automation"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "Central hub for controlling all your smart home devices with voice commands.",
    },
    {
        id: "4",
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        rating: 4.0,
        category: "Clothing",
        tags: ["organic", "sustainable", "casual"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: false,
        description: "Soft, comfortable t-shirt made from 100% organic cotton.",
    },
    {
        id: "5",
        name: "Professional Chef Knife",
        price: 89.99,
        rating: 4.9,
        category: "Kitchen",
        tags: ["cooking", "professional", "stainless steel"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "High-carbon stainless steel chef knife for precise cutting and chopping.",
    },
    {
        id: "6",
        name: "Fitness Smartwatch",
        price: 199.99,
        discountPrice: 169.99,
        rating: 4.6,
        category: "Electronics",
        tags: ["fitness", "wearable", "health"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "Track your fitness goals, heart rate, and sleep patterns with this advanced smartwatch.",
    },
    {
        id: "7",
        name: "Ceramic Plant Pot Set",
        price: 49.99,
        rating: 4.3,
        category: "Home & Garden",
        tags: ["ceramic", "plants", "decoration"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "Set of 3 ceramic plant pots in different sizes with drainage holes.",
    },
    {
        id: "8",
        name: "Leather Messenger Bag",
        price: 159.99,
        rating: 4.7,
        category: "Accessories",
        tags: ["leather", "bag", "business"],
        imageUrl: "/placeholder.svg?height=300&width=300",
        inStock: true,
        description: "Genuine leather messenger bag with multiple compartments for business professionals.",
    },
]

// Get all unique categories from products
const getAllCategories = (products: Product[]): string[] => {
    return Array.from(new Set(products.map((product) => product.category)))
}

// Get price range from products
const getPriceRange = (products: Product[]): [number, number] => {
    const prices = products.map((product) => product.discountPrice || product.price)
    return [Math.min(...prices), Math.max(...prices)]
}

function StorePage() {
    // State management
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [sortOption, setSortOption] = useState<string>("featured")
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [categories, setCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        priceRange: [0, 1000],
        inStockOnly: false,
        minRating: 0,
    })

    // Fetch products (simulated API call)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 800))

                // In a real app, this would be an API call
                setProducts(MOCK_PRODUCTS)
                setCategories(getAllCategories(MOCK_PRODUCTS))
                setPriceRange(getPriceRange(MOCK_PRODUCTS))
                setFilters((prev) => ({
                    ...prev,
                    priceRange: getPriceRange(MOCK_PRODUCTS),
                }))
                setLoading(false)
            } catch (error) {
                setError("Failed to load products. Please try again later.")
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Filter and sort products
    useEffect(() => {
        if (products.length === 0) return

        let result = [...products]

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.tags.some((tag) => tag.toLowerCase().includes(query)),
            )
        }

        // Apply category filter
        if (filters.categories.length > 0) {
            result = result.filter((product) => filters.categories.includes(product.category))
        }

        // Apply price range filter
        result = result.filter((product) => {
            const price = product.discountPrice || product.price
            return price >= filters.priceRange[0] && price <= filters.priceRange[1]
        })

        // Apply in-stock filter
        if (filters.inStockOnly) {
            result = result.filter((product) => product.inStock)
        }

        // Apply rating filter
        if (filters.minRating > 0) {
            result = result.filter((product) => product.rating >= filters.minRating)
        }

        // Apply sorting
        switch (sortOption) {
            case "price-low":
                result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
                break
            case "price-high":
                result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
                break
            case "rating":
                result.sort((a, b) => b.rating - a.rating)
                break
            case "newest":
                // In a real app, you would sort by date
                // Here we're just reversing the array as a placeholder
                result.reverse()
                break
            case "featured":
            default:
                // Featured would have its own logic in a real app
                break
        }

        setFilteredProducts(result)
    }, [products, searchQuery, filters, sortOption])

    // Handle category filter change
    const handleCategoryChange = (category: string) => {
        setFilters((prev) => {
            const updatedCategories = prev.categories.includes(category)
                ? prev.categories.filter((c) => c !== category)
                : [...prev.categories, category]

            return {
                ...prev,
                categories: updatedCategories,
            }
        })
    }

    // Handle in-stock filter change
    const handleInStockChange = () => {
        setFilters((prev) => ({
            ...prev,
            inStockOnly: !prev.inStockOnly,
        }))
    }

    // Handle rating filter change
    const handleRatingChange = (rating: number) => {
        setFilters((prev) => ({
            ...prev,
            minRating: rating,
        }))
    }

    // Handle price range change
    const handlePriceRangeChange = (min: number, max: number) => {
        setFilters((prev) => ({
            ...prev,
            priceRange: [min, max],
        }))
    }

    // Handle adding product to cart
    const handleAddToCart = useCallback((productId: string) => {
        // In a real app, this would dispatch an action to add the product to the cart
        console.log(`Adding product ${productId} to cart`)
        // Show a toast notification or update cart count
    }, [])

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            categories: [],
            priceRange: priceRange,
            inStockOnly: false,
            minRating: 0,
        })
        setSearchQuery("")
        setSortOption("featured")
    }

    // Render loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            </div>
        )
    }

    // Render error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                <p className="mt-2 text-gray-600">Discover our curated collection of high-quality products</p>
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </button>

                    <div className="relative inline-block text-left">
                        <div className="flex items-center">
                            <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                                Sort:
                            </label>
                            <select
                                id="sort"
                                name="sort"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filter Sidebar - Visible on larger screens or when toggled */}
                <div className={`lg:w-1/4 ${isFilterOpen ? "block" : "hidden lg:block"}`}>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button onClick={resetFilters} className="text-sm text-emerald-600 hover:text-emerald-800">
                                Reset All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center">
                                        <input
                                            id={`category-${category}`}
                                            name={`category-${category}`}
                                            type="checkbox"
                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                            checked={filters.categories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min={priceRange[0]}
                                    max={priceRange[1]}
                                    value={filters.priceRange[0]}
                                    onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="Min"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="number"
                                    min={priceRange[0]}
                                    max={priceRange[1]}
                                    value={filters.priceRange[1]}
                                    onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="Max"
                                />
                            </div>
                        </div>

                        {/* In Stock Filter */}
                        <div className="mb-6">
                            <div className="flex items-center">
                                <input
                                    id="in-stock"
                                    name="in-stock"
                                    type="checkbox"
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    checked={filters.inStockOnly}
                                    onChange={handleInStockChange}
                                />
                                <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">
                                    In Stock Only
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="lg:w-3/4">
                    {/* Results count and applied filters */}
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-700">
                            Showing <span className="font-medium">{filteredProducts.length}</span> results
                        </span>

                        {/* Display active filters as tags */}
                        {filters.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {filters.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                                    >
                                        {category}
                                        <button
                                            type="button"
                                            onClick={() => handleCategoryChange(category)}
                                            className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none"
                                        >
                                            <span className="sr-only">Remove filter for {category}</span>
                                            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {filters.inStockOnly && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                In Stock Only
                                <button
                                    type="button"
                                    onClick={handleInStockChange}
                                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none"
                                >
                                    <span className="sr-only">Remove in stock filter</span>
                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                    </svg>
                                </button>
                            </span>
                        )}

                        {filters.minRating > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {filters.minRating}+ Stars
                                <button
                                    type="button"
                                    onClick={() => handleRatingChange(0)}
                                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none"
                                >
                                    <span className="sr-only">Remove rating filter</span>
                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                    </svg>
                                </button>
                            </span>
                        )}
                    </div>

                    {/* No results message */}
                    {filteredProducts.length === 0 && (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your search or filter criteria to find what you're looking for.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Product grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-2">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="relative pb-[60%]">
                                    <img
                                        src={product.imageUrl || "/placeholder.svg"}
                                        alt={product.name}
                                        className="absolute h-full w-full object-cover"
                                    />
                                    {!product.inStock && (
                                        <div className="absolute top-1 right-1 bg-gray-800 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                            Out of Stock
                                        </div>
                                    )}
                                </div>
                                <div className="p-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                        <div className="flex items-center">
                                            <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
                                            <span className="ml-0.5 text-xs text-gray-600">{product.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            {product.discountPrice ? (
                                                <div className="flex items-center">
                                                    <span className="text-sm font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                                                    <span className="ml-1 text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product.id)}
                                            disabled={!product.inStock}
                                            className={`inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${product.inStock
                                                ? "text-white bg-emerald-600 hover:bg-emerald-700"
                                                : "text-gray-400 bg-gray-200 cursor-not-allowed"
                                                }`}
                                        >
                                            <ShoppingBag className="h-3 w-3 mr-1" />
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination - would be implemented with real data */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    3
                                </a>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    8
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}