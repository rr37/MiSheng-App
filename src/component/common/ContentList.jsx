import { Stack } from '@mui/material';
import PropTypes from 'prop-types';

const ContentList = ({ items, renderItem, spacing = 2, sx = {} }) => {
  return (
    <Stack
      spacing={spacing}
      sx={{
        overflowY: 'auto',
        maxHeight: '100%',
        flex: 1,
        p: '8%',
        pb: '20%',
        m: '-8%',
        mt: '-3%',
        ...sx, // 允許外部覆寫樣式
      }}
    >
      {items.map((item, index) => renderItem(item, index))}
    </Stack>
  );
};

ContentList.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  spacing: PropTypes.number,
  sx: PropTypes.object,
};

export default ContentList;
