import { Stack } from '@mui/material';
import { categories } from '../utils/constants'; // Uses your existing data perfectly

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      direction="column" // 👈 Forces your existing categories downwards
      sx={{
        overflowY: 'auto',
        height: '100%',
        gap: '6px',
        backgroundColor: '#f5f0f0', // Matches your black background requirement
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory ? '#F31503' : 'transparent',
            color: 'white', // White text to show clearly on black background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '16px', // 👈 Gives clean spacing between your icon and text
            padding: '10px 16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            width: '100%',
            textAlign: 'left',
            backgroundColor: category.name === selectedCategory ? '#F31503' : 'transparent'
          }}
          key={category.name}
        >
          {/* Automatically styles whatever icon you already have inside your array */}
          <span style={{ 
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.3rem'
          }}>
            {category.icon}
          </span>
          <span>{category.name}</span>
        </button>
      ))}
    </Stack>
  );
}