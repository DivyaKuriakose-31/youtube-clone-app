import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      // Horizontal row style for mobile, vertical column style for desktop
      direction={{ xs: 'row', md: 'column' }}
      sx={{
        overflowY: { xs: 'auto', md: 'auto' },
        overflowX: { xs: 'auto', md: 'hidden' }, // Allows swipe-scrolling horizontally on phone
        height: { xs: 'auto', md: '95%' },
        gap: '10px',
        py: { xs: 1, md: 0 },
        // Hides scrollbar visual lines to keep UI clean
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
            color: category.name === selectedCategory ? 'white' : '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '12px',
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            whiteSpace: 'nowrap', // Prevents button text from breaking into two lines on mobile
            fontSize: '0.88rem',
            backgroundColor: category.name === selectedCategory ? '#F31503' : '#f2f2f2'
          }}
          key={category.name}
        >
          <span style={{ 
            color: category.name === selectedCategory ? 'white' : '#F31503',
            display: 'flex',
            alignItems: 'center'
          }}>
            {category.icon}
          </span>
          <span>{category.name}</span>
        </button>
      ))}
    </Stack>
  );
}