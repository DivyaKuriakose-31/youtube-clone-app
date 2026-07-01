import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      direction="column" // 👈 Forces the menu categories straight downwards on ALL devices
      sx={{
        overflowY: 'auto',
        height: '100%',
        gap: '6px',
        // Hides browser scrollbar visual lines
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
            padding: '10px 16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            width: '100%', // Makes sure buttons stack beautifully downwards
            textAlign: 'left',
            backgroundColor: category.name === selectedCategory ? '#F31503' : 'transparent'
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