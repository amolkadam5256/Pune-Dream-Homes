// components/FilterSection.jsx
import React, { useState } from 'react';
import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';
import { bhkOptions, budgetOptions, furnishingOptions } from '../../../../constants/propertyData';

const FilterSection = ({ filters, onFilterChange, resultCount }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handleReset = () => {
    onFilterChange({
      bhk: 'all',
      budget: 'all',
      furnishing: 'all',
      search: '',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = () => {
    return filters.bhk !== 'all' || 
           filters.budget !== 'all' || 
           filters.furnishing !== 'all' || 
           filters.search !== '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-8">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <h2 className="text-xl font-bold text-gray-900">Search & Filter</h2>
            {resultCount !== undefined && (
              <span className="text-sm text-gray-500">
                ({resultCount} {resultCount === 1 ? 'property' : 'properties'} found)
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {hasActiveFilters() && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: showAdvancedFilters ? 'var(--color-primary)' : 'var(--color-primary-lightest)',
                color: showAdvancedFilters ? 'white' : 'var(--color-primary)'
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showAdvancedFilters ? 'Hide' : 'More'} Filters
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location, property name, or area..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={{
              focusRingColor: 'var(--color-primary)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          />
          {filters.search && (
            <button
              onClick={() => handleInputChange('search', '')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* BHK Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BHK Type
          </label>
          <select
            value={filters.bhk}
            onChange={(e) => handleInputChange('bhk', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          >
            {bhkOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            value={filters.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          >
            {budgetOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="area-low">Area: Low to High</option>
            <option value="area-high">Area: High to Low</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="p-6 pt-0 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Furnishing Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Furnishing Status
              </label>
              <select
                value={filters.furnishing}
                onChange={(e) => handleInputChange('furnishing', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              >
                {furnishingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={filters.propertyType || 'all'}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            {/* Possession Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Possession
              </label>
              <select
                value={filters.possession || 'all'}
                onChange={(e) => handleInputChange('possession', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all bg-white"
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              >
                <option value="all">All</option>
                <option value="immediate">Immediate</option>
                <option value="within-3-months">Within 3 Months</option>
                <option value="within-6-months">Within 6 Months</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-3">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.bhk !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary-lightest)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {filters.bhk} BHK
                    <button 
                      onClick={() => handleInputChange('bhk', 'all')}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.budget !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary-lightest)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    Budget: {budgetOptions.find(opt => opt.value === filters.budget)?.label}
                    <button 
                      onClick={() => handleInputChange('budget', 'all')}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.furnishing !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary-lightest)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {filters.furnishing}
                    <button 
                      onClick={() => handleInputChange('furnishing', 'all')}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.search && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'var(--color-primary-lightest)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    Search: "{filters.search}"
                    <button 
                      onClick={() => handleInputChange('search', '')}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSection;