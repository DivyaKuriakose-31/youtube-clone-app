import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: 'auto',
        height: { xs: 'auto', md: '95vh' },
        flexDirection: { xs: 'row',md: 'column' },
        borderRight: '1px solid #1e1e1e',
        px: { sx: 0, md: 2 },
        gap: 1
      }}
    >
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory ? '#FC1503' : 'transparent',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textAlign: 'left',
            transition: 'all 0.3s ease',
          }}
          className="category-btn"
        >
          <span style={{ color: category.name === selectedCategory ? 'white' : '#FC1503' }}>
            {category.icon}
          </span>
          <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}