import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const StyledAppBar = styled(AppBar)({
    background: '#f4f4f4',
    boxShadow: 'none',
})

function Header() {
  return (
      <StyledAppBar>
          <Toolbar>
              <ConstructionIcon color='primary' style={{ marginRight: 10 }} fontSize='large' />
              <Typography color={'black'}>
                  Form Builder
              </Typography>
          </Toolbar>
      </StyledAppBar>
  )
}

export default Header