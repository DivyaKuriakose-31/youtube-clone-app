import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      direction="column" // 👈 Forces components straight downwards
      sx={{
        overflowY: 'auto',
        height: '100%',
        gap: '8px', // Spacing between each menu row item
        backgroundColor: '#fff',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {categories.map((category) => {
        const isSelected = category.name === selectedCategory;
        return (
          <button
            className="category-btn"
            onClick={() => setSelectedCategory(category.name)}
            style={{
              background: isSelected ? '#F31503' : 'transparent',
              color: isSelected ? 'white' : '#000', // Black text for unselected categories
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '14px', // 👈 Clean spacing separating your icon and text label
              padding: '10px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              width: '100%',
              textAlign: 'left',
              fontSize: '0.95rem'
            }}
            key={category.name}
          >
            <span style={{ 
              color: isSelected ? 'white' : '#F31503', // Elegant red accent color for your icons
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.4rem'
            }}>
              {category.icon}
            </span>
            <span>{category.name}</span>
          </button>
        );
      })}
    </Stack>
  );
}