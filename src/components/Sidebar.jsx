import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      direction="column" 
      sx={{
        overflowY: 'auto',
        height: '100%',
        gap: '6px',
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
              color: isSelected ? 'white' : '#000', // 👈 Black text when unselected
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '16px', 
              padding: '10px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              width: '100%',
              textAlign: 'left',
              backgroundColor: isSelected ? '#F31503' : 'transparent'
            }}
            key={category.name}
          >
            <span style={{ 
              color: isSelected ? 'white' : '#F31503', // Red accent icons on white theme
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.3rem'
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