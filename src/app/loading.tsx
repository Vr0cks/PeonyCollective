export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse flex flex-col space-y-12">
        {/* Banner Skeleton */}
        <div className="h-48 md:h-64 bg-gray-200 w-full mb-8 luxury-img-wrapper" />
        
        {/* Filters and Title Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="h-8 bg-gray-200 w-48" />
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-200 w-32" />
            <div className="h-10 bg-gray-200 w-32" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <div className="aspect-[3/4] bg-gray-200 w-full luxury-img-wrapper" />
              <div className="flex flex-col items-center space-y-2">
                <div className="h-3 bg-gray-200 w-16" />
                <div className="h-5 bg-gray-200 w-32" />
                <div className="h-4 bg-gray-200 w-24 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
